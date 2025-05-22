import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPinProps {
  x: number;
  y: number;
  type: 'pickup' | 'dropoff';
}

const LocationPin = ({ x, y, type }: LocationPinProps) => (
  <div 
    className="absolute transform -translate-x-1/2 -translate-y-1/2"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <MapPin 
      className={`w-6 h-6 ${type === 'pickup' ? 'text-teal-600' : 'text-blue-600'}`} 
    />
  </div>
);

export default LocationPin;