import { useState, useEffect } from 'react';
import type { Review, SortOption, ServiceFilter } from '../types/review';

const mockReviews: Review[] = [
  {
    id: '1',
    serviceType: 'Driver',
    providerName: 'John Smith',
    rating: 5,
    comment: 'Excellent service! Very professional and punctual.',
    date: '2024-03-15'
  },
  {
    id: '2',
    serviceType: 'Nanny',
    providerName: 'Sarah Johnson',
    rating: 4,
    comment: 'Great with kids, very responsible.',
    date: '2024-03-10'
  },
  {
    id: '3',
    serviceType: 'Handyman',
    providerName: 'Mike Wilson',
    rating: 5,
    comment: 'Fixed everything perfectly. Very knowledgeable and professional.',
    date: '2024-03-08'
  },
  {
    id: '4',
    serviceType: 'Driver',
    providerName: 'Emma Davis',
    rating: 3,
    comment: 'Good service but arrived a bit late.',
    date: '2024-03-05'
  }
];

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('all');

  useEffect(() => {
    let filteredReviews = [...mockReviews];

    // Apply service filter
    if (serviceFilter !== 'all') {
      filteredReviews = filteredReviews.filter(
        review => review.serviceType.toLowerCase() === serviceFilter
      );
    }

    // Apply sorting
    filteredReviews.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setReviews(filteredReviews);
  }, [sortBy, serviceFilter]);

  return {
    reviews,
    sortBy,
    setSortBy,
    serviceFilter,
    setServiceFilter
  };
}