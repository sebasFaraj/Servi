import React from 'react';
import { Clock } from 'lucide-react';
import BookingCard from './BookingCard';
import type { Booking } from '../../../types/booking';

interface BookingsListProps {
  title: string;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  showCountdown?: boolean;
}

const BookingsList = ({ title, bookings, onBookingClick, showCountdown }: BookingsListProps) => {
  const getTimeUntilBooking = (date: string, time: string) => {
    const bookingDate = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = bookingDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  if (bookings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="space-y-2">
            {showCountdown && booking.status === 'upcoming' && (
              <div className="flex items-center text-sm text-teal-600 dark:text-teal-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>Starting in {getTimeUntilBooking(booking.date, booking.time)}</span>
              </div>
            )}
            <BookingCard
              booking={booking}
              onClick={() => onBookingClick(booking)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;