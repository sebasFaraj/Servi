import React from 'react';
import { Car } from 'lucide-react';

const DriverBookingHeader = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center space-x-4">
        <div className="bg-teal-100 p-3 rounded-full">
          <Car className="w-8 h-8 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Book a Driver</h2>
          <p className="text-gray-600">Professional drivers at your service</p>
        </div>
      </div>
    </div>
  );
};

export default DriverBookingHeader;