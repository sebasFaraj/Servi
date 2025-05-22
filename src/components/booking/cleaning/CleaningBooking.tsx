import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateTimePickerModal from '../DateTimePickerModal';
import LocationMap from '../map/LocationMap';
import StepIndicator from '../shared/StepIndicator';
import DateTimeStep from './steps/DateTimeStep';
import ServiceTypeStep from './steps/ServiceTypeStep';
import LocationStep from './steps/LocationStep';
import ExtrasStep from './steps/ExtrasStep';

const CleaningBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookingData, setBookingData] = useState({
    date: new Date(),
    location: '',
    serviceType: '',
    propertySize: '',
    bedrooms: 1,
    bathrooms: 1,
    extras: {
      windows: false,
      laundry: false,
      dishes: false,
      organizing: false
    },
    frequency: 'one-time',
    specialInstructions: ''
  });

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setBookingData(prev => ({ ...prev, location: location.address }));
    setShowMap(false);
    setError(null);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1: // Date & Time
        if (!bookingData.date) {
          setError('Please select a date and time');
          return false;
        }
        break;
      case 2: // Service Type
        if (!bookingData.serviceType || !bookingData.propertySize) {
          setError('Please select both service type and property size');
          return false;
        }
        break;
      case 3: // Location
        if (!bookingData.location) {
          setError('Please select a location');
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      setError(null);
    } else {
      navigate('/book/cleaning/matches', { state: { requirements: bookingData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Sparkles className="w-8 h-8 text-teal-600 mr-3" />
        <h2 className="text-3xl font-bold">Book Cleaning</h2>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={4} />

      <div className="mb-8">
        {currentStep === 1 && (
          <DateTimeStep
            date={bookingData.date}
            onShowDatePicker={() => setShowDatePicker(true)}
            error={error}
          />
        )}

        {currentStep === 2 && (
          <ServiceTypeStep
            serviceType={bookingData.serviceType}
            propertySize={bookingData.propertySize}
            bedrooms={bookingData.bedrooms}
            bathrooms={bookingData.bathrooms}
            frequency={bookingData.frequency}
            onServiceTypeChange={(type) => 
              setBookingData(prev => ({ ...prev, serviceType: type }))
            }
            onPropertySizeChange={(size) => 
              setBookingData(prev => ({ ...prev, propertySize: size }))
            }
            onBedroomsChange={(beds) =>
              setBookingData(prev => ({ ...prev, bedrooms: beds }))
            }
            onBathroomsChange={(baths) =>
              setBookingData(prev => ({ ...prev, bathrooms: baths }))
            }
            onFrequencyChange={(freq) => 
              setBookingData(prev => ({ ...prev, frequency: freq }))
            }
            error={error}
          />
        )}

        {currentStep === 3 && (
          <LocationStep
            location={bookingData.location}
            onLocationClick={() => setShowMap(true)}
            error={error}
          />
        )}

        {currentStep === 4 && (
          <ExtrasStep
            extras={bookingData.extras}
            specialInstructions={bookingData.specialInstructions}
            onExtrasChange={(extras) => 
              setBookingData(prev => ({ ...prev, extras }))
            }
            onInstructionsChange={(instructions) =>
              setBookingData(prev => ({ ...prev, specialInstructions: instructions }))
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
          {currentStep === 4 ? 'Find Cleaners' : 'Next'}
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

export default CleaningBooking;