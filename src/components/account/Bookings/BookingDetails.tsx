import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, DollarSign, Star, User, Edit2 } from 'lucide-react';
import LocationEdit from './LocationEdit';
import ModifyBookingModal from './ModifyBookingModal';
import type { Booking } from '../../../types/booking';

interface BookingDetailsProps {
  booking: Booking;
  onClose: () => void;
  onCancel: () => Promise<void>;
  onModify: (updates: Partial<Booking>) => Promise<void>;
  onReview: (rating: number, comment: string) => Promise<void>;
}

const BookingDetails = ({ 
  booking, 
  onClose, 
  onCancel, 
  onModify,
  onReview
}: BookingDetailsProps) => {
  const [isModifying, setIsModifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onCancel();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to cancel');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReview = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onReview(rating, comment);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold dark:text-white">Booking Details</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                         dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Provider */}
            <div className="flex items-center space-x-4">
              {booking.provider.avatar ? (
                <img 
                  src={booking.provider.avatar} 
                  alt={booking.provider.name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 
                              flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="font-semibold dark:text-white">{booking.provider.name}</h3>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm">{booking.provider.rating}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{booking.date} at {booking.time}</span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <div>
                  {booking.location?.pickup ? (
                    <span>{booking.location.pickup} → {booking.location.dropoff}</span>
                  ) : booking.location?.address ? (
                    <span>{booking.location.address}</span>
                  ) : (
                    <span className="text-gray-400">No location set</span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3" />
                <span>{booking.duration} hours</span>
              </div>

              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-3" />
                <span>${booking.price}</span>
              </div>
            </div>

            {/* Review Section */}
            {booking.status === 'completed' && !booking.review && (
              <div className="space-y-4 border dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold dark:text-white">Leave a Review</h4>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      disabled={isSubmitting}
                      className={`${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                           dark:text-white resize-none"
                  rows={3}
                  disabled={isSubmitting}
                />
                <button
                  onClick={handleReview}
                  disabled={isSubmitting || !comment.trim()}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </div>
            )}

            {/* Existing Review */}
            {booking.review && (
              <div className="space-y-2 border dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold dark:text-white">Your Review</h4>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= booking.review!.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">{booking.review.comment}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-6 border-t dark:border-gray-700">
            {booking.status === 'upcoming' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsModifying(true)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Modify Booking
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModifying && (
        <ModifyBookingModal
          booking={booking}
          onClose={() => setIsModifying(false)}
          onSave={onModify}
        />
      )}
    </>
  );
};

export default BookingDetails;