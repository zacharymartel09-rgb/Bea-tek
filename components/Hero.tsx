import React from 'react';

interface HeroProps {
  onScrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToContact }) => {
  return (
    <section
      id="hero"
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-center p-4"
      style={{ backgroundImage: 'url(https://raw.githubusercontent.com/google/gemini-micro-web-example/main/img/beattek_banner.png)' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 text-white max-w-4xl mx-auto">
        <h1 className="mb-4">
          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl md:text-7xl font-extrabold text-bea-tek-magenta">BEATEK</span>
            <span className="text-2xl md:text-4xl text-white -mt-1">Events</span>
          </div>
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light max-w-2xl mx-auto">
          Bienvenue sur BEATEK Events — ton univers musical. Ici, le son, c'est plus qu'une passion, c'est une expérience.
          Nous transformons chaque événement en une symphonie inoubliable avec des DJs et une sonorisation de pointe,
          créant des vibes sur mesure pour vous.
        </p>
        <button
          onClick={onScrollToContact}
          className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Demandez un Devis
        </button>
      </div>
    </section>
  );
};

export default Hero;