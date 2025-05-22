import React from 'react';
import { Bell, Lock, Moon, Globe, Shield, Smartphone, Wallet, Users, Mail } from 'lucide-react';
import { useThemeContext } from '../../../context/ThemeContext';
import { useLanguageContext } from '../../../context/LanguageContext';
import { useSettings } from '../../../hooks/useSettings';
import SettingToggle from './SettingToggle';
import type { LanguageCode } from '../../../hooks/useLanguage';

const Settings = () => {
  const { isDark, toggleTheme } = useThemeContext();
  const { language, setLanguage, languages } = useLanguageContext();
  const { settings, updateSetting, isSaving } = useSettings();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageCode);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Save Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Account Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account preferences and settings
          </p>
        </div>
        {isSaving && (
          <div className="animate-pulse bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 
                        px-4 py-2 rounded-lg text-sm font-medium">
            Saving changes...
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-teal-600" />
              Profile Information
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                           dark:text-white focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                           dark:text-white focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white flex items-center">
              <Bell className="w-5 h-5 mr-2 text-teal-600" />
              Notifications
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <SettingToggle
              icon={Mail}
              label="Email Notifications"
              description="Receive booking confirmations and updates via email"
              checked={settings.notifications}
              onChange={(checked) => updateSetting({ type: 'notifications', value: checked })}
              disabled={isSaving}
            />
            <SettingToggle
              icon={Smartphone}
              label="SMS Notifications"
              description="Get instant updates and reminders via text message"
              checked={settings.smsNotifications}
              onChange={(checked) => updateSetting({ type: 'smsNotifications', value: checked })}
              disabled={isSaving}
            />
            <SettingToggle
              icon={Wallet}
              label="Payment Alerts"
              description="Get notified about payment confirmations and receipts"
              checked={true}
              onChange={() => {}}
              disabled={isSaving}
            />
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white flex items-center">
              <Moon className="w-5 h-5 mr-2 text-teal-600" />
              Appearance
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <SettingToggle
              icon={Moon}
              label="Dark Mode"
              description="Switch between light and dark themes"
              checked={isDark}
              onChange={toggleTheme}
              disabled={isSaving}
            />
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="font-medium dark:text-white">Language</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-teal-500
                         dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                disabled={isSaving}
              >
                {languages.map(({ code, name }) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-teal-600" />
              Security
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <SettingToggle
              icon={Lock}
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={settings.twoFactor}
              onChange={(checked) => updateSetting({ type: 'twoFactor', value: checked })}
              disabled={isSaving}
            />
            <SettingToggle
              icon={Shield}
              label="Login Alerts"
              description="Get notified of new sign-ins to your account"
              checked={settings.loginAlerts}
              onChange={(checked) => updateSetting({ type: 'loginAlerts', value: checked })}
              disabled={isSaving}
            />
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
            Delete Account
          </h3>
          <p className="text-red-600 dark:text-red-300 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                     transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;