
import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const sectionsRef = {
    hero: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (id: string) => {
    const section = sectionsRef[id as keyof typeof sectionsRef].current;
    if (section) {
      const yOffset = -80; // Adjust for fixed navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black min-h-screen font-sans">
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
      <Chatbot />

      {/* Custom Tailwind CSS animations for chatbot */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default App;
    