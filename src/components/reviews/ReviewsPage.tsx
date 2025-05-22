import React from 'react';
import ReviewsHeader from './ReviewsHeader';
import ReviewsFilters from './ReviewsFilters';
import ReviewsList from './ReviewsList';
import { useReviews } from '../../hooks/useReviews';

const ReviewsPage = () => {
  const { 
    reviews, 
    sortBy, 
    setSortBy, 
    serviceFilter, 
    setServiceFilter 
  } = useReviews();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ReviewsHeader />
      <main className="container mx-auto px-4 py-6">
        <ReviewsFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          serviceFilter={serviceFilter}
          onFilterChange={setServiceFilter}
        />
        <ReviewsList reviews={reviews} />
      </main>
    </div>
  );
};

export default ReviewsPage;