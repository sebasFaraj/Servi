import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { generateAddress } from '../../utils/addressGenerator';
import StreetMap from './map/StreetMap';
import LocationPin from './map/LocationPin';

interface LocationMapProps {
  onLocationSelect: (location: { address: string }) => void;
  onBack: () => void;
  label?: string;
}

const LocationMap = ({ onLocationSelect, onBack, label = 'Location' }: LocationMapProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.02;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.02;
    
    const lat = 40.7128 - y;
    const lng = -74.0060 + x;
    
    setSelectedLocation({ lat, lng });
    const address = generateAddress({ lat, lng });
    onLocationSelect({ address });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // For now, just use the entered address directly
    onLocationSelect({ address: searchQuery });
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      <div className="h-full flex flex-col">
        <div className="bg-teal-600 dark:bg-teal-800 text-white p-4">
          <div className="flex items-center mb-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-teal-700 dark:hover:bg-teal-900 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold ml-4">
              Select {label}
            </h2>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter address..."
              className="w-full p-3 pr-12 rounded-lg text-gray-800 dark:text-white 
                       dark:bg-gray-800 placeholder-gray-500"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 
                       hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="flex-1 relative">
          <div 
            className="absolute inset-0 cursor-crosshair"
            onClick={handleMapClick}
          >
            <StreetMap center={{ lat: 40.7128, lng: -74.0060 }} />
            {selectedLocation && (
              <LocationPin
                type="pickup"
                lat={selectedLocation.lat}
                lng={selectedLocation.lng}
              />
            )}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter an address above or tap anywhere on the map to select your location
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;