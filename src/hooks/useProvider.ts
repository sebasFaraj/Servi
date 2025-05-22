import { useState, useEffect } from 'react';
import { mockProviders } from './useProviders';
import type { Provider } from '../types/provider';

export function useProvider(id: string, type: string) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvider = () => {
      setIsLoading(true);
      try {
        // Get providers of the specified type
        const providers = mockProviders[type as keyof typeof mockProviders] || [];
        
        // Find the provider with matching ID
        const foundProvider = providers.find(p => p.id === id);
        
        if (!foundProvider) {
          throw new Error('Provider not found');
        }

        setProvider(foundProvider);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load provider');
        setProvider(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvider();
  }, [id, type]);

  return { provider, isLoading, error };
}