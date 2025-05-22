import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  onClick: () => void;
}

const StatCard = ({ icon: Icon, label, value, onClick }: StatCardProps) => (
  <button
    onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-teal-50 rounded-full">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  </button>
);

export default StatCard;