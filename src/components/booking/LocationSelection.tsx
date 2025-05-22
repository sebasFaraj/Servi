import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectionProps {
  address?: string;
  onClick?: () => void;
  label?: string;
  required?: boolean;
}

const LocationSelection = ({ 
  address,
  onClick,
  label = 'Service Location',
  required = true
}: LocationSelectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Location Details</h3>
        {required && (
          <span className="text-sm text-red-500">*Required</span>
        )}
      </div>
      
      <button
        type="button" // Prevent form submission
        onClick={onClick}
        className="w-full flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 
                 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 
                 transition-colors"
      >
        <MapPin className="w-5 h-5 text-teal-600" />
        <div className="text-left flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="font-medium dark:text-white">{address || 'Select location'}</p>
        </div>
      </button>
    </div>
  );
};

export default LocationSelection;