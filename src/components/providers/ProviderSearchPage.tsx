import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProviderList from './ProviderList';
import ProviderFilters from './ProviderFilters';
import { useProviders } from '../../hooks/useProviders';
import type { ServiceType } from '../../types/provider';

interface ProviderSearchPageProps {
  serviceType: ServiceType;
}

const ProviderSearchPage = ({ serviceType }: ProviderSearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { providers, filters, setFilters } = useProviders(serviceType);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar - Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">{serviceType}s</h2>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search for ${serviceType}s...`}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 
                         dark:border-gray-600 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <ProviderFilters
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </div>

        {/* Main Content - Provider List */}
        <div className="flex-1">
          <ProviderList
            providers={providers}
            searchQuery={searchQuery}
            serviceType={serviceType}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderSearchPage;