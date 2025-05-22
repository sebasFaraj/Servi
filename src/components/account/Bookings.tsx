import React, { useState } from 'react';
import { useBookings } from '../../hooks/useBookings';
import BookingCard from './Bookings/BookingCard';
import BookingDetails from './Bookings/BookingDetails';
import type { Booking } from '../../types/booking';

const Bookings = () => {
  const { bookings, isLoading, error, cancelBooking, rescheduleBooking, addReview } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (isLoading) {
    return <div className="text-center py-4">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const otherBookings = bookings.filter(b => b.status !== 'upcoming');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Bookings</h2>
      
      <div className="space-y-4">
        {upcomingBookings.map(booking => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onClick={() => setSelectedBooking(booking)}
          />
        ))}

        {otherBookings.map(booking => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onClick={() => setSelectedBooking(booking)}
          />
        ))}
      </div>

      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={async () => {
            await cancelBooking(selectedBooking.id);
            setSelectedBooking(null);
          }}
          onReschedule={async (date, time) => {
            await rescheduleBooking(selectedBooking.id, date, time);
            setSelectedBooking(null);
          }}
          onReview={async (rating, comment) => {
            await addReview(selectedBooking.id, rating, comment);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default Bookings;