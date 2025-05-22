import React, { useState, useMemo } from 'react';
import { useBookings } from '../../../hooks/useBookings';
import BookingsFilter from './BookingsFilter';
import BookingsList from './BookingsList';
import BookingDetails from './BookingDetails';
import type { Booking, ServiceType, BookingStatus } from '../../../types/booking';

const Bookings = () => {
  const { 
    bookings, 
    isLoading, 
    error, 
    cancelBooking, 
    rescheduleBooking, 
    addReview,
    updateBookingLocation 
  } = useBookings();
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesType = serviceType === 'all' || booking.type === serviceType;
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [bookings, serviceType, statusFilter]);

  const { upcomingBookings, pastBookings } = useMemo(() => {
    const now = new Date();
    return filteredBookings.reduce(
      (acc, booking) => {
        const bookingDate = new Date(`${booking.date}T${booking.time}`);
        if (bookingDate > now && booking.status === 'upcoming') {
          acc.upcomingBookings.push(booking);
        } else {
          acc.pastBookings.push(booking);
        }
        return acc;
      },
      { upcomingBookings: [] as Booking[], pastBookings: [] as Booking[] }
    );
  }, [filteredBookings]);

  // Sort bookings by date
  upcomingBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  pastBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoading) {
    return <div className="text-center py-4">Loading bookings...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">Your Bookings</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
        </span>
      </div>

      <BookingsFilter
        serviceType={serviceType}
        status={statusFilter}
        onServiceTypeChange={setServiceType}
        onStatusChange={setStatusFilter}
      />

      <div className="space-y-8">
        <BookingsList
          title="Upcoming Bookings"
          bookings={upcomingBookings}
          onBookingClick={setSelectedBooking}
          showCountdown
        />

        <BookingsList
          title="Past Bookings"
          bookings={pastBookings}
          onBookingClick={setSelectedBooking}
        />

        {filteredBookings.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No bookings found
          </p>
        )}
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
          onUpdateLocation={async (location) => {
            await updateBookingLocation(selectedBooking.id, location);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default Bookings;