import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const LanguageSelect = ({ value, onChange, disabled }: LanguageSelectProps) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    <div className="flex items-center space-x-3">
      <Globe className="w-5 h-5 text-teal-600" />
      <span>Language</span>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500
                disabled:opacity-50"
    >
      <option>English</option>
      <option>Spanish</option>
      <option>French</option>
    </select>
  </div>
);

export default LanguageSelect;