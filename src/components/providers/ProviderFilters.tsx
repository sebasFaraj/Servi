import React from 'react';
import type { ProviderFilters as Filters } from '../../types/provider';

interface ProviderFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const ProviderFilters = ({ filters, onChange }: ProviderFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Minimum Rating
        </label>
        <select
          value={filters.rating}
          onChange={(e) => onChange({ ...filters, rating: Number(e.target.value) })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                   dark:text-white"
        >
          <option value={0}>Any Rating</option>
          {[4, 4.5, 4.8].map((rating) => (
            <option key={rating} value={rating}>{rating}+ Stars</option>
          ))}
        </select>
      </div>

      {/* Experience Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Minimum Experience
        </label>
        <select
          value={filters.experience}
          onChange={(e) => onChange({ ...filters, experience: Number(e.target.value) })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                   dark:text-white"
        >
          <option value={0}>Any Experience</option>
          <option value={1}>1+ years</option>
          <option value={3}>3+ years</option>
          <option value={5}>5+ years</option>
          <option value={10}>10+ years</option>
        </select>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Availability
        </label>
        <select
          value={filters.availability[0] || ''}
          onChange={(e) => onChange({ ...filters, availability: e.target.value ? [e.target.value] : [] })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                   dark:text-white"
        >
          <option value="">Any Time</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Evenings">Evenings</option>
        </select>
      </div>
    </div>
  );
};

export default ProviderFilters;