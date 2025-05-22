import React, { createContext, useContext } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageContext = createContext<ReturnType<typeof useLanguage> | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguage();
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
}