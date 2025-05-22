import { useState, useEffect } from 'react';
import { validateImageFile } from '../utils/fileUtils';

const STORAGE_KEY = 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: 'user' | 'provider';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const updateLocalStorage = (userData: User) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user data');
    }
  };

  const signIn = async (email: string, password: string, role: 'user' | 'provider' = 'user') => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, create a mock user
      const mockUser = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        firstName: email.split('@')[0],
        lastName: 'User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        role
      };
      
      updateLocalStorage(mockUser);
      setUser(mockUser);
      setError(null);
    } catch (error) {
      setError('Failed to sign in');
      throw error;
    }
  };

  const signUp = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'user' | 'provider';
  }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now().toString(),
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        role: data.role || 'user'
      };

      updateLocalStorage(mockUser);
      setUser(mockUser);
      setError(null);
    } catch (error) {
      setError('Failed to create account');
      throw error;
    }
  };

  const signOut = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      setError(null);
    } catch (error) {
      setError('Failed to sign out');
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedUser = { ...user, ...updates };
      if (updates.firstName || updates.lastName) {
        updatedUser.name = `${updates.firstName || user.firstName} ${updates.lastName || user.lastName}`.trim();
      }
      
      updateLocalStorage(updatedUser);
      setUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (error) {
      setError('Failed to update profile');
      throw error;
    }
  };

  const updateAvatar = async (file: File) => {
    if (!user) throw new Error('No user logged in');

    try {
      const imageData = await validateImageFile(file);
      return updateProfile({ avatar: imageData });
    } catch (error) {
      setError('Failed to update avatar');
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateAvatar
  };
}