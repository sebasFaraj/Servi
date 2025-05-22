import React, { useState, useEffect } from 'react';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import UserAvatar from '../user/UserAvatar';

const Profile = () => {
  const { user, updateProfile, updateAvatar, error: authError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateAvatar(file);
      setFormError(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to update avatar');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setFormError(null);
    
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const error = formError || authError;

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="relative">
              <UserAvatar user={user} size="lg" />
              <label 
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-teal-600 rounded-full text-white
                         cursor-pointer group-hover:bg-teal-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSaving}
                />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Click the camera icon to update your photo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                       dark:bg-gray-700 dark:text-white"
              required
              disabled={isSaving}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                       dark:bg-gray-700 dark:text-white"
              required
              disabled={isSaving}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                     dark:bg-gray-700 dark:text-white"
            required
            disabled={isSaving}
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold 
                   hover:bg-teal-700 transition-colors flex items-center justify-center 
                   space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <span>Saving...</span>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;