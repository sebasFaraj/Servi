import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-600 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trusted Service Providers
          </h1>
          <p className="text-xl mb-8">
            Find verified professionals for all your needs - drivers, nannies, handymen, and more
          </p>
          
          <div className="bg-white rounded-full p-2 flex items-center max-w-2xl mx-auto">
            <div className="flex-1 flex items-center">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full px-4 py-2 focus:outline-none text-gray-700"
              />
            </div>
            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;