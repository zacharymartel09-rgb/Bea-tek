import React from 'react';
import { Service } from '../types';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  onScrollToContact: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onScrollToContact }) => {
  if (!service) {
    return (
      <section className="py-20 bg-bea-tek-dark text-white text-center pt-28">
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
    <section className="py-20 bg-bea-tek-dark text-white pt-28">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-6 border-b-2 border-bea-tek-magenta pb-2">Description Complète</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Points Clés</h3>
            <ul className="space-y-4">
              {service.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-bea-tek-magenta mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
           <button
            onClick={onScrollToContact}
            className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Demander un devis pour ce service
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
