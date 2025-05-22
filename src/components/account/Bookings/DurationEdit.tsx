import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { calculatePrice } from '../../../utils/pricing';
import type { Booking } from '../../../types/booking';

interface DurationEditProps {
  booking: Booking;
  onSave: (duration: number) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const DurationEdit = ({ booking, onSave, isSubmitting }: DurationEditProps) => {
  const [duration, setDuration] = useState(booking.duration);
  const newPrice = calculatePrice(booking.type, duration, booking.location);

  const handleSave = () => {
    onSave(duration);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Duration (hours)
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                   dark:text-white"
          disabled={isSubmitting}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
            <option key={hours} value={hours}>
              {hours} hour{hours > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {duration !== booking.duration && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>New estimated price: ${newPrice}</p>
          <p className="mt-1">
            <Clock className="w-4 h-4 inline-block mr-1" />
            Price adjusted based on duration change
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={isSubmitting || duration === booking.duration}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Update Duration
      </button>
    </div>
  );
};

export default DurationEdit;