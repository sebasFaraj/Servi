import React from 'react';
import { Clock } from 'lucide-react';

interface DurationStepProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

const DurationStep = ({ duration, onDurationChange }: DurationStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">How long do you need the driver?</h3>
      <div className="relative">
        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <select
          value={duration}
          onChange={(e) => onDurationChange(parseInt(e.target.value))}
          className="w-full pl-12 p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                   dark:bg-gray-700 dark:text-white appearance-none"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
            <option key={hours} value={hours}>
              {hours} {hours === 1 ? 'hour' : 'hours'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DurationStep;