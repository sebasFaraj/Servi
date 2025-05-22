import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateTimePickerModal from '../DateTimePickerModal';
import LocationMap from '../map/LocationMap';
import StepIndicator from '../shared/StepIndicator';
import ServicesStep from './steps/ServicesStep';
import LocationStep from './steps/LocationStep';

const NannyBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: new Date(),
    location: '',
    duration: 2,
    children: 1,
    cooking: false,
    cleaning: false
  });

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setBookingData(prev => ({ ...prev, location: location.address }));
    setShowMap(false);
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && !bookingData.date) {
      alert('Please select a date and time');
      return;
    }
    if (currentStep === 2 && !bookingData.location) {
      alert('Please select a location');
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/book/nanny/matches', { state: { requirements: bookingData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Baby className="w-8 h-8 text-teal-600 mr-3" />
        <h2 className="text-3xl font-bold">Book a Nanny</h2>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={3} />

      <div className="mb-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">When do you need childcare?</h3>
              <button
                onClick={() => setShowDatePicker(true)}
                className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg border-2 
                         border-gray-200 dark:border-gray-700 hover:border-teal-500"
              >
                {bookingData.date.toLocaleString()}
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">How long do you need childcare?</h3>
              <select
                value={bookingData.duration}
                onChange={(e) => setBookingData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 
                         dark:bg-gray-700 dark:text-white"
              >
                {Array.from({ length: 11 }, (_, i) => i + 2).map((hours) => (
                  <option key={hours} value={hours}>{hours} hours</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <LocationStep
            location={bookingData.location}
            onLocationClick={() => setShowMap(true)}
          />
        )}

        {currentStep === 3 && (
          <ServicesStep
            cooking={bookingData.cooking}
            cleaning={bookingData.cleaning}
            children={bookingData.children}
            onServiceChange={(service, value) => 
              setBookingData(prev => ({ ...prev, [service]: value }))
            }
            onChildrenChange={(count) => 
              setBookingData(prev => ({ ...prev, children: count }))
            }
          />
        )}
      </div>

      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-teal-600"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="ml-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          {currentStep === 3 ? 'Find Nannies' : 'Next'}
        </button>
      </div>

      {showDatePicker && (
        <DateTimePickerModal
          selectedDate={bookingData.date}
          onDateChange={(date) => {
            setBookingData(prev => ({ ...prev, date }));
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