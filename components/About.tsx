import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold text-bea-tek-magenta mb-6">À Propos de BEATEK</h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Chez BEATEK Music & Events, DJ passionné, je fais vibrer chaque soirée. Notre passion est de créer des ambiances sonores et visuelles exceptionnelles pour tous vos événements.
            Fondée il y a plusieurs années, notre entreprise s'est bâtie une réputation d'excellence grâce à notre engagement envers la qualité, la fiabilité et le professionnalisme.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Nos DJs et notre équipement de sonorisation de pointe garantissent que chaque détail est parfait, quelle que soit la nature de votre événement. Nous nous engageons à comprendre vos besoins uniques et à les transformer en une réalité qui dépasse vos attentes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;