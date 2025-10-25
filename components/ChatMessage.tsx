
import React from 'react';
import { ChatMessage } from '../types';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const messageAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser ? 'bg-bea-tek-magenta text-white' : 'bg-gray-700 text-white';
  const timestampColor = isUser ? 'text-bea-tek-magenta' : 'text-gray-400';

  return (
    <div className={`flex ${messageAlignment} mb-4`}>
      <div className={`max-w-[75%] rounded-lg px-4 py-2 shadow-md ${bubbleColor}`}>
        <p className="text-sm break-words">{message.text}</p>
        <span className={`block text-right text-xs mt-1 ${timestampColor}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
    