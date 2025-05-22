import React from 'react';
import { Filter } from 'lucide-react';
import type { ServiceType, BookingStatus } from '../../../types/booking';

interface BookingsFilterProps {
  serviceType: ServiceType | 'all';
  status: BookingStatus | 'all';
  onServiceTypeChange: (type: ServiceType | 'all') => void;
  onStatusChange: (status: BookingStatus | 'all') => void;
}

const BookingsFilter = ({
  serviceType,
  status,
  onServiceTypeChange,
  onStatusChange
}: BookingsFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Filters:</span>
      </div>
      
      <div className="flex flex-1 gap-4 flex-col sm:flex-row">
        <select
          value={serviceType}
          onChange={(e) => onServiceTypeChange(e.target.value as ServiceType | 'all')}
          className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                   dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300"
        >
          <option value="all">All Services</option>
          <option value="driver">Driver</option>
          <option value="nanny">Nanny</option>
          <option value="handyman">Handyman</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as BookingStatus | 'all')}
          className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                   dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default BookingsFilter;