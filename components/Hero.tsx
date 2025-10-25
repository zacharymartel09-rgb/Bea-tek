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
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
          <span className="text-bea-tek-magenta">BEA</span>
          <span className="inline-block h-6 w-12 bg-bea-tek-magenta align-middle mx-2 -mt-2 md:-mt-4"></span>
          <span className="text-bea-tek-magenta">TEK</span>
          <span className="block text-4xl md:text-5xl mt-2 font-normal text-white">MUSIC & EVENTS</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light max-w-2xl mx-auto">
          Bienvenue sur BEA-TEK — ton univers musical. Ici, le son, c'est plus qu'une passion, c'est une expérience.
          Nous transformons chaque événement en une symphonie inoubliable avec des DJ professionnels et une sonorisation de pointe,
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