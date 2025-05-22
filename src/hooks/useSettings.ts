import { useState, useEffect } from 'react';
import type { UserSettings, SettingsUpdate } from '../types/settings';

const DEFAULT_SETTINGS: UserSettings = {
  notifications: true,
  smsNotifications: false,
  darkMode: false,
  language: 'English',
  twoFactor: false,
  loginAlerts: true
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    };

    loadSettings();
  }, []);

  const updateSetting = async ({ type, value }: SettingsUpdate) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedSettings = { ...settings, [type]: value };
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);

      // Show saving state briefly
      setTimeout(() => setIsSaving(false), 500);
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  };

  return {
    settings,
    updateSetting,
    isSaving
  };
}