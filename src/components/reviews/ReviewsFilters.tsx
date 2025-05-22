import React from 'react';
import { SortOption, ServiceFilter } from '../../types/review';

interface ReviewsFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  serviceFilter: ServiceFilter;
  onFilterChange: (filter: ServiceFilter) => void;
}

const ReviewsFilters = ({
  sortBy,
  onSortChange,
  serviceFilter,
  onFilterChange
}: ReviewsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-gray-700 dark:text-gray-200">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="text-gray-700 dark:text-gray-200">
          Filter by Service:
        </label>
        <select
          id="filter"
          value={serviceFilter}
          onChange={(e) => onFilterChange(e.target.value as ServiceFilter)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">All</option>
          <option value="driver">Driver</option>
          <option value="nanny">Nanny</option>
          <option value="handyman">Handyman</option>
        </select>
      </div>
    </div>
  );
};

export default ReviewsFilters;