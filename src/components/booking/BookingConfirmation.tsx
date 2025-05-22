import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Clock, CreditCard } from 'lucide-react';

interface BookingConfirmationProps {
  serviceType: string;
  provider: {
    name: string;
    avatar: string;
  };
  booking: {
    date: Date;
    time: string;
    location: string;
    duration: number;
    price: number;
  };
}

const BookingConfirmation = ({ serviceType, provider, booking }: BookingConfirmationProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 
                      dark:bg-teal-900 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your {serviceType} has been booked successfully
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>{booking.date.toLocaleDateString()} at {booking.time}</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>{booking.location}</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <Clock className="w-5 h-5 text-teal-600" />
            <span>{booking.duration} hours</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <CreditCard className="w-5 h-5 text-teal-600" />
            <span>${booking.price}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <h3 className="font-semibold mb-4">Your {serviceType}</h3>
          <div className="flex items-center space-x-4">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{provider.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Will arrive at the scheduled time
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/account/bookings')}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;