import React from 'react';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  rating: number;
  price: string;
}

const ServiceCard = ({ title, description, image, rating, price }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-600">{rating}</span>
          </div>
          <span className="text-teal-600 font-semibold">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;