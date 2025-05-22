import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectionProps {
  pickup: string;
  dropoff: string;
  onPickupClick: () => void;
  onDropoffClick: () => void;
}

const LocationSelection = ({ pickup, dropoff, onPickupClick, onDropoffClick }: LocationSelectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold mb-4">Location Details</h3>
      
      <button
        onClick={onPickupClick}
        className="w-full flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 
                 hover:border-teal-500 transition-colors"
      >
        <MapPin className="w-5 h-5 text-teal-600" />
        <div className="text-left flex-1">
          <p className="text-sm text-gray-500">Pickup Location</p>
          <p className="font-medium">{pickup || 'Select pickup point'}</p>
        </div>
      </button>

      <button
        onClick={onDropoffClick}
        className="w-full flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 
                 hover:border-teal-500 transition-colors"
      >
        <MapPin className="w-5 h-5 text-teal-600" />
        <div className="text-left flex-1">
          <p className="text-sm text-gray-500">Drop-off Location</p>
          <p className="font-medium">{dropoff || 'Select drop-off point'}</p>
        </div>
      </button>
    </div>
  );
};

export default LocationSelection;