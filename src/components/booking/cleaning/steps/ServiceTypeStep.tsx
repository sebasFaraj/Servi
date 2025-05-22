import React from 'react';
import { Sparkles, Home } from 'lucide-react';

interface ServiceTypeStepProps {
  serviceType: string;
  propertySize: string;
  onServiceTypeChange: (type: string) => void;
  onPropertySizeChange: (size: string) => void;
  error?: string | null;
}

const ServiceTypeStep = ({
  serviceType,
  propertySize,
  onServiceTypeChange,
  onPropertySizeChange,
  error
}: ServiceTypeStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Type of Cleaning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onServiceTypeChange('standard')}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              serviceType === 'standard'
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Sparkles className={`w-6 h-6 ${
                serviceType === 'standard' ? 'text-teal-600' : 'text-gray-400'
              }`} />
              <div>
                <h4 className="font-medium mb-1">Standard Cleaning</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Regular cleaning and maintenance
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onServiceTypeChange('deep')}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              serviceType === 'deep'
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Home className={`w-6 h-6 ${
                serviceType === 'deep' ? 'text-teal-600' : 'text-gray-400'
              }`} />
              <div>
                <h4 className="font-medium mb-1">Deep Cleaning</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Thorough cleaning of all areas
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Property Size</h3>
        <select
          value={propertySize}
          onChange={(e) => onPropertySizeChange(e.target.value)}
          className={`w-full p-3 rounded-lg border ${
            error && !propertySize ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } dark:bg-gray-700 dark:text-white`}
        >
          <option value="">Select size</option>
          <option value="small">Small (up to 1000 sq ft)</option>
          <option value="medium">Medium (1000-2000 sq ft)</option>
          <option value="large">Large (2000+ sq ft)</option>
        </select>
        {error && !propertySize && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ServiceTypeStep;