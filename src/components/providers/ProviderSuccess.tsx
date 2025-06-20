import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ProviderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Application Received!</h1>
            <p className="text-gray-600">
              Thank you for applying to join ServiWeb. We'll review your application and get back to you within 2-3 business days.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h2 className="font-semibold mb-2">Next Steps:</h2>
            <ol className="text-left text-gray-600 space-y-2">
              <li>1. Review of your application</li>
              <li>2. Background check verification</li>
              <li>3. Brief video interview</li>
              <li>4. Profile setup and onboarding</li>
            </ol>
          </div>

          {/*TODO: Ensure proper routing is /services and not another dashboard. UX problem*/}
          <button
            onClick={() => navigate('/services')} 
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderSuccess;





/*
Users:

Home -> Book Driver -> Car Choice -> Location/Pickup/Dropoff -> Payment -> Home 


*/