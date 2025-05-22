import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './user/UserMenu';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm fixed w-full top-0 z-50 transition-colors">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/services" className="flex items-center">
            <h1 className="text-2xl font-bold text-teal-600">ServiWeb</h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/services" 
              className="text-gray-600 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Services
            </Link>
            <Link 
              to="/providers" 
              className="text-gray-600 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Become a Provider
            </Link>
            <button 
              onClick={() => navigate('/serviguy')}
              className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700"
            >
              Ask ServiGUY
            </button>
            <UserMenu />
          </div>

          <button 
            className="md:hidden text-gray-600 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              to="/services" 
              className="block py-2 text-gray-600 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/providers" 
              className="block py-2 text-gray-600 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a Provider
            </Link>
            <button 
              onClick={() => {
                navigate('/serviguy');
                setIsMenuOpen(false);
              }}
              className="w-full bg-teal-600 text-white px-6 py-2 rounded-full"
            >
              Ask ServiGUY
            </button>
            <div className="pt-2 border-t dark:border-gray-700">
              <UserMenu />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;