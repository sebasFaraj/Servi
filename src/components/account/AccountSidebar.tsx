import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, Calendar, Star, CreditCard, Settings, 
  Info, LogOut 
} from 'lucide-react';

const menuItems = [
  { icon: User, label: 'Profile', path: '/account/profile' },
  { icon: Calendar, label: 'Bookings', path: '/account/bookings' },
  { icon: Star, label: 'Reviews', path: '/account/reviews' },
  { icon: CreditCard, label: 'Payment Methods', path: '/account/payments' },
  { icon: Settings, label: 'Settings', path: '/account/settings' },
  { icon: Info, label: 'About', path: '/account/about' },
];

const AccountSidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <nav className="space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
              ${isActive 
                ? 'bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
        
        <button 
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                   text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 
                   transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;