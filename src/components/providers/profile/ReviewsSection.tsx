import React from 'react';
import { Star, ThumbsUp, Calendar } from 'lucide-react';
import type { Review } from '../../../types/review';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewsSection = ({ reviews, averageRating }: ReviewsSectionProps) => {
  const totalReviews = reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Client Reviews</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-600 dark:text-gray-300">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Service: {review.serviceType}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Verified Client
              </span>
              <button className="flex items-center text-teal-600 hover:text-teal-700">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;