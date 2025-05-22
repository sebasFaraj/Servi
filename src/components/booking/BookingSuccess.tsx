import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider } = location.state || {};

  if (!provider) {
    navigate('/services');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full 
                          flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your booking with {provider.name} has been confirmed
            </p>
          </div>

          <div className="mb-8">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{provider.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{provider.title}</p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 
                     transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;