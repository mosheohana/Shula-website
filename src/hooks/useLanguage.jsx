import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy } from "../data/content.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("he");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      direction: language === "he" ? "rtl" : "ltr",
      t: copy[language],
      toggleLanguage: () => setLanguage((current) => (current === "he" ? "en" : "he"))
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
