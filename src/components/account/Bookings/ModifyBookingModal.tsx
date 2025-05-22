import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import DateTimePicker from '../../booking/DateTimePicker';
import LocationEdit from './LocationEdit';
import DurationEdit from './DurationEdit';
import { calculatePrice } from '../../../utils/pricing';
import type { Booking } from '../../../types/booking';

interface ModifyBookingModalProps {
  booking: Booking;
  onClose: () => void;
  onSave: (updates: Partial<Booking>) => Promise<void>;
}

const ModifyBookingModal = ({ booking, onClose, onSave }: ModifyBookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modifications, setModifications] = useState({
    date: booking.date,
    time: booking.time,
    duration: booking.duration,
    location: booking.location
  });

  // Calculate price difference
  const newPrice = calculatePrice(booking.type, modifications.duration, modifications.location);
  const priceDifference = newPrice - booking.price;

  const hasChanges = 
    modifications.date !== booking.date ||
    modifications.time !== booking.time ||
    modifications.duration !== booking.duration ||
    JSON.stringify(modifications.location) !== JSON.stringify(booking.location);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave({
        ...modifications,
        price: newPrice
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold dark:text-white">Modify Booking</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                       dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/50 
                          p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Date and Time</h3>
            <DateTimePicker
              selectedDate={new Date(`${modifications.date}T${modifications.time}`)}
              onDateChange={(date) => setModifications({
                ...modifications,
                date: date.toISOString().split('T')[0],
                time: date.toTimeString().slice(0, 5)
              })}
              minDate={new Date()}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Location</h3>
            <LocationEdit
              initialLocation={modifications.location}
              serviceType={booking.type}
              onSave={async (location) => {
                setModifications({ ...modifications, location });
              }}
              onCancel={() => {}}
              isSubmitting={false}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Duration</h3>
            <DurationEdit
              booking={{ ...booking, ...modifications }}
              onSave={async (duration) => {
                setModifications({ ...modifications, duration });
              }}
              onCancel={() => {}}
              isSubmitting={false}
            />
          </div>

          <div className="border-t dark:border-gray-700 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
              <span className="font-medium">${booking.price}</span>
            </div>
            {priceDifference !== 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Price Difference:</span>
                <span className={`font-medium ${priceDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {priceDifference > 0 ? '+' : ''}{priceDifference}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold">
              <span>New Total:</span>
              <span>${newPrice}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                       dark:hover:bg-gray-700 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasChanges || isSubmitting}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyBookingModal;