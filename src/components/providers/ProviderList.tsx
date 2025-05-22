import React, { useMemo } from 'react';
import ProviderCard from './ProviderCard';
import type { Provider } from '../../types/provider';

interface ProviderListProps {
  providers: Provider[];
  searchQuery: string;
  serviceType: string;
}

const ProviderList = ({ providers, searchQuery, serviceType }: ProviderListProps) => {
  // Memoize filtered providers to prevent unnecessary recalculations
  const filteredProviders = useMemo(() => {
    if (!searchQuery) return providers;
    
    const query = searchQuery.toLowerCase();
    return providers.filter(provider =>
      provider.name.toLowerCase().includes(query) ||
      provider.description.toLowerCase().includes(query) ||
      provider.expertise.some(skill => skill.toLowerCase().includes(query))
    );
  }, [providers, searchQuery]);

  if (filteredProviders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No {serviceType}s found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredProviders.map(provider => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          serviceType={serviceType}
        />
      ))}
    </div>
  );
};

export default ProviderList;