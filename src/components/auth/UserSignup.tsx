import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, CircuitBoard } from 'lucide-react';

const UserSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      //TODO: Add real Form validation for each item

      //TODO: Add Real API call to create a user in db 
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to services on success
      navigate('/services');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <CircuitBoard className="w-12 h-12 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Join Our Community
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create your account to access quality services
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                           dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                           dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                           focus:ring-teal-500 focus:border-teal-500"
                  placeholder="First"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                           dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                           dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                           focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Last"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                         dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                         focus:ring-teal-500 focus:border-teal-500"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                         dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                         focus:ring-teal-500 focus:border-teal-500"
                placeholder="+1 (555) 000-0000"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                         dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                         focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                         dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                         focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                     shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <button 
              type="button"
              onClick={() => navigate('/auth/signin')}
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;