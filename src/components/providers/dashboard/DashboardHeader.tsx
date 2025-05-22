import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Provider Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                           dark:hover:text-gray-300">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                           dark:hover:text-gray-300">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;