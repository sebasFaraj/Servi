import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Building2, Calendar, 
  FileText, Upload, ChevronRight, CircuitBoard,
  Car, Sparkles, Clock, Check 
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
  providerType: 'individual' | 'business';
  businessName?: string;
  businessEmail?: string;
  serviceType: 'driver' | 'cleaning';
  bio: string;
  motivation?: string;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    timeSlots: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
  documents: {
    id: boolean;
    passport: boolean;
    criminalRecord: boolean;
    certifications: boolean;
  };
  acceptedTerms: boolean;
}

const ProviderSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
    providerType: 'individual',
    serviceType: 'cleaning',
    bio: '',
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      timeSlots: {
        morning: false,
        afternoon: false,
        evening: false
      }
    },
    documents: {
      id: false,
      passport: false,
      criminalRecord: false,
      certifications: false
    },
    acceptedTerms: false
  });

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return '+' + digits;
    let formatted = '+504';
    if (digits.length > 3) {
      formatted += ' ' + digits.slice(3, 7);
      if (digits.length > 7) {
        formatted += '-' + digits.slice(7, 11);
      }
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    if (digits.length <= 11) {
      const formatted = formatPhoneNumber(digits);
      setFormData(prev => ({ ...prev, phone: formatted }));
    }
  };

  //TODO: Add further Form Validation (phone #, proper email checking, etc)
  const validateStep = () => {
    switch (currentStep) {
      //TODO Add Phone validation and birthdate check (over 18, birthdate being in the future, etc.)
      case 1:
        if (!formData.name || !formData.phone || !formData.birthdate) {
          alert('Please fill in all required fields');
          return false;
        }
        if (!formData.phone.startsWith('+504') || formData.phone.length < 13) {
          alert('Please enter a valid Honduras phone number');
          return false;
        }
        break;

      //TODO Address and Business Verification
      case 2:
        if (!formData.address) {
          alert('Please enter your address');
          return false;
        }
        if (formData.providerType === 'business' && (!formData.businessName || !formData.businessEmail)) {
          alert('Please enter business details');
          return false;
        }
        break;
      case 3:
        if (!formData.bio) {
          alert('Please enter your bio');
          return false;
        }
        // Check if at least one day is selected
        const hasSelectedDay = Object.entries(formData.availability)
          .filter(([key]) => key !== 'timeSlots')
          .some(([_, value]) => value);
        // Check if at least one time slot is selected
        const hasSelectedTimeSlot = Object.values(formData.availability.timeSlots).some(value => value);
        if (!hasSelectedDay || !hasSelectedTimeSlot) {
          alert('Please select at least one day and time slot for availability');
          return false;
        }
        break;
      case 4:
        // TODO ADD Document Validation
        if (!formData.acceptedTerms) {
          alert('Please accept the terms and conditions');
          return false;
        }
        break;
    }
    return true;
  };

  //TODO: Handle API call for creating a Provider
  const submitForm = () => {
    return
  }

  //Handler function for going onto next step
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      } else {
        navigate('/provider/success');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <CircuitBoard className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Join as a Service Provider
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share your expertise with our community
          </p>
        </div>

    {/*Number Navbar*/}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          {/*Section 1*/}
          {currentStep === 1 && 
          (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                             dark:text-white focus:ring-2 focus:ring-teal-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number (Honduras)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="pl-10 w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                             dark:text-white focus:ring-2 focus:ring-teal-500"
                    placeholder="+504 XXXX-XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="pl-10 w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                             dark:text-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/*Section 2*/}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Provider Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, providerType: 'individual' })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.providerType === 'individual'
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <User className="w-6 h-6 mb-2 text-teal-600" />
                    <h3 className="font-medium">Individual</h3>
                    <p className="text-sm text-gray-500">Work as an individual provider</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, providerType: 'business' })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.providerType === 'business'
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Building2 className="w-6 h-6 mb-2 text-teal-600" />
                    <h3 className="font-medium">Business</h3>
                    <p className="text-sm text-gray-500">Register as a business entity</p>
                  </button>
                </div>
              </div>

              {formData.providerType === 'business' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName || ''}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                               dark:text-white focus:ring-2 focus:ring-teal-500"
                      placeholder="Your business name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={formData.businessEmail || ''}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        className="pl-10 w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                                 dark:text-white focus:ring-2 focus:ring-teal-500"
                        placeholder="business@example.com"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="pl-10 w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                             dark:text-white focus:ring-2 focus:ring-teal-500"
                    placeholder="Your address"
                  />
                </div>
              </div>
            </div>
          )}

          {/*Section 3*/}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'driver' })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.serviceType === 'driver'
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Car className="w-6 h-6 mb-2 text-teal-600" />
                    <h3 className="font-medium">Driver</h3>
                    <p className="text-sm text-gray-500">Provide transportation services</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'cleaning' })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.serviceType === 'cleaning'
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Sparkles className="w-6 h-6 mb-2 text-teal-600" />
                    <h3 className="font-medium">Cleaning</h3>
                    <p className="text-sm text-gray-500">Provide cleaning services</p>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Availability</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Days
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(formData.availability)
                      .filter(([key]) => key !== 'timeSlots')
                      .map(([day, isSelected]) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            availability: {
                              ...formData.availability,
                              [day]: !isSelected
                            }
                          })}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="capitalize">{day}</span>
                            {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.entries(formData.availability.timeSlots).map(([slot, isSelected]) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          availability: {
                            ...formData.availability,
                            timeSlots: {
                              ...formData.availability.timeSlots,
                              [slot]: !isSelected
                            }
                          }
                        })}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="capitalize">{slot}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personal Experience & Background
                </label>
                <textarea
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                         dark:text-white focus:ring-2 focus:ring-teal-500 h-32"
                  placeholder="Tell us about your professional experience, skills, and qualifications..."
                />
              </div>
            </div>
          )}


          {/*Section 4*/}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                <div className="space-y-4">
                  {/*Map for each Document Type*/}
                  {Object.entries(formData.documents).map(([docType, isUploaded]) => (
                    <div key={docType} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-teal-600 mr-3" />
                        <div>
                          <p className="font-medium capitalize">{docType.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-sm text-gray-500">
                            {isUploaded ? 'Document uploaded' : 'Upload required'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"

                        //TODO: Implement Back-End Check Here
                        onClick={() => setFormData({
                          ...formData,
                          documents: {
                            ...formData.documents,
                            [docType]: true
                          }
                        })}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isUploaded
                            ? 'bg-green-100 text-green-700'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        {isUploaded ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Uploaded
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the terms and conditions, including background checks and verification
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-teal-600">
              Back
            </button>
          )}
          <button
            type="button"
            onClick = {currentStep === 4 ? submitForm : handleNext}
            className="ml-auto flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg 
                   hover:bg-teal-700">
            {currentStep === 4 ? 'Submit Application' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderSignup;