import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, MapPin, ChevronRight } from 'lucide-react';
import DateTimePickerModal from '../DateTimePickerModal';
import LocationMap from '../map/LocationMap';
import StepIndicator from '../shared/StepIndicator';

const RequirementsForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState<'pickup' | 'dropoff'>('pickup');
  const [error, setError] = useState<string | null>(null);

  const [requirements, setRequirements] = useState({
    sameLocation: false,
    pickup: '',
    dropoff: '',
    isBetweenCities: false,
    cityFrom: '',
    cityTo: '',
    date: new Date(),
    duration: 2,
    useProviderCar: null as boolean | null
  });

  const cities = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba'];

  const validateStep = () => {
    switch (currentStep) {
      case 1: // Location
        if (!requirements.sameLocation) {
          if (!requirements.pickup || !requirements.dropoff) {
            setError('Please select both pickup and dropoff locations');
            return false;
          }
        } else if (!requirements.pickup) {
          setError('Please select a location');
          return false;
        }
        if (requirements.isBetweenCities && (!requirements.cityFrom || !requirements.cityTo)) {
          setError('Please select both cities');
          return false;
        }
        break;
      case 2: // Date & Time
        if (!requirements.date) {
          setError('Please select a date and time');
          return false;
        }
        break;
      case 3: // Car Selection
        if (requirements.useProviderCar === null) {
          setError('Please select a car option');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      setError(null);
    } 
    //TODO: If we're taking users to this page after matches are found, we need to pass information along and have /matches handle it
    else {
      navigate('/book/driver/matches', { 
        state: { requirements } 
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  const handleLocationClick = (type: 'pickup' | 'dropoff') => {
    setMapType(type);
    setShowMap(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Car className="w-8 h-8 text-teal-600 mr-3" />
        <div>
          <h2 className="text-2xl font-bold">Book a Driver</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tell us about your trip
          </p>
        </div>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={3} />

      <div className="mb-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  checked={requirements.sameLocation}
                  onChange={(e) => setRequirements(prev => ({ 
                    ...prev, 
                    sameLocation: e.target.checked,
                    dropoff: e.target.checked ? prev.pickup : prev.dropoff 
                  }))}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Pickup and dropoff locations are the same</span>
              </label>

              <div className="space-y-4">
                <button
                  onClick={() => handleLocationClick('pickup')}
                  className="w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                           border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500"
                >
                  <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pickup Location
                    </p>
                    <p className="font-medium dark:text-white">
                      {requirements.pickup || 'Select pickup location'}
                    </p>
                  </div>
                </button>

                {!requirements.sameLocation && (
                  <button
                    onClick={() => handleLocationClick('dropoff')}
                    className="w-full flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                             border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500"
                  >
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    <div className="text-left flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dropoff Location
                      </p>
                      <p className="font-medium dark:text-white">
                        {requirements.dropoff || 'Select dropoff location'}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={requirements.isBetweenCities}
                  onChange={(e) => setRequirements(prev => ({ 
                    ...prev, 
                    isBetweenCities: e.target.checked,
                    cityFrom: '',
                    cityTo: ''
                  }))}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>This is a trip between cities</span>
              </label>

              {requirements.isBetweenCities && (
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={requirements.cityFrom}
                    onChange={(e) => setRequirements(prev => ({ 
                      ...prev, 
                      cityFrom: e.target.value 
                    }))}
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                             dark:text-white"
                  >
                    <option value="">Select departure city</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>

                  <select
                    value={requirements.cityTo}
                    onChange={(e) => setRequirements(prev => ({ 
                      ...prev, 
                      cityTo: e.target.value 
                    }))}
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                             dark:text-white"
                  >
                    <option value="">Select destination city</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">When do you need a driver?</h3>
              <button
                onClick={() => setShowDatePicker(true)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 
                         rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 
                         transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400 group-hover:text-teal-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {requirements.date.toLocaleString()}
                  </span>
                </div>
              </button>
            </div>

            {/*TODO: Change implementation so that users can't request a druver for a shorter/longer time than needed */}
            {/*This is implemented when going between cities, but not when the ride is inside the city */}
            {/*TODO: Add ability to add multiple stops, right now you can only go from A -> B */}
            {!requirements.isBetweenCities && (
              <div>
                <h3 className="text-lg font-semibold mb-4">How long do you need the driver?</h3>
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
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Do you need a car?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRequirements(prev => ({ ...prev, useProviderCar: true }))}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  requirements.useProviderCar === true
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Car className={`w-6 h-6 ${
                    requirements.useProviderCar === true ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className="font-medium">Use provider's car</h4>
                    <p className="text-sm text-gray-500">The driver will pick you up in their vehicle</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRequirements(prev => ({ ...prev, useProviderCar: false }))}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  requirements.useProviderCar === false
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Car className={`w-6 h-6 ${
                    requirements.useProviderCar === false ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className="font-medium">Use my car</h4>
                    <p className="text-sm text-gray-500">The driver will drive your vehicle</p>
                  </div>
                </div>
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
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
          className="ml-auto flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg 
                   hover:bg-teal-700"
        >
          {currentStep === 3 ? 'Find Drivers' : 'Next'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>

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
          type={mapType}
          onLocationSelect={(location) => {
            setRequirements(prev => ({
              ...prev,
              [mapType]: location.address
            }));
            setShowMap(false);
          }}
          onBack={() => setShowMap(false)}
          label={mapType === 'pickup' ? 'Pickup Location' : 'Dropoff Location'}
        />
      )}
    </div>
  );
};

export default RequirementsForm;