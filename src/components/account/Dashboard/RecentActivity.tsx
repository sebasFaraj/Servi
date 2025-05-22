import React from 'react';
import { Calendar, Star } from 'lucide-react';

const RecentActivity = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2 border-b">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-teal-600" />
          <span>Booked a driver for tomorrow</span>
        </div>
        <span className="text-sm text-gray-500">2 hours ago</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <div className="flex items-center space-x-3">
          <Star className="w-5 h-5 text-teal-600" />
          <span>Left a review for John D.</span>
        </div>
        <span className="text-sm text-gray-500">Yesterday</span>
      </div>
    </div>
  </div>
);

export default RecentActivity;