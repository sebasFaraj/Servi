export const mockBookings = [
  {
    id: '1',
    type: 'driver',
    status: 'upcoming',
    date: '2024-03-25',
    time: '14:00',
    duration: 2,
    price: 50,
    provider: {
      id: 'p1',
      name: 'John Driver',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&h=200&fit=crop'
    },
    location: {
      pickup: '123 Main St',
      dropoff: '456 Park Ave'
    }
  },
  {
    id: '2',
    type: 'nanny',
    status: 'completed',
    date: '2024-03-15',
    time: '09:00',
    duration: 4,
    price: 120,
    provider: {
      id: 'p2',
      name: 'Sarah Smith',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    location: {
      address: '789 Oak Rd'
    },
    review: {
      id: 'r1',
      rating: 5,
      comment: 'Excellent service! Very professional and great with kids.',
      createdAt: '2024-03-15T14:00:00Z'
    }
  },
  {
    id: '3',
    type: 'handyman',
    status: 'upcoming',
    date: '2024-03-28',
    time: '10:00',
    duration: 3,
    price: 150,
    provider: {
      id: 'p3',
      name: 'Mike Wilson',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    },
    location: {
      address: '321 Elm Street'
    }
  }
];