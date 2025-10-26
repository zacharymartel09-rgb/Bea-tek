import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ApiKeyPrompt from './components/ApiKeyPrompt'; // Import the new component

const App: React.FC = () => {
  const sectionsRef = {
    hero: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(true); // Start as loading

  useEffect(() => {
    checkApiKeyStatus();
  }, []);

  const checkApiKeyStatus = async () => {
    setApiKeyLoading(true);
    // Ensure window.aistudio is available before checking
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setShowApiKeyPrompt(!hasKey);
    } else {
      // Fallback if aistudio is not available (e.g., local dev without frame permissions)
      // In a real hosted scenario, this case should ideally not happen if metadata.json is correct.
      console.warn("window.aistudio.hasSelectedApiKey not available. Assuming API key is provided via env var for local dev.");
      // For a more robust local development experience, you might still want to assume process.env.API_KEY is available.
      // For this example, we'll proceed if aistudio isn't present, relying on process.env.API_KEY directly.
      if (!process.env.API_KEY) {
        setShowApiKeyPrompt(true); // If process.env.API_KEY is also not set, prompt user.
      } else {
        setShowApiKeyPrompt(false);
      }
    }
    setApiKeyLoading(false);
  };

  const handleApiKeyInvalidated = () => {
    setShowApiKeyPrompt(true);
  };

  const scrollToSection = (id: string) => {
    const section = sectionsRef[id as keyof typeof sectionsRef].current;
    if (section) {
      const yOffset = -80; // Adjust for fixed navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (apiKeyLoading) {
    // Optionally render a simple loading spinner here before the API key check is complete
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <svg className="animate-spin h-10 w-10 text-bea-tek-magenta" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-sans">
      <style>
        {`
        /* Custom Tailwind CSS animations for chatbot */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }

        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        .animate-bounce-dot {
          animation: bounce-dot 1s infinite ease-in-out;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }

        /* Custom Scrollbar for Chatbot */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
        `}
      </style>

      {showApiKeyPrompt ? (
        <ApiKeyPrompt onApiKeySelected={checkApiKeyStatus} isLoading={apiKeyLoading} />
      ) : (
        <>
          <Navbar onNavLinkClick={scrollToSection} />
          <main>
            <div ref={sectionsRef.hero}>
              <Hero onScrollToContact={() => scrollToSection('contact')} />
            </div>
            <div ref={sectionsRef.services}>
              <Services />
            </div>
            <div ref={sectionsRef.about}>
              <About />
            </div>
            <div ref={sectionsRef.contact}>
              <Contact />
            </div>
          </main>
          <Footer />
          <Chatbot isApiKeyReady={!showApiKeyPrompt} onApiKeyInvalidated={handleApiKeyInvalidated} />
        </>
      )}
    </div>
  );
};

export default App;