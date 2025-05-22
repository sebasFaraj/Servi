export type SortOption = 'recent' | 'highest' | 'lowest';
export type ServiceFilter = 'all' | 'driver' | 'nanny' | 'handyman';

export interface Review {
  id: string;
  serviceType: string;
  providerName: string;
  rating: number;
  comment: string;
  date: string;
}