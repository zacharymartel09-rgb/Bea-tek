
import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
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
    description: 'Nos DJs passionnés transforment votre événement en une fête inoubliable. Soirées privées, événements d\'entreprise, festivals – nous adaptons la musique à votre style.',
    fullDescription: 'Avec BEATEK Events, chaque battement est une promesse, chaque mix une célébration. Nos DJs sont de véritables architectes sonores, dotés d\'une capacité inégalée à lire l\'énergie d\'une foule et à y répondre avec une bande-son parfaite. Que vous recherchiez l\'élégance discrète pour un cocktail ou l\'ambiance électrisante d\'une soirée dansante, nous adaptons notre style, du top 40 aux genres underground, en passant par des classiques intemporels. Nous utilisons un équipement DJ de pointe et une bibliothèque musicale infinie pour créer une ambiance sonore fluide, des transitions impeccables et une piste de danse qui ne désemplit jamais. Laissez-nous orchestrer les moments les plus mémorables de votre événement, où chaque note résonne avec votre vision.',
    keyFeatures: [
      'Playlists 100% personnalisées selon vos goûts',
      'Matériel DJ professionnel (Pioneer, Technics)',
      'Animation micro dynamique et adaptée',
      'Large bibliothèque musicale tous styles confondus',
      'Culture musicale approfondie pour des sélections pointues',
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
    fullDescription: 'Le son est l\'âme de tout événement, et chez BEATEK Events, nous sommes maîtres dans l\'art de le parfaire. Nous offrons des solutions de sonorisation haut de gamme, conçues pour s\'adapter à l\'acoustique unique de chaque lieu, du petit rassemblement intime aux grandes productions en plein air. Notre équipement de pointe garantit une clarté vocale exceptionnelle, des basses profondes et une fidélité audio irréprochable, que ce soit pour des présentations, des performances musicales live ou une ambiance de fond sophistiquée. Nos techniciens du son gèrent l\'installation, l\'optimisation et la surveillance en temps réel, assurant une expérience auditive immersive et sans faille, du premier mot au dernier accord.',
    keyFeatures: [
      'Sonorisation haute-fidélité pour une clarté parfaite',
      'Systèmes adaptés à la taille de votre événement',
      'Installation, calibrage et démontage inclus',
      'Technicien du son disponible sur site',
      'Microphones sans fil et filaires de qualité',
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
    fullDescription: 'Transformez n\'importe quel espace en un tableau vivant avec nos solutions d\'éclairage ambiant et dynamique. Chez BEATEK Events, nous comprenons que la lumière est bien plus qu\'une simple illumination ; c\'est un outil puissant pour créer des émotions, des points focaux et des ambiances inoubliables. Des projecteurs architecturaux qui subliment les contours d\'un lieu aux éclairages intelligents qui dansent au rythme de la musique, en passant par les gobos personnalisés et les ambiances colorées, nous concevons des scénographies lumineuses sur mesure. Nos designers lumière utilisent les dernières technologies pour sculpter l\'espace, mettre en valeur les artistes et les décors, et immerger vos invités dans une expérience visuelle captivante et spectaculaire.',
    keyFeatures: [
      'Création d\'ambiance sur mesure (couleurs, intensité)',
      'Éclairage dynamique pour piste de danse (Lyres, Scans)',
      'Éclairage architectural pour sublimer le lieu',
      'Machines à fumée ou brouillard pour texturer la lumière',
      'Programmation de shows lumineux synchronisés',
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
    fullDescription: 'La complexité de l\'organisation événementielle peut être intimidante, mais avec le service de conseil de BEATEK Events, la sérénité est à portée de main. Nous sommes votre partenaire dédié, vous guidant à travers chaque étape, de l\'idéation initiale à l\'exécution impeccable. Nous vous aidons à affiner votre vision, à optimiser votre budget, à sélectionner les meilleurs prestataires et à orchestrer une logistique sans faille. Nous anticipons les défis et trouvons des solutions créatives pour chaque détail, garantissant que votre événement soit non seulement réussi, mais qu\'il dépasse toutes vos attentes, vous permettant de profiter pleinement de chaque instant sans stress.',
    keyFeatures: [
      'Accompagnement de A à Z, de l\'idée à la réalisation',
      'Planification logistique et technique',
      'Coordination des prestataires (traiteur, photographe, etc.)',
      'Gestion du budget et optimisation des coûts',
      'Présence le jour J pour une tranquillité d\'esprit totale',
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
    contact: useRef<HTMLDivElement>(null),
  };

  const [currentView, setCurrentView] = useState<'home' | 'services' | 'contact' | 'serviceDetail'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const navigateTo = (view: 'home' | 'services' | 'contact' | 'serviceDetail', serviceId?: string) => {
    setCurrentView(view);
    setSelectedServiceId(serviceId || null);

    // If navigating to a main section, scroll to it after view change
    if (['home', 'services', 'contact'].includes(view)) {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <ServiceDetail service={selectedService} onBack={handleBackToServices} onScrollToContact={() => navigateTo('contact')} />
        ) : (
          <>
            <div ref={sectionsRef.hero}>
              <Hero onScrollToContact={() => navigateTo('contact')} />
            </div>
            <div ref={sectionsRef.services}>
              <Services servicesData={servicesData} onSelectService={handleSelectService} />
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