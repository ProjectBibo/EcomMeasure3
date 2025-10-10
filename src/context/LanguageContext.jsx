import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LanguageContext = createContext({
  language: "nl",
  changeLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("nl");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("ecommeasure-language");
    if (stored === "nl" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  const changeLanguage = useCallback((next) => {
    setLanguage(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ecommeasure-language", next);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
    }),
    [language, changeLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
