import { useState, useMemo } from 'react';
import type { Provider, ServiceType, ProviderFilters } from '../types/provider';

//TODO: needs to be changed to be real data, again need to decide on Provider data struct
export const mockProviders: Record<ServiceType, Provider[]> = {
  driver: [
    {
      id: 'd1',
      name: 'James Wilson',
      title: 'Professional Driver',
      description: 'Professional driver with 8+ years of experience.',
      about: 'With over 8 years of professional driving experience.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=200&fit=crop',
      rating: 4.9,
      experience: 8,
      location: 'Manhattan, NY',
      languages: ['English', 'Spanish'],
      availability: 'Mon-Sun, 6 AM - 10 PM',
      businessHours: [
        { day: 'Monday - Friday', hours: '6:00 AM - 10:00 PM' },
        { day: 'Saturday', hours: '8:00 AM - 8:00 PM' },
        { day: 'Sunday', hours: '8:00 AM - 6:00 PM' }
      ],
      qualifications: ['Commercial Driver\'s License'],
      expertise: ['Executive Transportation', 'Airport Transfers'],
      services: ['Airport Pickup/Dropoff', 'Corporate Transportation'],
      credentials: ['Commercial Driver\'s License (CDL)'],
      education: ['Advanced Driver Training'],
      philosophy: 'Safety first',
      successStories: [
        {
          title: 'Corporate Event',
          description: 'Managed transportation for a corporate event.'
        }
      ],
      reviews: []
    },
    {
      id: 'd2',
      name: 'Maria Rodriguez',
      title: 'Executive Driver',
      description: 'Specialized in executive and VIP transportation.',
      about: 'Dedicated professional with 10+ years in executive transportation.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=200&fit=crop',
      rating: 4.8,
      experience: 10,
      location: 'Manhattan, NY',
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: 'Mon-Sun, 24/7',
      businessHours: [
        { day: 'Monday - Sunday', hours: '24/7 Available' }
      ],
      qualifications: ['Executive Driver Certification'],
      expertise: ['VIP Transportation', 'Corporate Events'],
      services: ['Executive Service', 'Airport Transfer'],
      credentials: ['Advanced Driver Certification'],
      education: ['Defensive Driving Course'],
      philosophy: 'Excellence in service',
      successStories: [
        {
          title: 'VIP Client',
          description: 'Regular driver for Fortune 500 executives.'
        }
      ],
      reviews: []
    }
  ]
};

export function useProviders(serviceType: ServiceType) {
  const [filters, setFilters] = useState<ProviderFilters>({
    rating: 0,
    experience: 0,
    availability: [],
    location: ''
  });

  // Get providers for the service type
  const providers = useMemo(() => {
    return mockProviders[serviceType] || [];
  }, [serviceType]);

  return {
    providers,
    filters,
    setFilters
  };
}