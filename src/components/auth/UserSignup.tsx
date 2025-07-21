import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, CircuitBoard } from 'lucide-react';

/* ---------- Config ---------- */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

const hondurasRE = /^\+504\s\d{4}-\d{4}$/; // +504 ####-####


const UserSignup = () => {
  const navigate = useNavigate();

  /* state */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  /* phone formatter */
  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '');           // keep numbers
    if (!digits.startsWith('504') && digits.length) return '+504 '; // force prefix

    // digits = 504XXXXXXXX
    const local = digits.slice(3, 11);               // max 8 local digits
    const first = local.slice(0, 4);
    const last = local.slice(4, 8);
    return last
      ? `+504 ${first}-${last}`
      : first
        ? `+504 ${first}`
        : '+504 ';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      } = formData;

      if (!firstName || !lastName || !email || !phone || !password) {
        throw new Error('All fields are required');
      }

      if (!hondurasRE.test(phone)) {
        throw new Error('Phone must match +504 ####-####');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      /* --- API CALL --- */
      const res = await fetch(`${API_BASE}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim().toLowerCase(),
          phone,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Signup failed');
      }

      /* Success → route */
      navigate('/services');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- UI ---------- */
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

          {/* first + last */}
          <div className="grid grid-cols-2 gap-4">
            {(['firstName', 'lastName'] as const).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {field === 'firstName' ? 'First Name' : 'Last Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id={field}
                    type="text"
                    required
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                               dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                               dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                               focus:ring-teal-500 focus:border-teal-500"
                    placeholder={field === 'firstName' ? 'First' : 'Last'}
                    disabled={isLoading}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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

          {/* phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number (Honduras)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                           dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                           dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                           focus:ring-teal-500 focus:border-teal-500"
                placeholder="+504 XXXX-XXXX"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* password / confirm */}
          {(['password', 'confirmPassword'] as const).map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {field === 'password' ? 'Password' : 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id={field}
                  type="password"
                  required
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="appearance-none block w-full pl-11 pr-3 py-2 border border-gray-300 
                             dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400
                             dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                             focus:ring-teal-500 focus:border-teal-500"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}

          {/* submit */}
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
            <span className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
            </span>
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



//Users can only book an hour in advance 