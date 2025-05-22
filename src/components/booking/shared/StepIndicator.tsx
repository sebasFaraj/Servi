import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${index < currentStep 
                ? 'bg-teal-600 text-white' 
                : index === currentStep 
                  ? 'bg-teal-100 text-teal-600 border-2 border-teal-600' 
                  : 'bg-gray-100 text-gray-400'
              }
            `}>
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className={`w-12 h-1 ${
                index < currentStep ? 'bg-teal-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;