
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import ChatMessageComponent from './ChatMessage';

interface ChatbotProps {
  // isApiKeyReady: boolean; // Removed: no longer needed as there's no API key to manage
  // onApiKeyInvalidated: () => void; // Removed: no longer needed
}

const Chatbot: React.FC<ChatbotProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const BOT_NAME = 'Assistant BEATEK Events';

  // Helper to get a random response from an array
  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add an initial message when the chatbot opens
    if (isOpen && messages.length === 0) {
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
    }
  }, [isOpen]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Greetings
    if (lowerInput.includes('bonjour') || lowerInput.includes('salut') || lowerInput.includes('hello') || lowerInput.includes('coucou') || lowerInput.includes('hi')) {
      const responses = [
        "Bonjour ! Super de vous avoir ici. Comment puis-je vous aider à rendre votre prochain événement inoubliable ?",
        "Salut ! Je suis là pour toutes vos questions sur BEATEK Events. Dites-moi tout !",
        "Hello ! Prêt à découvrir le monde sonore et visuel de BEATEK Events ? Je suis à votre écoute.",
        "Enchanté ! C'est un plaisir de vous accueillir. Que puis-je faire pour vous aujourd'hui ?"
      ];
      return getRandomResponse(responses);
    }

    // Thanks
    if (lowerInput.includes('merci') || lowerInput.includes('super') || lowerInput.includes('génial') || lowerInput.includes('cool')) {
      const responses = [
        "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions ou si vous souhaitez passer à l'étape suivante pour votre événement.",
        "Ravi d'avoir pu vous aider ! BEATEK Events est toujours là pour vous.",
        "C'est un plaisir ! Votre satisfaction est notre priorité. Une autre question peut-être ?",
        "De rien ! Nous sommes là pour ça. Y a-t-il autre chose que je puisse faire pour vous ?"
      ];
      return getRandomResponse(responses);
    }

    // Services
    if (lowerInput.includes('service') || lowerInput.includes('prestation') || lowerInput.includes('dj') || lowerInput.includes('sonorisation') || lowerInput.includes('éclairage') || lowerInput.includes('consulting') || lowerInput.includes('offre') || lowerInput.includes('quoi faites-vous')) {
      const responses = [
        "Chez BEATEK Events, nous transformons votre vision en réalité ! Nous excellons dans les **Services DJ Pro** pour une ambiance électrisante, la **Sonorisation Événementielle** pour un son parfait, l'**Éclairage Ambiant** qui crée une atmosphère magique, et le **Conseil Événementiel** pour une organisation sereine. Quel aspect de votre événement aimeriez-vous perfectionner ?",
        "Nous proposons une gamme complète de services pour tous vos événements : **DJs professionnels**, **systèmes de sonorisation** à la pointe, **solutions d'éclairage créatives** et un accompagnement personnalisé en **conseil événementiel**. Pourriez-vous me dire quel service retient le plus votre attention ?",
        "Préparez-vous à être impressionné ! BEATEK Events c'est l'expertise DJ, une qualité sonore impeccable, des jeux de lumière éblouissants et des conseils d'experts pour la planification. Chaque service est conçu pour rendre votre événement absolument mémorable. Quel est le cœur de votre projet ?"
      ];
      return getRandomResponse(responses);
    }

    // Quote/Booking/Pricing
    if (lowerInput.includes('devis') || lowerInput.includes('prix') || lowerInput.includes('coût') || lowerInput.includes('tarif') || lowerInput.includes('réserver') || lowerInput.includes('reservation') || lowerInput.includes('combien')) {
      const responses = [
        "Pour un devis précis et adapté à la magie de votre événement, le mieux est de remplir notre formulaire de contact ! Cela nous permet de prendre en compte tous les détails spécifiques (date, lieu, services souhaités, ambiance...) pour vous concocter une proposition sur mesure. Rendez-vous dans la section 'Contactez-nous' pour une démarche rapide et personnalisée !",
        "Absolument ! Chaque événement est unique, et nos tarifs le sont aussi. Pour obtenir une estimation détaillée et concrète, je vous invite chaleureusement à nous faire part de vos besoins via notre formulaire de contact dans la section 'Contactez-nous'. Notre équipe vous répondra avec plaisir !",
        "Vous souhaitez réserver nos services ou connaître nos tarifs ? C'est une excellente étape ! Notre équipe se fera un plaisir de vous créer une offre personnalisée. Pour cela, le formulaire de contact est le chemin le plus direct et efficace. Nous attendons avec impatience de découvrir votre projet !"
      ];
      return getRandomResponse(responses);
    }

    // Contact
    if (lowerInput.includes('contact') || lowerInput.includes('joindre') || lowerInput.includes('téléphone') || lowerInput.includes('email') || lowerInput.includes('parler') || lowerInput.includes('appeler')) {
      const responses = [
        "Vous souhaitez échanger directement avec notre équipe passionnée ? C'est une excellente idée ! Pour une réponse rapide et personnalisée, je vous recommande d'utiliser notre formulaire de contact disponible dans la section 'Contactez-nous' de notre site. Remplissez simplement vos coordonnées et votre message, et nous vous rappellerons ou écrirons personnellement très vite !",
        "Le moyen le plus efficace de nous joindre est via le formulaire de contact sur notre page 'Contactez-nous'. C'est là que vous pouvez nous détailler votre projet pour que nous puissions vous apporter la meilleure assistance. Nous avons hâte de vous lire !",
        "Pour toute question ou pour discuter de votre événement, notre formulaire de contact est à votre disposition dans la section 'Contactez-nous'. C'est le canal privilégié pour obtenir une réponse rapide et détaillée de notre part."
      ];
      return getRandomResponse(responses);
    }

    // Who are you? / About BEATEK
    // Fix: Changed 'qui s'occupe' to "qui s'occupe" to correctly parse the string literal.
    if (lowerInput.includes('qui es-tu') || lowerInput.includes('ton nom') || lowerInput.includes("c'est quoi ton rôle") || lowerInput.includes('qui est beatek') || lowerInput.includes('votre entreprise')) {
      const responses = [
        "Je suis l'Assistant Virtuel de BEATEK Events ! Ma mission est de vous guider à travers nos services, de répondre à vos premières questions et de faciliter votre expérience en vous orientant vers les bonnes informations. Je suis là pour rendre votre exploration de BEATEK Events des plus agréables !",
        "Je suis votre guide pour tout ce qui concerne BEATEK Events ! Mon objectif est de vous fournir des informations claires et de vous aider à démarrer la planification de votre événement idéal. N'hésitez pas à me solliciter pour toute question.",
        "BEATEK Events, c'est l'histoire d'une passion pour la musique et les événements inoubliables ! Nous sommes une entreprise dédiée à transformer chaque occasion en une expérience sonore et visuelle exceptionnelle, grâce à nos DJs professionnels et à nos équipements de pointe. Vous pouvez en savoir plus sur notre parcours et nos valeurs dans la section 'À Propos de Nous' de notre site !"
      ];
      return getRandomResponse(responses);
    }
    
    // Events types
    if (lowerInput.includes('événements') || lowerInput.includes("type d'événement") || lowerInput.includes('mariage') || lowerInput.includes('corporatif') || lowerInput.includes('anniversaire') || lowerInput.includes('fête') || lowerInput.includes('gala') || lowerInput.includes('célébration')) {
      const responses = [
        "Chez BEATEK Events, nous aimons célébrer la vie sous toutes ses formes ! Nous mettons notre expertise au service d'une multitude d'événements : mariages romantiques, soirées corporatives dynamiques, anniversaires mémorables, galas prestigieux, ou toute autre fête privée. Quel type d'événement planifiez-vous ? Nous adorons les défis créatifs !",
        "Que ce soit un mariage, un événement corporatif, un anniversaire ou une grande fête, BEATEK Events a l'expérience et l'équipement pour s'adapter à toutes les ambiances. Nous sommes maîtres dans l'art de créer des moments uniques. Parlez-moi de votre vision !",
        "De la petite célébration intime aux grands rassemblements, nos services sont conçus pour s'intégrer parfaitement à votre événement. Mariages, anniversaires, fêtes d'entreprise... la liste est longue ! Votre événement est notre prochaine création artistique."
      ];
      return getRandomResponse(responses);
    }

    // Team/DJs
    // Fix: Changed 'qui s'occupe' to "qui s'occupe" to correctly parse the string literal.
    if (lowerInput.includes('équipe') || lowerInput.includes("dj's") || lowerInput.includes('expertise') || lowerInput.includes('professionnel') || lowerInput.includes("qui s'occupe") || lowerInput.includes('musique')) {
      const responses = [
        "Notre équipe est le cœur battant de BEATEK Events ! Nous sommes des DJs et techniciens passionnés, animés par l'envie de créer l'ambiance parfaite pour vous. Chaque membre apporte son talent et son professionnalisme pour que votre événement soit un succès total. Nous sommes fiers de notre expertise et de notre dévouement !",
        "Nos DJs sont de véritables artistes de l'ambiance ! Ils maîtrisent une vaste palette de styles musicaux et savent s'adapter à votre public pour faire de chaque instant un moment inoubliable. Découvrez l'engagement et le talent qui se cachent derrière BEATEK Events dans notre section 'À Propos de Nous'.",
        "La musique est notre passion ! Nos DJs sont non seulement des experts en mixage, mais aussi des lecteurs d'ambiance hors pair. Ils sauront parfaitement jongler avec les genres pour que la piste de danse ne désemplisse jamais. Quel style musical imaginez-vous pour votre événement ?"
      ];
      return getRandomResponse(responses);
    }
    
    // Location/Area
    if (lowerInput.includes('où êtes-vous') || lowerInput.includes('votre zone') || lowerInput.includes('localisation') || lowerInput.includes('région') || lowerInput.includes('déplacement')) {
        const responses = [
          "BEATEK Events a le plaisir d'être basé à Warwick ! Cependant, notre passion nous pousse bien au-delà. Nous sommes flexibles et ravis de discuter de vos événements où qu'ils soient. N'hésitez pas à nous indiquer le lieu de votre événement dans le formulaire de contact pour que nous puissions évaluer la meilleure solution.",
          "Notre QG est à Warwick, mais notre musique voyage ! Nous couvrons une large région et sommes toujours prêts à envisager de nous déplacer pour donner vie à votre événement. Quel est le lieu que vous avez en tête pour votre célébration ?",
          "Bien que notre ancrage soit à Warwick, la zone d'intervention de BEATEK Events est vaste et s'adapte à vos besoins. Pour un projet hors de notre zone habituelle, contactez-nous via le formulaire ; nous étudierons ensemble la faisabilité avec plaisir !"
        ];
        return getRandomResponse(responses);
    }

    // Availability / Dates
    if (lowerInput.includes('disponible') || lowerInput.includes('dates') || lowerInput.includes('agenda') || lowerInput.includes('quand')) {
      const responses = [
        "Pour vérifier nos disponibilités exactes et voir si votre date est libre, le plus simple est de nous envoyer un message via le formulaire de contact dans la section 'Contactez-nous'. Indiquez-nous la date de votre événement et nous vous répondrons très vite avec les informations nécessaires !",
        "Nos DJs et équipements sont très sollicités ! Pour connaître nos disponibilités pour votre événement, veuillez nous communiquer la date et le type de prestation souhaitée via notre formulaire de contact. Nous ferons le maximum pour vous accommoder !",
        "Vous planifiez une date spéciale ? Merveilleux ! Pour vérifier notre agenda et bloquer votre événement, contactez-nous directement via la section 'Contactez-nous'. Donnez-nous tous les détails et nous vous confirmerons nos possibilités."
      ];
      return getRandomResponse(responses);
    }

    // Music styles
    if (lowerInput.includes('style de musique') || lowerInput.includes('genre musical') || lowerInput.includes('playlist') || lowerInput.includes('quel type de musique')) {
      const responses = [
        "Nos DJs sont des caméléons musicaux ! Du top 40 aux classiques intemporels, du house au hip-hop, du rock aux rythmes latins... nous adaptons la playlist à vos goûts et à l'ambiance que vous souhaitez créer. Avez-vous un genre musical favori ou un thème en tête pour votre événement ?",
        "Chez BEATEK Events, la diversité musicale est notre force ! Nous couvrons tous les genres et personnalisons la sélection pour qu'elle corresponde parfaitement à l'énergie de votre fête. N'hésitez pas à nous faire part de vos préférences, nous aimons créer des ambiances uniques !",
        "Vous rêvez d'une soirée thématique ou d'un mélange éclectique ? Nos DJs sont experts pour mixer les styles et maintenir l'énergie sur la piste de danse. Dites-nous ce qui vous fait vibrer, et nous ferons en sorte que la musique soit inoubliable !"
      ];
      return getRandomResponse(responses);
    }

    // Equipment / Quality
    if (lowerInput.includes('équipement') || lowerInput.includes('matériel') || lowerInput.includes('son') || lowerInput.includes('lumière') || lowerInput.includes('qualité')) {
      const responses = [
        "La qualité est notre priorité ! Nous utilisons des équipements de sonorisation et d'éclairage professionnels de dernière génération pour garantir un son cristallin et des effets lumineux époustouflants. C'est l'assurance d'une expérience immersive et sans faille pour votre événement.",
        "Notre matériel est soigneusement sélectionné pour sa performance et sa fiabilité. Que ce soit pour la clarté du son ou la puissance de l'éclairage, nous investissons dans le meilleur pour sublimer chaque instant de votre événement. Une question spécifique sur un type d'équipement ?",
        "Un événement réussi passe aussi par un équipement technique irréprochable. Chez BEATEK Events, nous vous garantissons des systèmes son et lumière de haute qualité, installés et gérés par nos experts, pour une performance visuelle et auditive impeccable."
      ];
      return getRandomResponse(responses);
    }

    // General "About us" (more specific than who are you)
    // Fix: Changed 'c'est quoi' to "c'est quoi" to correctly parse the string literal.
    if (lowerInput.includes('beatek') && (lowerInput.includes("c'est quoi") || lowerInput.includes('a propos') || lowerInput.includes('historique'))) {
      return "BEATEK Events, c'est l'union de la passion et de l'expertise pour la création d'événements musicaux et visuels d'exception. Fondée par des amoureux du son et de l'ambiance, notre entreprise s'engage à offrir des prestations sur mesure, alliant professionnalisme et créativité. Nous sommes basés à Warwick et fiers de faire vibrer vos moments précieux. Découvrez notre histoire dans la section 'À Propos de Nous' !";
    }

    // Fallback/General
    const fallbackResponses = [
      "Je suis là pour vous aider à explorer BEATEK Events ! Si votre question concerne nos services (DJ, sonorisation, éclairage, conseil), nos tarifs, nos disponibilités ou si vous souhaitez nous contacter directement, n'hésitez pas. Si ma réponse ne convient pas, le formulaire de contact reste le meilleur moyen d'obtenir une aide personnalisée !",
      "Hmm, je ne suis pas sûr de bien comprendre votre demande, mais je suis toujours là pour vous guider ! Pour toute question sur nos prestations ou si vous avez besoin d'un devis, la section 'Contactez-nous' avec notre formulaire est le chemin le plus sûr pour une réponse rapide et humaine.",
      "Désolé, je suis encore en train d'apprendre les subtilités du langage ! Pour des demandes spécifiques ou si vous ne trouvez pas votre réponse ici, notre équipe se fera un plaisir de vous aider via le formulaire de contact. Nous attendons votre message dans la section 'Contactez-nous' !",
      "Je peux vous aider avec des informations sur BEATEK Events : nos services DJ, la sonorisation, l'éclairage, ou la planification d'événements. Pour des questions plus complexes, nos experts sont disponibles via le formulaire de contact sur la page 'Contactez-nous' !"
    ];
    return getRandomResponse(fallbackResponses);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + 'user',
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // Fix: Use state setters from the component scope.
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate a short delay for the bot to "process" the message
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700)); // Variable delay for naturalness

    // Fix: Call getBotResponse with the user message text.
    const botResponseText = getBotResponse(newUserMessage.text);

    const newBotMessage: ChatMessage = {
      id: Date.now().toString() + 'bot',
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date(),
    };
    // Fix: Use state setters from the component scope.
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Fix: Use isLoading from the component scope.
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

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
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                <p>Bienvenue ! Comment puis-je vous aider aujourd'hui ?</p>
                <p className="mt-2 text-sm">Posez-moi une question sur nos services DJ, la sonorisation, ou pour un devis.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessageComponent key={msg.id} message={msg} />
              ))
            )}
            {isLoading && (
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
              placeholder="Écrivez votre message..."
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white mr-2"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white p-2 rounded-md transition duration-300 transform hover:scale-105 shadow-lg"
              disabled={isLoading}
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