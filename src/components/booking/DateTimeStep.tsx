import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeStepProps {
  date: Date;
  duration: number;
  onShowDatePicker: () => void;
  onDurationChange: (duration: number) => void;
  error?: string | null;
}

const DateTimeStep = ({ date, duration, onShowDatePicker, onDurationChange, error }: DateTimeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">When do you need the service?</h3>
        <button
          type="button"
          onClick={onShowDatePicker}
          className={`w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 
                   rounded-lg border-2 ${
                     error 
                       ? 'border-red-500' 
                       : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
                   } transition-colors group`}
        >
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400 group-hover:text-teal-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {date.toLocaleString()}
            </span>
          </div>
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">How long do you need the service?</h3>
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={duration}
            onChange={(e) => onDurationChange(parseInt(e.target.value))}
            className="w-full pl-12 p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white appearance-none"
          >
            {[2, 3, 4, 6, 8, 10, 12].map((hours) => (
              <option key={hours} value={hours}>
                {hours} hours
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default DateTimeStep;