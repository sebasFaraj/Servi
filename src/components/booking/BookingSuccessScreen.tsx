import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Clock, CreditCard } from 'lucide-react';
import { useBookings } from '../../hooks/useBookings';


//TODO: Decide what this screen does, where is the booking being handled exactly?
const BookingSuccessScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceType, provider, booking } = location.state || {};
  const { addBooking } = useBookings();

  useEffect(() => {
    const init = async () => {
      if (!provider || !booking) {
        navigate('/services');
        return;
      }

      try {
        await addBooking({
          type: serviceType,
          provider,
          ...booking
        });
      } catch (error) {
        console.error('Failed to save booking:', error);
      }
    };

    init();
  // Only run once when component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!provider || !booking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 
                        dark:bg-teal-900 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your {serviceType} service has been booked successfully
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Provider Info */}
          <div className="flex items-center space-x-4 pb-6 mb-6 border-b dark:border-gray-700">
            {provider.avatar && (
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold dark:text-white">{provider.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{provider.title}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-5 h-5 text-teal-600 mr-3" />
              <span>{new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString()}</span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-teal-600 mr-3" />
              <span>{booking.location}</span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 text-teal-600 mr-3" />
              <span>{booking.duration} hours</span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <CreditCard className="w-5 h-5 text-teal-600 mr-3" />
              <span>${booking.price}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/account/bookings')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                     transition-colors"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                     rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Book Another Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessScreen;