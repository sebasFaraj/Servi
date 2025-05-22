import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { getCoordsFromAddress } from '../../../utils/geocoding';
import MapView from './map/MapView';

interface LocationMapProps {
  type: 'pickup' | 'dropoff';
  selectedLocations: {
    pickup?: { lat: number; lng: number };
    dropoff?: { lat: number; lng: number };
  };
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  onBack: () => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ type, selectedLocations, onLocationSelect, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const coords = await getCoordsFromAddress(searchQuery);
      const location = {
        ...coords,
        address: searchQuery // Use the entered address directly
      };
      onLocationSelect(location);
    } catch (error) {
      setSearchError('Address not found. Try a different address or click on the map.');
    } finally {
      setIsSearching(false);
    }
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
              Select {type === 'pickup' ? 'Pickup' : 'Drop-off'} Location
            </h2>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError(null);
              }}
              placeholder="Enter address..."
              className="w-full p-3 pr-12 rounded-lg text-gray-800 dark:text-white 
                       dark:bg-gray-800 placeholder-gray-500"
              disabled={isSearching}
            />
            <button 
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 
                       hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {searchError && (
            <p className="mt-2 text-sm text-red-200">{searchError}</p>
          )}
        </div>

        <div className="flex-1 relative">
          <MapView
            selectedLocations={selectedLocations}
            onLocationSelect={onLocationSelect}
          />
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