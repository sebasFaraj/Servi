import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    serviceType: 'Driver',
    providerName: 'John Smith',
    rating: 5,
    comment: 'Excellent service! Very professional and punctual.',
    date: '2024-03-15'
  },
  {
    id: 2,
    serviceType: 'Nanny',
    providerName: 'Sarah Johnson',
    rating: 4,
    comment: 'Great with kids, very responsible.',
    date: '2024-03-10'
  }
];

const Reviews = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Reviews</h2>
      
      <div className="space-y-4">
        {reviews.map(review => (
          <div 
            key={review.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{review.serviceType}</h3>
                <p className="text-gray-600">Provider: {review.providerName}</p>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;