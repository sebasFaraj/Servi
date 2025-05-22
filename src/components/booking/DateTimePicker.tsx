import React from 'react';

interface DateTimePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  minDate?: Date;
}

const DateTimePicker = ({ selectedDate, onDateChange, minDate = new Date() }: DateTimePickerProps) => {
  return (
    <div className="space-y-4">
      <input
        type="date"
        min={minDate.toISOString().split('T')[0]}
        value={selectedDate.toISOString().split('T')[0]}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          newDate.setHours(selectedDate.getHours());
          onDateChange(newDate);
        }}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
      />
      <input
        type="time"
        value={selectedDate.toTimeString().slice(0, 5)}
        onChange={(e) => {
          const [hours, minutes] = e.target.value.split(':');
          const newDate = new Date(selectedDate);
          newDate.setHours(parseInt(hours), parseInt(minutes));
          onDateChange(newDate);
        }}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
      />
    </div>
  );
};

export default DateTimePicker;