import React from 'react';
import { MapPin, Check } from 'lucide-react';
import type { Stop } from '../../../types/booking';

interface LocationStepProps {
  stops: Stop[];
  onStopClick: (stop: Stop) => void;
  onSameAsPickup: () => void;
  sameAsPickup: boolean;
  error?: string | null;
}

const LocationStep = ({ stops, onStopClick, onSameAsPickup, sameAsPickup, error }: LocationStepProps) => {
  const pickup = stops.find(stop => stop.type === 'pickup');
  const dropoff = stops.find(stop => stop.type === 'dropoff');

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Where are you going?</h3>
      
      <div className="space-y-2">
        {/* Pickup Location */}
        <button
          onClick={() => pickup && onStopClick(pickup)}
          className={`w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                   border-2 ${error && !pickup?.address ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} 
                   hover:border-teal-500 dark:hover:border-teal-500 transition-colors`}
        >
          <MapPin className="w-5 h-5 mr-2 text-teal-600" />
          <div className="text-left flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pickup Location
            </p>
            <p className="font-medium dark:text-white">
              {pickup?.address || 'Select pickup location'}
            </p>
          </div>
        </button>

        {/* Same as Pickup Checkbox */}
        <button
          type="button"
          onClick={onSameAsPickup}
          className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 
                   hover:text-teal-600 transition-colors"
        >
          <div className={`w-5 h-5 rounded border ${
            sameAsPickup 
              ? 'bg-teal-600 border-teal-600' 
              : 'border-gray-300 dark:border-gray-600'
          } flex items-center justify-center`}>
            {sameAsPickup && <Check className="w-4 h-4 text-white" />}
          </div>
          <span>Return to pickup location</span>
        </button>

        {/* Dropoff Location */}
        {!sameAsPickup && (
          <button
            onClick={() => dropoff && onStopClick(dropoff)}
            className={`w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                     border-2 ${error && !dropoff?.address ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} 
                     hover:border-teal-500 dark:hover:border-teal-500 transition-colors`}
          >
            <MapPin className="w-5 h-5 mr-2 text-red-600" />
            <div className="text-left flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dropoff Location
              </p>
              <p className="font-medium dark:text-white">
                {dropoff?.address || 'Select dropoff location'}
              </p>
            </div>
          </button>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default LocationStep;