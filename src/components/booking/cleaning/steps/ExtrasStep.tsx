import React from 'react';
import { Wind, Shirt, UtensilsCrossed, FolderKanban } from 'lucide-react';

interface ExtrasStepProps {
  extras: {
    windows: boolean;
    laundry: boolean;
    dishes: boolean;
    organizing: boolean;
  };
  onExtrasChange: (extras: ExtrasStepProps['extras']) => void;
}

const ExtrasStep = ({ extras, onExtrasChange }: ExtrasStepProps) => {
  const handleToggle = (key: keyof typeof extras) => {
    onExtrasChange({
      ...extras,
      [key]: !extras[key]
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Additional Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleToggle('windows')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            extras.windows
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Wind className={`w-5 h-5 ${extras.windows ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="font-medium">Window Cleaning</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Interior and exterior windows
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleToggle('laundry')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            extras.laundry
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Shirt className={`w-5 h-5 ${extras.laundry ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="font-medium">Laundry Service</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Wash, dry, and fold
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleToggle('dishes')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            extras.dishes
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
          }`}
        >
          <div className="flex items-center space-x-3">
            <UtensilsCrossed className={`w-5 h-5 ${extras.dishes ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="font-medium">Dish Washing</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Clean and put away dishes
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleToggle('organizing')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            extras.organizing
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FolderKanban className={`w-5 h-5 ${extras.organizing ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="font-medium">Organizing</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Basic organization and tidying
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ExtrasStep;