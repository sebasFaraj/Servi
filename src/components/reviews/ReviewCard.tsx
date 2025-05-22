import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../../types/review';

interface ReviewCardProps {
  review: Review;
  onBookAgain: (serviceType: string) => void;
  onClick: () => void;
}

const ReviewCard = ({ review, onBookAgain, onClick }: ReviewCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent clicking the card when clicking the book again button
    if (!(e.target as HTMLElement).closest('button')) {
      onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all 
                hover:shadow-lg cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold capitalize dark:text-white">
            {review.serviceType}
          </h2>
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
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(review.date).toLocaleDateString()}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookAgain(review.serviceType);
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 
                   transition-colors"
        >
          Book Again
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;