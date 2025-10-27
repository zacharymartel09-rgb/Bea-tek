
import React, { useState } from 'react';
import { Service } from '../types';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  if (!service) {
    return (
      <section className="py-20 bg-bea-tek-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-bea-tek-magenta mb-6">Service Non Trouvé</h2>
          <p className="text-lg text-gray-300 mb-8">Désolé, les détails de ce service n'ont pas pu être chargés.</p>
          <button
            onClick={onBack}
            className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Retour aux Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-bea-tek-dark text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={onBack}
          className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 mb-8 shadow-md"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour aux Services
        </button>

        <h2 className="text-5xl font-extrabold text-bea-tek-magenta mb-8 text-center md:text-left">{service.title}</h2>
        
        <p className="text-lg text-gray-300 leading-relaxed mb-12">
          {service.fullDescription}
        </p>

        <div className="text-center mt-12">
           <button
            onClick={onBack}
            className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Découvrir Plus de Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;