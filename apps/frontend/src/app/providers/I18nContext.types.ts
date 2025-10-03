import { Locale, translations } from '@/shared/config/i18n';

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)[Locale];
}
