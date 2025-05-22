import React from 'react';
import { X, Star, Calendar } from 'lucide-react';
import type { Review } from '../../types/review';

interface ReviewModalProps {
  review: Review;
  onClose: () => void;
  onReschedule: () => void;
}

const ReviewModal = ({ review, onClose, onReschedule }: ReviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold dark:text-white">Review Details</h2>
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
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold capitalize dark:text-white mb-2">
                {review.serviceType}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Provider:</strong> {review.providerName}
              </p>
            </div>
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold dark:text-white">Review</h4>
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="p-6 border-t dark:border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onReschedule}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                     transition-colors"
          >
            Reschedule Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;