import React, { useState } from 'react';
import type { Booking, ServiceType } from '../../../types/booking';

interface LocationEditProps {
  initialLocation: Booking['location'];
  serviceType: ServiceType;
  onSave: (location: Booking['location']) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const LocationEdit = ({
  initialLocation,
  serviceType,
  onSave,
  isSubmitting
}: LocationEditProps) => {
  const [location, setLocation] = useState(initialLocation || {});

  const handleSave = () => {
    onSave(location);
  };

  return (
    <div className="space-y-4">
      {serviceType === 'driver' ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              value={location.pickup || ''}
              onChange={(e) => setLocation({ ...location, pickup: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                       dark:text-white"
              placeholder="Enter pickup address"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Drop-off Location
            </label>
            <input
              type="text"
              value={location.dropoff || ''}
              onChange={(e) => setLocation({ ...location, dropoff: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                       dark:text-white"
              placeholder="Enter drop-off address"
              required
              disabled={isSubmitting}
            />
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Location
          </label>
          <input
            type="text"
            value={location.address || ''}
            onChange={(e) => setLocation({ address: e.target.value })}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                     dark:text-white"
            placeholder="Enter service address"
            required
            disabled={isSubmitting}
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Update Location
      </button>
    </div>
  );
};

export default LocationEdit;