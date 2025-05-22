import React from 'react';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import type { Booking } from '../../../types/booking';

interface BookingCardProps {
  booking: Booking;
  onClick: () => void;
}

const BookingCard = ({ booking, onClick }: BookingCardProps) => {
  const statusColors = {
    upcoming: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
  };

  return (
    <button 
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 
                hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold dark:text-white capitalize">{booking.type}</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300 mt-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{booking.date} at {booking.time}</span>
            </div>
            {booking.location?.pickup && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{booking.location.pickup} → {booking.location.dropoff}</span>
              </div>
            )}
            {booking.location?.address && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{booking.location.address}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{booking.duration} hours</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
            {booking.status}
          </span>
          {booking.review && (
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{booking.review.rating}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default BookingCard;