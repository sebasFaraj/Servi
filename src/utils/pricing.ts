// Update pricing calculation to account for multiple stops
import type { ServiceType, Stop } from '../types/booking';

const BASE_RATES = {
  driver: 25,
  nanny: 30,
  handyman: 40
};

// Calculate total distance including all stops
const calculateTotalDistance = (stops: Stop[]): number => {
  // In a real app, we would use a mapping service to calculate actual distances
  // For now, estimate 5 miles between each stop
  //TODO: Add real pricing
  return (stops.length - 1) * 5;
};

export const calculatePrice = (
  type: ServiceType,
  duration: number,
  stops?: Stop[]
): number => {
  const baseRate = BASE_RATES[type];
  let price = baseRate * duration;

  // Add distance-based pricing for drivers with multiple stops
  if (type === 'driver' && stops?.length) {
    const totalDistance = calculateTotalDistance(stops);
    price += totalDistance * 2; // $2 per mile
    
    // Add surcharge for additional stops (beyond pickup and dropoff)
    const additionalStops = stops.length - 2;
    if (additionalStops > 0) {
      price += additionalStops * 5; // $5 per additional stop
    }
  }

  // Add weekend premium (20%)
  const isWeekend = new Date().getDay() % 6 === 0;
  if (isWeekend) {
    price *= 1.2;
  }

  // Add peak hours premium (15%)
  const currentHour = new Date().getHours();
  const isPeakHour = currentHour >= 7 && currentHour <= 9 || currentHour >= 16 && currentHour <= 19;
  if (isPeakHour) {
    price *= 1.15;
  }

  return Math.round(price);
};