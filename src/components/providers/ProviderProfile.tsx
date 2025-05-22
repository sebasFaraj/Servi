import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ChevronDown } from 'lucide-react';
import { useProvider } from '../../hooks/useProvider';
import BookingConfirmationModal from '../booking/BookingConfirmationModal';
import PaymentModal from '../booking/PaymentModal';


//TODO: Needs to mesh with real Provider data, also needs to stay consistent
const ProviderProfile = () => {
  const { id, serviceType } = useParams();
  const navigate = useNavigate();
  const { provider, isLoading } = useProvider(id!, serviceType!);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleConfirmBooking = () => {
    setShowConfirmation(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    const bookingData = {
      date: new Date(),
      location: provider.location,
      duration: 2,
      price: 75,
    };

    navigate(`/book/${serviceType}/success`, { 
      state: { 
        serviceType,
        provider,
        booking: bookingData
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Provider Not Found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Search
      </button>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold dark:text-white">{provider.name}</h1>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{provider.title}</p>
              <button 
                onClick={() => setShowConfirmation(true)}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      {/* ... (rest of the profile content remains the same) ... */}

      {/* Modals */}
      {showConfirmation && (
        <BookingConfirmationModal
          provider={provider}
          onConfirm={handleConfirmBooking}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {showPayment && (
        <PaymentModal
          amount={75}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
          testMode={true}
        />
      )}
    </div>
  );
};

export default ProviderProfile;