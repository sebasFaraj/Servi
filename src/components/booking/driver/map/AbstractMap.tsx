import React, { useState } from 'react';
import RoadPattern from './RoadPattern';
import LocationPin from './LocationPin';

interface AbstractMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const AbstractMap = ({ onLocationSelect }: AbstractMapProps) => {
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPin({ x, y });
    // Simulate real coordinates
    onLocationSelect({
      lat: 40.7128 + (y - 50) / 100,
      lng: -74.0060 + (x - 50) / 100
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0 cursor-crosshair"
        onClick={handleMapClick}
      >
        <RoadPattern />
        {pin && <LocationPin {...pin} type="pickup" />}
      </div>
      
      <div className="absolute top-4 left-4 bg-white shadow-md px-4 py-2 rounded-lg text-sm">
        Click anywhere to set location
      </div>
    </div>
  );
};

export default AbstractMap;