import React from 'react';
import { Car, UserCog } from 'lucide-react';

interface CarSelectionStepProps {
  useProviderCar: boolean | null;
  onSelect: (useProviderCar: boolean) => void;
}

const CarSelectionStep = ({ useProviderCar, onSelect }: CarSelectionStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Do you need a car?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect(true)}
          className={`p-6 rounded-lg border-2 text-left transition-all ${
            useProviderCar === true
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
          }`}
        >
          <div className="flex items-center space-x-4">
            <Car className={`w-6 h-6 ${
              useProviderCar === true ? 'text-teal-600' : 'text-gray-400'
            }`} />
            <div>
              <h4 className="font-medium mb-1">Use provider's car</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The driver will pick you up in their vehicle
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect(false)}
          className={`p-6 rounded-lg border-2 text-left transition-all ${
            useProviderCar === false
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
          }`}
        >
          <div className="flex items-center space-x-4">
            <UserCog className={`w-6 h-6 ${
              useProviderCar === false ? 'text-teal-600' : 'text-gray-400'
            }`} />
            <div>
              <h4 className="font-medium mb-1">Use my car</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The driver will drive your vehicle
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CarSelectionStep;