import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useProviders } from '../../../hooks/useProviders';
import ProviderList from '../../providers/ProviderList';
import ProviderFilters from '../../providers/ProviderFilters';

const NannyMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requirements = location.state?.requirements;
  const { providers, filters, setFilters } = useProviders('nanny');

  if (!requirements) {
    navigate('/book/nanny');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Best Matches</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Based on your requirements for {requirements.date.toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold">Filters</h3>
            </div>
            <ProviderFilters
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </div>

        {/* Provider List */}
        <div className="flex-1">
          <ProviderList
            providers={providers}
            searchQuery=""
            serviceType="nanny"
          />
        </div>
      </div>
    </div>
  );
};

export default NannyMatches;