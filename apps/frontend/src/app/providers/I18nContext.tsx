import { createContext } from 'react';
import { I18nContextType } from './I18nContext.types';

export const I18nContext = createContext<I18nContextType | undefined>(undefined);
