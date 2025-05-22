import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DateTimePickerModalProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
  minDate?: Date;
}

const DateTimePickerModal = ({ 
  selectedDate, 
  onDateChange, 
  onClose,
  minDate = new Date()
}: DateTimePickerModalProps) => {
  // Keep local state for the form inputs
  const [dateValue, setDateValue] = useState(selectedDate.toISOString().split('T')[0]);
  const [timeValue, setTimeValue] = useState(selectedDate.toTimeString().slice(0, 5));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDate = new Date(`${dateValue}T${timeValue}`);
    onDateChange(newDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold dark:text-white">Select Date & Time</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              min={minDate.toISOString().split('T')[0]}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time
            </label>
            <input
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
              step="1800" // 30-minute intervals
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                       dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                       transition-colors"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateTimePickerModal;