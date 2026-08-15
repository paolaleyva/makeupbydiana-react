import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "diana-beauty-language";

export function LanguageProvider({ children }) {
  // null means "no choice made yet" -> the LanguageGate will show
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || null;
  });

  useEffect(() => {
    if (language) {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang) => setLanguageState(lang);

  // t('key') looks up the current language's string; falls back to English
  const t = (key) => {
    const dict = translations[language || "en"];
    return dict?.[key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside a LanguageProvider");
  return ctx;
}