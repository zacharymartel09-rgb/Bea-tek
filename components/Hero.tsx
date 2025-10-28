
import React from 'react';

interface HeroProps {
  onScrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToContact }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4 pt-24 md:pt-32"
      style={{ backgroundImage: 'url(https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/beattek_banner.png)' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 text-white container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Title and CTA */}
          <div className="text-center lg:text-left">
            <h1 className="mb-4">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-5xl md:text-7xl font-extrabold text-bea-tek-magenta">BEATEK</span>
                <span className="text-2xl md:text-4xl text-white -mt-1">Events</span>
              </div>
            </h1>
            <p className="text-lg md:text-2xl mb-8 font-light max-w-2xl mx-auto lg:mx-0">
              Bienvenue sur BEATEK Events — votre univers musical. Ici, le son, c'est plus qu'une passion, c'est un art.
            </p>
            <button
              onClick={onScrollToContact}
              className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Demandez un Devis
            </button>
          </div>
          
          {/* Right Column: About Section */}
          <div className="bg-black bg-opacity-40 p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-bea-tek-magenta mb-4">À Propos de BEATEK</h2>
            <p className="text-md text-gray-200 mb-4 leading-relaxed">
              Chez BEATEK Music & Events, la passion du DJing nous anime et nous faisons vibrer chaque soirée. Notre passion est de créer des ambiances sonores et visuelles exceptionnelles pour tous vos événements : soirées privées, événements d'entreprise, festivals et lancements de produits.
              Fondée il y a quelques années, notre entreprise s'est bâtie sur notre engagement envers la qualité et la fiabilité.
            </p>
            <p className="text-md text-gray-200 leading-relaxed">
              Nos DJs et notre équipement de sonorisation de pointe garantissent que chaque détail est parfait, quelle que soit la nature de votre événement. Nous nous engageons à comprendre vos besoins uniques et à les transformer en une réalité qui dépasse vos attentes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;