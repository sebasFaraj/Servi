export type ServiceType = 'driver';

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface SuccessStory {
  title: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  description: string;
  about: string;
  avatar: string;
  coverImage?: string;
  rating: number;
  experience: number;
  location: string;
  languages: string[];
  availability: string;
  businessHours: BusinessHours[];
  qualifications: string[];
  expertise: string[];
  services: string[];
  credentials: string[];
  education: string[];
  philosophy: string;
  successStories: SuccessStory[];
  reviews: any[];
}

export interface ProviderFilters {
  rating: number;
  experience: number;
  availability: string[];
  location: string;
}