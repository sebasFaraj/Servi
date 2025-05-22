import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import UserAvatar from './UserAvatar';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
    navigate('/auth/signin');
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth/signin')}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
      >
        <User className="w-5 h-5" />
        <span>Sign In</span>
      </button>
    );
  }

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.name;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <UserAvatar user={user} />
        <span className="text-gray-700 dark:text-gray-200">{displayName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b dark:border-gray-700">
            <p className="font-medium text-gray-800 dark:text-white">{displayName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          
          <button
            onClick={() => {
              navigate('/account/profile');
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 
                     flex items-center space-x-2 text-gray-700 dark:text-gray-200"
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 
                     text-red-600 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;