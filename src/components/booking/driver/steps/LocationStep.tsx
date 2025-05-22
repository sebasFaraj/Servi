import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationStepProps {
  pickup: string;
  dropoff: string;
  onPickupClick: () => void;
  onDropoffClick: () => void;
  error?: string | null;
}

const LocationStep = ({ pickup, dropoff, onPickupClick, onDropoffClick, error }: LocationStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Where are you going?</h3>
      
      <div className="space-y-4">
        {/* Pickup Location */}
        <button
          onClick={onPickupClick}
          className={`w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                   border-2 ${error && !pickup ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} 
                   hover:border-teal-500 dark:hover:border-teal-500 transition-colors`}
        >
          <MapPin className="w-5 h-5 mr-2 text-teal-600" />
          <div className="text-left flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pickup Location
            </p>
            <p className="font-medium dark:text-white">
              {pickup || 'Select pickup location'}
            </p>
          </div>
        </button>

        {/* Dropoff Location */}
        <button
          onClick={onDropoffClick}
          className={`w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                   border-2 ${error && !dropoff ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} 
                   hover:border-teal-500 dark:hover:border-teal-500 transition-colors`}
        >
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          <div className="text-left flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dropoff Location
            </p>
            <p className="font-medium dark:text-white">
              {dropoff || 'Select dropoff location'}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LocationStep;