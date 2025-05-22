import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import type { Review } from '../../types/review';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const navigate = useNavigate();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleBookAgain = (serviceType: string) => {
    navigate(`/book/${serviceType.toLowerCase()}`);
  };

  const handleReschedule = () => {
    if (selectedReview) {
      navigate(`/book/${selectedReview.serviceType.toLowerCase()}`);
      setSelectedReview(null);
    }
  };

  return (
    <>
      <div className="grid gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onBookAgain={handleBookAgain}
            onClick={() => setSelectedReview(review)}
          />
        ))}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onReschedule={handleReschedule}
        />
      )}
    </>
  );
};

export default ReviewsList;