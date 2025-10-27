
import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ServiceDetail from './components/ServiceDetail'; // Import new component
import { Service } from './types'; // Import Service type

// Define the servicesData here with fullDescription and images
const servicesData: Service[] = [
  {
    id: 'dj',
    title: 'Services DJ',
    description: 'Nos DJs passionnés transforment votre événement en une fête inoubliable. Corporatifs, soirées privées – nous adaptons la musique à votre style et à votre public.',
    fullDescription: 'Chez BEATEK Events, nos DJs ne se contentent pas de jouer de la musique ; ils créent l\'ambiance, lisent la foule et transforment chaque événement en une célébration électrisante. Que ce soit pour une soirée corporative raffinée, une soirée privée animée ou un mariage mémorable, nous adaptons notre sélection musicale et notre style de mixage pour coller parfaitement à votre vision. Nous travaillons avec les meilleurs équipements et une bibliothèque musicale étendue pour garantir une performance impeccable et une piste de danse pleine d\'énergie du début à la fin. Laissez-nous faire de votre événement une symphonie inoubliable, conçue sur mesure pour vous.',
    images: [
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/dj1.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/dj2.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/dj3.jpg',
    ],
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6h.01M12 16h.01"></path>
      </svg>
    ),
  },
  {
    id: 'sound-system',
    title: 'Sonorisation Événementielle',
    description: 'Une qualité de son cristalline pour tous vos besoins. De petits rassemblements aux grands événements, nous fournissons et installons des systèmes de sonorisation de qualité.',
    fullDescription: 'Une qualité de son impeccable est le pilier de tout événement réussi. Chez BEATEK Events, nous fournissons et installons des systèmes de sonorisation événementielle de pointe, adaptés à toutes les tailles et tous les types de lieux. Que vous organisiez une conférence intime, un concert en plein air, un mariage élégant ou une fête d\'entreprise, nous avons l\'expertise et l\'équipement pour garantir un son cristallin et une intelligibilité parfaite. Nos techniciens qualifiés gèrent chaque détail, de l\'acoustique à l\'égalisation, pour une expérience auditive exceptionnelle et sans accroc.',
    images: [
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/sound1.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/sound2.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/sound3.jpg',
    ],
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.647 11.523 3 12 3h.01C12.477 3 13.077 3.647 13.414 4.053L18 8.646"></path>
      </svg>
    ),
  },
  {
    id: 'lighting',
    title: 'Éclairage Ambiant',
    description: 'Créez l\'atmosphère parfaite avec nos solutions d\'éclairage dynamiques. Des lumières d\'ambiance aux effets spéciaux, nous illuminons votre événement.',
    fullDescription: 'L\'éclairage ne se contente pas d\'illuminer un espace ; il crée une atmosphère, met en valeur les moments clés et transforme l\'ordinaire en extraordinaire. BEATEK Events propose des solutions d\'éclairage ambiant et dynamique sur mesure pour votre événement. Des projecteurs architecturaux qui transforment un lieu, aux effets spéciaux synchronisés avec la musique, en passant par des éclairages d\'ambiance doux et chaleureux, nous concevons des scénographies lumineuses qui captivent et enchantent. Laissez-nous sculpter la lumière pour donner vie à l\'émotion et à l\'énergie de votre célébration.',
    images: [
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/lighting1.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/lighting2.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/lighting3.jpg',
    ],
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      </svg>
    ),
  },
  {
    id: 'event-consulting',
    title: 'Conseil Événementiel',
    description: 'Bénéficiez de notre accompagnement pour planifier votre événement. Nous vous accompagnons de la conception à la réalisation, pour un événement mémorable et sans accroc.',
    fullDescription: 'La planification d\'un événement peut être complexe, mais avec BEATEK Events, vous n\'êtes jamais seul. Notre service de conseil événementiel vous offre un accompagnement expert de la conception initiale à la réalisation finale. Nous vous aidons à définir votre vision, à optimiser votre budget, à coordonner les fournisseurs et à anticiper les défis. Forts de notre expérience dans l\'industrie, nous vous apportons des conseils avisés et des solutions créatives pour garantir que votre événement soit mémorable, fluide et dépasse toutes vos attentes. Laissez-nous prendre en charge les détails pour que vous puissiez profiter pleinement de chaque instant.',
    images: [
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/consulting1.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/consulting2.jpg',
      'https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/consulting3.jpg',
    ],
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
      </svg>
    ),
  },
];


const App: React.FC = () => {
  const sectionsRef = {
    hero: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const [currentView, setCurrentView] = useState<'home' | 'services' | 'about' | 'contact' | 'serviceDetail'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const navigateTo = (view: 'home' | 'services' | 'about' | 'contact' | 'serviceDetail', serviceId?: string) => {
    setCurrentView(view);
    setSelectedServiceId(serviceId || null);

    // If navigating to a main section, scroll to it after view change
    if (['home', 'services', 'about', 'contact'].includes(view)) {
      // Small delay to allow DOM to update before scrolling
      setTimeout(() => {
        const section = sectionsRef[view as keyof typeof sectionsRef].current;
        if (section) {
          const yOffset = -80; // Adjust for fixed navbar height
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 0);
    }
  };

  const handleSelectService = (serviceId: string) => {
    navigateTo('serviceDetail', serviceId);
  };

  const handleBackToServices = () => {
    navigateTo('services');
  };

  const selectedService = selectedServiceId
    ? servicesData.find(service => service.id === selectedServiceId)
    : null;

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

      <Navbar onNavLinkClick={(id) => navigateTo(id as any)} /> {/* Cast to any for Navbar compatibility */}
      <main>
        {currentView === 'serviceDetail' && selectedService ? (
          <ServiceDetail service={selectedService} onBack={handleBackToServices} />
        ) : (
          <>
            <div ref={sectionsRef.hero}>
              <Hero onScrollToContact={() => navigateTo('contact')} />
            </div>
            <div ref={sectionsRef.services}>
              <Services servicesData={servicesData} onSelectService={handleSelectService} />
            </div>
            <div ref={sectionsRef.about}>
              <About />
            </div>
            <div ref={sectionsRef.contact}>
              <Contact />
            </div>
          </>
        )}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
