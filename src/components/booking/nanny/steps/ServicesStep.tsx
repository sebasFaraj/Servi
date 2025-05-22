import React from 'react';
import { UtensilsCrossed, Sparkles, Users } from 'lucide-react';

interface ServicesStepProps {
  cooking: boolean;
  cleaning: boolean;
  children: number;
  onServiceChange: (service: 'cooking' | 'cleaning', value: boolean) => void;
  onChildrenChange: (count: number) => void;
}

const ServicesStep = ({ cooking, cleaning, children, onServiceChange, onChildrenChange }: ServicesStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Number of Children</h3>
        <div className="flex items-center space-x-4">
          <Users className="w-5 h-5 text-teal-600" />
          <select
            value={children}
            onChange={(e) => onChildrenChange(parseInt(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'child' : 'children'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onServiceChange('cooking', !cooking)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              cooking
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <UtensilsCrossed className={`w-6 h-6 ${cooking ? 'text-teal-600' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-medium">Meal Preparation</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Includes preparing meals and snacks for children
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onServiceChange('cleaning', !cleaning)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              cleaning
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Sparkles className={`w-6 h-6 ${cleaning ? 'text-teal-600' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-medium">Light Housekeeping</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Includes tidying up after children and basic cleaning
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesStep;