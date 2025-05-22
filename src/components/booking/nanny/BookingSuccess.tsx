import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Clock, UtensilsCrossed, Sparkles } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    navigate('/services');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 
                      dark:bg-teal-900 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your nanny service has been booked successfully
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>{bookingData.date.toLocaleString()}</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>{bookingData.location}</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <Clock className="w-5 h-5 text-teal-600" />
            <span>{bookingData.duration} hours</span>
          </div>

          {bookingData.cooking && (
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <UtensilsCrossed className="w-5 h-5 text-teal-600" />
              <span>Includes meal preparation</span>
            </div>
          )}

          {bookingData.cleaning && (
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>Includes light cleaning</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/services')}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;