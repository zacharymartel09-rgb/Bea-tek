
import React from 'react';
import { Service } from '../types';

interface ServicesProps {
  servicesData: Service[];
  onSelectService: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ servicesData, onSelectService }) => {
  return (
    <section id="services" className="py-20 bg-bea-tek-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-bea-tek-magenta mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
