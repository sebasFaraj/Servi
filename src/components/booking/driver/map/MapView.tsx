import React, { useState } from 'react';
import { generateAddress } from '../../../../utils/addressGenerator';
import StreetMap from './StreetMap';
import LocationPin from './LocationPin';

interface MapViewProps {
  selectedLocations: {
    pickup?: { lat: number; lng: number };
    dropoff?: { lat: number; lng: number };
  };
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const MapView = ({ selectedLocations, onLocationSelect }: MapViewProps) => {
  const [center] = useState({ lat: 40.7128, lng: -74.0060 });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.02;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.02;
    
    const lat = center.lat - y;
    const lng = center.lng + x;
    
    // Generate a realistic street address based on the coordinates
    const address = generateAddress({ lat, lng });
    
    onLocationSelect({ lat, lng, address });
  };

  return (
    <div 
      className="relative w-full h-full cursor-crosshair overflow-hidden"
      onClick={handleMapClick}
    >
      <StreetMap center={center} />
      
      {selectedLocations.pickup && (
        <LocationPin
          type="pickup"
          lat={selectedLocations.pickup.lat}
          lng={selectedLocations.pickup.lng}
        />
      )}
      
      {selectedLocations.dropoff && (
        <LocationPin
          type="dropoff"
          lat={selectedLocations.dropoff.lat}
          lng={selectedLocations.dropoff.lng}
        />
      )}
    </div>
  );
};

export default MapView;