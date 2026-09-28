'use client';

import * as React from 'react';
import {
  LanguageCode,
  languages,
  LanguageOption,
  translations,
  TranslationDictionary,
  getMultilingualBotResponse,
} from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLangOption: LanguageOption;
  t: TranslationDictionary;
  getBotResponse: (input: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<LanguageCode>('en');

  // Load language preference from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('edugram_language') as LanguageCode;
    if (saved && languages.some((l) => l.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('edugram_language', lang);
  };

  const currentLangOption =
    languages.find((l) => l.code === language) || languages[0];

  const t = translations[language] || translations.en;

  const getBotResponse = (input: string) => {
    return getMultilingualBotResponse(input, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLangOption,
        t,
        getBotResponse,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
