import React, { useState } from 'react';
import { Calendar, Car } from 'lucide-react';
import DateTimePickerModal from './DateTimePickerModal';
import LocationSelection from './driver/LocationSelection';
import LocationMap from './driver/LocationMap';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface BookingData {
  date: Date;
  pickup: string;
  dropoff: string;
  duration: number;
  pickupLocation?: Location;
  dropoffLocation?: Location;
}

const DriverBooking = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    date: new Date(),
    pickup: '',
    dropoff: '',
    duration: 1,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState<'pickup' | 'dropoff' | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<{
    pickup?: Omit<Location, 'address'>;
    dropoff?: Omit<Location, 'address'>;
  }>({});

  const handleLocationSelect = (type: 'pickup' | 'dropoff') => (location: Location) => {
    setSelectedLocations(prev => ({
      ...prev,
      [type]: { lat: location.lat, lng: location.lng }
    }));
    setBookingData(prev => ({
      ...prev,
      [type]: location.address,
      [`${type}Location`]: location
    }));
    setShowMap(null);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Driver booking submitted:', bookingData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Car className="w-8 h-8 text-teal-600 mr-3" />
        <h2 className="text-3xl font-bold">Book a Driver</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">When do you need a driver?</h3>
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 
                     rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 
                     dark:hover:border-teal-500 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 group-hover:text-teal-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {formatDateTime(bookingData.date)}
              </span>
            </div>
          </button>
        </div>

        <LocationSelection
          pickup={bookingData.pickup}
          dropoff={bookingData.dropoff}
          onPickupClick={() => setShowMap('pickup')}
          onDropoffClick={() => setShowMap('dropoff')}
        />

        <div>
          <h3 className="text-lg font-semibold mb-3">Duration</h3>
          <select
            value={bookingData.duration}
            onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
              <option key={hours} value={hours}>
                {hours} {hours === 1 ? 'hour' : 'hours'}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700
                   transform transition-all duration-200 hover:scale-[1.02]"
        >
          Book Driver
        </button>
      </form>

      {showDatePicker && (
        <DateTimePickerModal
          selectedDate={bookingData.date}
          onDateChange={(date) => {
            setBookingData({ ...bookingData, date });
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showMap && (
        <LocationMap
          type={showMap}
          selectedLocations={selectedLocations}
          onLocationSelect={handleLocationSelect(showMap)}
          onBack={() => setShowMap(null)}
        />
      )}
    </div>
  );
};

export default DriverBooking;