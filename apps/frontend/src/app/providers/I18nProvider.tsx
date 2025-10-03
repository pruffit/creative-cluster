import { useState, ReactNode, useEffect } from 'react';
import { Locale, defaultLocale, translations, locales } from '@shared/config/i18n';
import { I18nContext } from './I18nContext';

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem('locale');
      if (stored && locales.includes(stored as Locale)) {
        return stored as Locale;
      }
    } catch (error) {
      console.warn('Failed to load locale from localStorage:', error);
    }
    return defaultLocale;
  });

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem('locale', newLocale);
    } catch (error) {
      console.warn('Failed to save locale to localStorage:', error);
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};
