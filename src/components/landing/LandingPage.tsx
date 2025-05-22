import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <CircuitBoard className="w-20 h-20 text-teal-400 animate-pulse" />
          <h1 className="text-6xl font-bold text-white ml-4">ServiWeb</h1>
        </div>
        <p className="text-xl text-teal-100 mb-12 max-w-2xl">
          Your trusted platform for verified service providers. 
          Experience the future of on-demand services.
        </p>
        <button 
          onClick={() => navigate('/join')}
          className="bg-teal-500 text-white px-12 py-4 rounded-full text-xl font-semibold
                   hover:bg-teal-400 transform hover:scale-105 transition-all
                   shadow-lg hover:shadow-teal-400/50"
        >
          Join Our Community
        </button>
      </div>
    </div>
  );
};

export default LandingPage;