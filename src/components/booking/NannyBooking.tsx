import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import DateTimePickerModal from './DateTimePickerModal';
import LocationSelection from './LocationSelection';
import LocationMap from './map/LocationMap';

const NannyBooking = () => {
  const [bookingData, setBookingData] = useState({
    date: new Date(),
    duration: 4,
    children: 1,
    specialRequirements: '',
    location: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setBookingData(prev => ({
      ...prev,
      location: location.address
    }));
    setShowMap(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nanny booking submitted:', bookingData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Baby className="w-8 h-8 text-teal-600 mr-3" />
        <h2 className="text-3xl font-bold">Book a Nanny</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">When do you need care?</h3>
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg border-2 
                     border-gray-200 dark:border-gray-700 hover:border-teal-500"
          >
            {bookingData.date.toLocaleString()}
          </button>
        </div>

        <LocationSelection
          address={bookingData.location}
          onClick={() => setShowMap(true)}
          label="Service Location"
        />

        <div>
          <h3 className="text-lg font-semibold mb-3">Duration</h3>
          <select
            value={bookingData.duration}
            onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white"
          >
            {[4, 6, 8, 10, 12].map((hours) => (
              <option key={hours} value={hours}>{hours} hours</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Number of Children</h3>
          <select
            value={bookingData.children}
            onChange={(e) => setBookingData({ ...bookingData, children: parseInt(e.target.value) })}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>{num} {num === 1 ? 'child' : 'children'}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Special Requirements</h3>
          <textarea
            value={bookingData.specialRequirements}
            onChange={(e) => setBookingData({ ...bookingData, specialRequirements: e.target.value })}
            placeholder="Any special requirements or instructions..."
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700
                   transform transition-all duration-200 hover:scale-[1.02]"
        >
          Book Nanny
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
          onLocationSelect={handleLocationSelect}
          onBack={() => setShowMap(false)}
          label="Service Location"
        />
      )}
    </div>
  );
};

export default NannyBooking;