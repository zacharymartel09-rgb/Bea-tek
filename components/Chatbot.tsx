import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import ChatMessageComponent from './ChatMessage';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface ChatbotProps {
  // isApiKeyReady: boolean; // Removed: no longer needed as there's no API key to manage
  // onApiKeyInvalidated: () => void; // Removed: no longer needed
}

const Chatbot: React.FC<ChatbotProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatInitializing, setIsChatInitializing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useRef to hold the chat instance to avoid re-creating on re-renders
  const chatInstanceRef = useRef<Chat | null>(null);

  const BOT_NAME = 'Assistant BEATEK Events';
  const GEMINI_MODEL = 'gemini-2.5-flash';
  const SYSTEM_INSTRUCTION =
    "You are a friendly and helpful BEATEK Events virtual assistant specializing in DJ services, event sound systems, lighting, and event consulting. You assist users with inquiries about event planning, service details, quotes, and booking information. Always maintain a professional yet engaging tone. Encourage users to use the contact form for detailed inquiries or bookings. If you cannot directly answer a question, guide the user to the appropriate section of the website or to the contact form.";

  // Helper to get a random response from an array (retained for initial welcome)
  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to manage chat session lifecycle
  useEffect(() => {
    if (isOpen && !chatInstanceRef.current && !isChatInitializing) {
      setIsChatInitializing(true);
      const initializeChat = async () => {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const chat = ai.chats.create({
            model: GEMINI_MODEL,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
            },
          });
          chatInstanceRef.current = chat;

          // Add an initial welcome message
          const welcomeMessage: ChatMessage = {
            id: Date.now().toString() + 'welcome',
            text: getRandomResponse([
              "Bonjour et bienvenue chez BEATEK Events ! Je suis votre assistant virtuel, ravi de vous aider. N'hésitez pas à me poser des questions sur nos services DJ, la sonorisation, l'éclairage, ou la planification de votre prochain événement. Comment puis-je rendre votre journée plus musicale ?",
              "Salut ! Je suis l'assistant de BEATEK Events, votre allié pour des événements inoubliables. Dites-moi ce qui vous intéresse : nos prestations DJ, nos équipements, un devis ? Je suis là pour vous guider !",
              "Hello ! Prêt à faire vibrer votre événement ? Je suis l'assistant BEATEK Events et je suis là pour répondre à toutes vos questions. Par quoi souhaitez-vous commencer ?"
            ]),
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages([welcomeMessage]);
        } catch (error) {
          console.error('Error initializing Gemini chat:', error);
          setMessages([
            {
              id: Date.now().toString() + 'error-init',
              text: "Désolé, je n'ai pas pu démarrer le chat. Veuillez réessayer plus tard ou contacter directement BEATEK Events.",
              sender: 'bot',
              timestamp: new Date(),
            },
          ]);
        } finally {
          setIsChatInitializing(false);
        }
      };
      initializeChat();
    } else if (!isOpen && chatInstanceRef.current) {
      // Close session when chatbot is closed
      chatInstanceRef.current = null;
      setMessages([]); // Clear messages for next session
    }
  }, [isOpen, isChatInitializing]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading || isChatInitializing) return;

    const userMessageText = input.trim();
    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + 'user',
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    const botMessageId = Date.now().toString() + 'bot-stream';
    // Add a placeholder bot message for streaming
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: botMessageId,
        text: '', // Start with empty text
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);

    let fullBotResponse = '';
    try {
      if (!chatInstanceRef.current) {
        throw new Error("Chat instance not initialized.");
      }
      const response = await chatInstanceRef.current.sendMessageStream({ message: userMessageText });

      for await (const chunk of response) {
        if (chunk.text) {
          fullBotResponse += chunk.text;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: fullBotResponse } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMessage =
        fullBotResponse ||
        "Désolé, une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer plus tard.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: errorMessage, timestamp: new Date() }
            : msg
        )
      );
    } finally {
      // Ensure the timestamp is finalized even if there was no streaming text
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, timestamp: new Date() } // Finalize timestamp
            : msg
        )
      );
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && !isChatInitializing) {
      handleSendMessage();
    }
  };

  const isDisabled = isLoading || isChatInitializing;

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-bea-tek-magenta hover:bg-fuchsia-600 text-white p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-110 z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full max-w-sm md:max-w-md bg-gray-900 rounded-lg shadow-2xl flex flex-col h-[70vh] max-h-[600px] z-50 animate-fade-in-up">
          <div className="bg-bea-tek-magenta p-4 rounded-t-lg text-white font-bold text-lg flex items-center justify-between">
            <span>{BOT_NAME}</span>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-fuchsia-700 transition duration-200" aria-label="Close Chatbot">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {messages.length === 0 && !isChatInitializing ? (
              <div className="text-center text-gray-400 mt-10">
                <p>Bienvenue ! Comment puis-je vous aider aujourd'hui ?</p>
                <p className="mt-2 text-sm">Posez-moi une question sur nos services DJ, la sonorisation, ou pour un devis.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessageComponent key={msg.id} message={msg} />
              ))
            )}
            {isDisabled && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[75%] rounded-lg px-4 py-2 bg-gray-700 text-white shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot animation-delay-200"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-gray-800 rounded-b-lg flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isChatInitializing ? "Chargement de l'assistant..." : "Écrivez votre message..."}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white mr-2"
              disabled={isDisabled}
            />
            <button
              onClick={handleSendMessage}
              className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white p-2 rounded-md transition duration-300 transform hover:scale-105 shadow-lg"
              disabled={isDisabled}
              aria-label="Send Message"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;