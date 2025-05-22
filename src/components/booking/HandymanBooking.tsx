import React, { useState } from 'react';
import { Wrench } from 'lucide-react';
import DateTimePickerModal from './DateTimePickerModal';
import LocationSelection from './LocationSelection';
import LocationMap from './map/LocationMap';

const HandymanBooking = () => {
  const [bookingData, setBookingData] = useState({
    date: new Date(),
    serviceType: '',
    description: '',
    estimatedDuration: 2,
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
    console.log('Handyman booking submitted:', bookingData);
  };

  const serviceTypes = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Assembly',
    'General Repairs',
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Wrench className="w-8 h-8 text-teal-600 mr-3" />
        <h2 className="text-3xl font-bold">Book a Handyman</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">When do you need the service?</h3>
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
          <h3 className="text-lg font-semibold mb-3">Type of Service</h3>
          <select
            value={bookingData.serviceType}
            onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a service type</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Job Description</h3>
          <textarea
            value={bookingData.description}
            onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
            placeholder="Please describe the job in detail..."
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white h-32"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Estimated Duration</h3>
          <select
            value={bookingData.estimatedDuration}
            onChange={(e) => setBookingData({ ...bookingData, estimatedDuration: parseInt(e.target.value) })}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white"
          >
            {[2, 3, 4, 6, 8].map((hours) => (
              <option key={hours} value={hours}>{hours} hours</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700
                   transform transition-all duration-200 hover:scale-[1.02]"
        >
          Book Handyman
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

export default HandymanBooking;