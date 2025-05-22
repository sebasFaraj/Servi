import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCog, ArrowRight } from 'lucide-react';

const CommunityChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Growing Community
          </h1>
          <p className="text-xl text-teal-100">
            Choose how you want to be part of ServiWeb
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Provider Card */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-teal-600 rounded-lg">
                <UserCog className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Service Provider</h2>
            </div>
            <p className="text-teal-100 mb-6">
              Share your skills and expertise with those who need them. Join our network of trusted professionals.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/auth/provider/signup')}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 
                         transition-colors flex items-center justify-center"
              >
                Create Provider Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => navigate('/auth/provider/signin')}
                className="w-full border border-white/20 text-white px-6 py-3 rounded-lg 
                         hover:bg-white/10 transition-colors"
              >
                Sign In as Provider
              </button>
            </div>
          </div>

          {/* User Card */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-teal-600 rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Community Member</h2>
            </div>
            <p className="text-teal-100 mb-6">
              Access quality services from verified professionals. Be part of a community that helps each other grow.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/auth/signup')}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 
                         transition-colors flex items-center justify-center"
              >
                Create Member Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => navigate('/auth/signin')}
                className="w-full border border-white/20 text-white px-6 py-3 rounded-lg 
                         hover:bg-white/10 transition-colors"
              >
                Sign In as Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChoice;