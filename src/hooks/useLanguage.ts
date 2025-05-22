import { useState, useEffect, useCallback } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export function useLanguage() {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('language');
    if (saved && SUPPORTED_LANGUAGES.some(lang => lang.code === saved)) {
      return saved as LanguageCode;
    }
    return navigator.language.split('-')[0] as LanguageCode || 'en';
  });

  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
  }, []);

  // Apply language on mount
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    language,
    setLanguage,
    languages: SUPPORTED_LANGUAGES
  };
}