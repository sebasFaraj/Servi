import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationStepProps {
  location: string;
  onLocationClick: () => void;
}

const LocationStep = ({ location, onLocationClick }: LocationStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Where do you need childcare?</h3>
      <button
        onClick={onLocationClick}
        className="w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 
                 dark:hover:border-teal-500 transition-colors"
      >
        <MapPin className="w-5 h-5 mr-2 text-teal-600" />
        <div className="text-left flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Service Location
          </p>
          <p className="font-medium dark:text-white">
            {location || 'Select location'}
          </p>
        </div>
      </button>
    </div>
  );
};

export default LocationStep;