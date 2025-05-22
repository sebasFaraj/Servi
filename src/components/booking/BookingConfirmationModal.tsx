import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Star, CreditCard } from 'lucide-react';
import PaymentModal from './PaymentModal';
import type { Provider } from '../../types/provider';

interface BookingConfirmationModalProps {
  provider: Provider;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingConfirmationModal = ({ provider, onConfirm, onCancel }: BookingConfirmationModalProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const estimatedPrice = 75; // Calculate based on service type and duration

  const handleConfirm = () => {
    setShowPayment(true);
  };

  return (
    <>
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

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-medium dark:text-white">{provider.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{provider.title}</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                <span>{provider.rating} rating · {provider.experience} years experience</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                <span>{provider.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-teal-600 mr-2" />
                <span>{provider.availability}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-teal-600 mr-2" />
                <span>2 hours service</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-teal-600 mr-2" />
                <span>${estimatedPrice}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                By confirming this booking, you agree to our terms of service and cancellation policy.
                You can cancel or modify your booking up to 24 hours before the scheduled time.
              </p>
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
              onClick={handleConfirm}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          amount={estimatedPrice}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={onConfirm}
          testMode={true}
        />
      )}
    </>
  );
};

export default BookingConfirmationModal;