import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import DateTimePickerModal from './DateTimePickerModal';
import LocationSelection from './LocationSelection';
import LocationMap from './map/LocationMap';

const ServiceRequirements = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState({
    date: new Date(),
    duration: 2,
    location: '',
    specialRequirements: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = (location: { address: string }) => {
    setRequirements(prev => ({
      ...prev,
      location: location.address
    }));
    setShowMap(false);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!requirements.location) {
      setError('Please select a service location');
      return;
    }

    // Only navigate to matches when form is valid and submitted
    navigate(`/book/${serviceType}/matches`, { 
      state: { requirements } 
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 capitalize">
        Book a {serviceType}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date and Time */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            When do you need the service?
          </h3>
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg 
                     border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500"
          >
            {requirements.date.toLocaleString()}
          </button>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Where do you need the service?
          </h3>
          <LocationSelection
            address={requirements.location}
            onClick={() => setShowMap(true)}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        {/* Duration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            How long do you need the service?
          </h3>
          <select
            value={requirements.duration}
            onChange={(e) => setRequirements(prev => ({ 
              ...prev, 
              duration: parseInt(e.target.value) 
            }))}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white"
          >
            {[2, 3, 4, 6, 8].map((hours) => (
              <option key={hours} value={hours}>{hours} hours</option>
            ))}
          </select>
        </div>

        {/* Special Requirements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Requirements</h3>
          <textarea
            value={requirements.specialRequirements}
            onChange={(e) => setRequirements(prev => ({
              ...prev,
              specialRequirements: e.target.value
            }))}
            placeholder="Any special requirements or preferences..."
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold 
                   hover:bg-teal-700 transition-all"
        >
          Find Matches
        </button>
      </form>

      {showDatePicker && (
        <DateTimePickerModal
          selectedDate={requirements.date}
          onDateChange={(date) => {
            setRequirements(prev => ({ ...prev, date }));
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showMap && (
        <LocationMap
          onLocationSelect={handleLocationSelect}
          onBack={() => setShowMap(false)}
        />
      )}
    </div>
  );
};

export default ServiceRequirements;