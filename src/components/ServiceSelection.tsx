import React from 'react';
import { Car, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceButton from './ServiceButton';

const services = [
  {
    icon: Car,
    title: 'Book a Driver',
    description: 'Professional drivers for all your transportation needs',
    path: '/book/driver'
  },
  {
    icon: MessageSquare,
    title: 'Ask ServiGUY',
    description: 'AI assistant to help you find the right service',
    path: '/serviguy'
  }
];

const ServiceSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6 pt-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Choose Your Service
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceButton key={service.path} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;