// Update the location type to support multiple stops
export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';
export type ServiceType = 'driver' | 'nanny' | 'handyman';

export interface Stop {
  id: string;
  address: string;
  type: 'pickup' | 'dropoff' | 'stop';
  order: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  type: ServiceType;
  status: BookingStatus;
  date: string;
  time: string;
  duration: number;
  price: number;
  provider: ServiceProvider;
  stops: Stop[];
  review?: Review;
}