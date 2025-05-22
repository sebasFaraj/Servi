import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPinProps {
  type: 'pickup' | 'dropoff';
  lat: number;
  lng: number;
}

const LocationPin = ({ type, lat, lng }: LocationPinProps) => {
  // Convert coordinates to percentage positions on the map
  const left = `${50 + (lng + 74.0060) * 100}%`;
  const top = `${50 + (lat - 40.7128) * 100}%`;

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ left, top }}
    >
      <div className="relative">
        <MapPin 
          className={`w-6 h-6 ${
            type === 'pickup' ? 'text-teal-600' : 'text-red-600'
          }`}
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
            type === 'pickup' 
              ? 'bg-teal-100 text-teal-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {type === 'pickup' ? 'Pickup' : 'Drop-off'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPin;