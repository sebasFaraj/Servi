import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  pickup: string;
  dropoff: string;
  onPickupChange: (value: string) => void;
  onDropoffChange: (value: string) => void;
}

const LocationInput = ({ pickup, dropoff, onPickupChange, onDropoffChange }: LocationInputProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Location Details</h3>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Pickup location"
          value={pickup}
          onChange={(e) => onPickupChange(e.target.value)}
          className="w-full pl-12 p-3 rounded-lg border border-gray-300 focus:border-teal-500"
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Drop-off location"
          value={dropoff}
          onChange={(e) => onDropoffChange(e.target.value)}
          className="w-full pl-12 p-3 rounded-lg border border-gray-300 focus:border-teal-500"
        />
      </div>
    </div>
  );
};

export default LocationInput;