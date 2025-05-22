import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SettingToggleProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const SettingToggle = ({ 
  icon: Icon, 
  label, 
  description, 
  checked, 
  onChange, 
  disabled 
}: SettingToggleProps) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg
                transition-colors hover:bg-gray-100 dark:hover:bg-gray-600">
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 
                    dark:bg-gray-600">
        <Icon className="w-5 h-5 text-teal-600" />
      </div>
      <div>
        <span className="font-medium dark:text-white">{label}</span>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer 
                    dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                    peer-checked:bg-teal-600"></div>
    </label>
  </div>
);

export default SettingToggle;