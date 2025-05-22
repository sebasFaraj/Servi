import { avenueNames } from './constants';

interface Coordinates {
  lat: number;
  lng: number;
}

export function generateAddress(coords: Coordinates): string {
  // Convert coordinates to grid position
  const baseLatitude = 40.7128; // NYC reference point
  const baseLongitude = -74.0060;
  
  // Calculate relative position
  const latDiff = coords.lat - baseLatitude;
  const lngDiff = coords.lng - baseLongitude;
  
  // Convert to street numbers and names
  const streetNumber = Math.abs(Math.round(latDiff * 1000));
  const avenueIndex = Math.round(lngDiff * 1000) + 6; // Center around 6th Ave
  const avenueName = avenueNames[Math.abs(avenueIndex) % avenueNames.length];
  
  // Generate building number (always even on east side, odd on west side)
  const buildingBase = Math.abs(Math.round(latDiff * 10000));
  const buildingNumber = buildingBase + (buildingBase % 2 === 0 ? 0 : 1);
  
  return `${buildingNumber} ${streetNumber}th Street & ${avenueName}, New York, NY`;
}