
import React from 'react';
import { Service } from '../types';

const servicesData: Service[] = [
  {
    id: 'dj',
    title: 'Services DJ Pro',
    description: 'Nos DJs expérimentés transforment votre événement en une fête inoubliable. Mariages, corporatifs, soirées privées – nous adaptons la musique à votre style et à votre public.',
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6h.01M12 16h.01"></path>
      </svg>
    ),
  },
  {
    id: 'sound-system',
    title: 'Sonorisation Événementielle',
    description: 'Une qualité de son cristalline pour tous vos besoins. De petits rassemblements aux grands événements, nous fournissons et installons des systèmes de sonorisation professionnels.',
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
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      </svg>
    ),
  },
  {
    id: 'event-consulting',
    title: 'Conseil Événementiel',
    description: 'Bénéficiez de notre expertise pour planifier votre événement. Nous vous accompagnons de la conception à la réalisation, pour un succès garanti.',
    icon: (
      <svg className="w-12 h-12 text-bea-tek-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
      </svg>
    ),
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-bea-tek-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-bea-tek-magenta mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition duration-300">
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
    