import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
}

const ServiceButton = ({ icon: Icon, title, description, path }: ServiceButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                transition-all transform hover:scale-[1.02] text-left dark:text-white"
    >
      <div className="flex items-start space-x-4">
        <Icon className="w-8 h-8 text-teal-600 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default ServiceButton;