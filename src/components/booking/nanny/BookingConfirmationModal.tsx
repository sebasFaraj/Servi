import React from 'react';
import { X, Calendar, MapPin, Clock, UtensilsCrossed, Sparkles } from 'lucide-react';

interface BookingConfirmationModalProps {
  bookingData: {
    date: Date;
    location: string;
    duration: number;
    cooking: boolean;
    cleaning: boolean;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingConfirmationModal = ({ bookingData, onConfirm, onCancel }: BookingConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold dark:text-white">Confirm Booking</h3>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="w-5 h-5 mr-3 text-teal-600" />
            <span>{bookingData.date.toLocaleString()}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-5 h-5 mr-3 text-teal-600" />
            <span>{bookingData.location}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="w-5 h-5 mr-3 text-teal-600" />
            <span>{bookingData.duration} hours</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <UtensilsCrossed className="w-5 h-5 mr-3 text-teal-600" />
            <span>{bookingData.cooking ? 'Includes meal preparation' : 'No meal preparation'}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Sparkles className="w-5 h-5 mr-3 text-teal-600" />
            <span>{bookingData.cleaning ? 'Includes light cleaning' : 'No cleaning services'}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                     dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;