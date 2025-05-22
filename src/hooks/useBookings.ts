import { useState, useEffect } from 'react';
import { mockBookings } from '../mockData';
import { calculatePrice } from '../utils/pricing';
import type { Booking } from '../types/booking';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookings = () => {
      try {
        const saved = localStorage.getItem('bookings');
        if (saved) {
          setBookings(JSON.parse(saved));
        } else {
          // Initialize with mock data
          localStorage.setItem('bookings', JSON.stringify(mockBookings));
          setBookings(mockBookings);
        }
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  const saveBookings = (updatedBookings: Booking[]) => {
    try {
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    } catch (err) {
      setError('Failed to save bookings');
      throw new Error('Failed to save bookings');
    }
  };

  const addBooking = async (newBooking: Omit<Booking, 'id' | 'status'>) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking: Booking = {
        ...newBooking,
        id: Date.now().toString(),
        status: 'upcoming'
      };
      
      const updatedBookings = [booking, ...bookings];
      saveBookings(updatedBookings);
      return booking;
    } catch (err) {
      setError('Failed to add booking');
      throw err;
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking = bookings.find(b => b.id === id);
      if (!booking) throw new Error('Booking not found');
      if (booking.status !== 'upcoming') throw new Error('Can only cancel upcoming bookings');

      const updated = bookings.map(b =>
        b.id === id ? { ...b, status: 'cancelled' as const } : b
      );
      saveBookings(updated);
    } catch (err) {
      setError('Failed to cancel booking');
      throw err;
    }
  };

  const rescheduleBooking = async (id: string, date: string, time: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking = bookings.find(b => b.id === id);
      if (!booking) throw new Error('Booking not found');
      if (booking.status !== 'upcoming') throw new Error('Can only reschedule upcoming bookings');

      const updated = bookings.map(b =>
        b.id === id ? { ...b, date, time } : b
      );
      saveBookings(updated);
    } catch (err) {
      setError('Failed to reschedule booking');
      throw err;
    }
  };

  const addReview = async (id: string, rating: number, comment: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking = bookings.find(b => b.id === id);
      if (!booking) throw new Error('Booking not found');
      if (booking.status !== 'completed') throw new Error('Can only review completed bookings');
      if (booking.review) throw new Error('Booking already has a review');

      const review = {
        id: `r${Date.now()}`,
        rating,
        comment,
        createdAt: new Date().toISOString()
      };

      const updated = bookings.map(b =>
        b.id === id ? { ...b, review } : b
      );
      saveBookings(updated);
    } catch (err) {
      setError('Failed to add review');
      throw err;
    }
  };

  return {
    bookings,
    isLoading,
    error,
    addBooking,
    cancelBooking,
    rescheduleBooking,
    addReview
  };
}