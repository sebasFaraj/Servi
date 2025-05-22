import React from 'react';
import { Star, MapPin, Clock, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Provider } from '../../types/provider';

interface ProviderCardProps {
  provider: Provider;
  serviceType: string;
}

const ProviderCard = ({ provider, serviceType }: ProviderCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${serviceType}/provider/${provider.id}`, {
      state: { provider }
    });
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className="relative">
        <img 
          src={provider.coverImage || provider.avatar} 
          alt="" 
          className="w-full h-32 object-cover"
        />
        <div className="absolute bottom-0 transform translate-y-1/2 left-6">
          <img 
            src={provider.avatar} 
            alt={provider.name}
            className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 
                     object-cover shadow-lg"
          />
        </div>
      </div>

      <div className="pt-12 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold dark:text-white">{provider.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{provider.title}</p>
          </div>
          <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-yellow-700 dark:text-yellow-300 font-medium">
              {provider.rating}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{provider.location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>{provider.experience} years experience</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Languages className="w-4 h-4 mr-2" />
            <span>{provider.languages.join(', ')}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {provider.expertise.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 
                       dark:text-teal-200 text-sm rounded"
            >
              {skill}
            </span>
          ))}
        </div>

        <button 
          onClick={handleClick}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold 
                   hover:bg-teal-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;