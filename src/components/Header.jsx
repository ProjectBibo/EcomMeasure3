// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const flags = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const { language, changeLanguage } = useLanguage();
  const t = translations[language].header;
  const themeTitle = language === "nl"
    ? isDark
      ? "Schakel naar licht thema"
      : "Schakel naar donker thema"
    : isDark
    ? "Switch to light theme"
    : "Switch to dark theme";
  const themeLabel = language === "nl" ? (isDark ? "Licht" : "Donker") : isDark ? "Light" : "Dark";

  useEffect(() => {
    if (typeof document === "undefined") return;
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleClick = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const toggleDark = () => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const next = !html.classList.contains("dark");
    html.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);

    html.classList.add("theme-transition");
    window.setTimeout(() => html.classList.remove("theme-transition"), 250);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next ? "#0f172a" : "#fafaf7");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-white/80 backdrop-blur border-b border-neutral-200/60 dark:bg-surface-dark/80 dark:border-neutral-800/60">
        <div className="max-w-7xl mx-auto h-12 px-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <div aria-hidden />
          <nav className="flex items-center justify-center gap-6 text-[15px] md:text-base lg:text-[17px] font-medium">
            <a href="#diensten" className="nav-underline text-neutral-700 dark:text-gray-200">
              {t.nav.services}
            </a>
            <a href="#workflow" className="nav-underline text-neutral-700 dark:text-gray-200">
              {t.nav.process}
            </a>
            <a href="#case" className="nav-underline text-neutral-700 dark:text-gray-200">
              {t.nav.cases}
            </a>
            <a href="#reviews" className="nav-underline text-neutral-700 dark:text-gray-200">
              {t.nav.reviews}
            </a>
            <a href="#contact" className="nav-underline text-neutral-700 dark:text-gray-200">
              {t.nav.contact}
            </a>
          </nav>
          <div className="flex items-center justify-end gap-2">
            <div className="relative" ref={languageMenuRef}>
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                aria-haspopup="listbox"
                aria-expanded={languageMenuOpen}
              >
                <span aria-hidden>{flags[language]}</span>
                <span className="hidden sm:inline">{t.languages[language]}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${languageMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <ul
                role="listbox"
                tabIndex={-1}
                className={`absolute right-0 z-20 mt-2 min-w-[10rem] overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-xl backdrop-blur-md transition-all duration-150 ease-out dark:border-white/10 dark:bg-surface-dark/95 ${
                  languageMenuOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {Object.entries(t.languages).map(([code, label]) => (
                  <li key={code}>
                    <button
                      type="button"
                      onClick={() => {
                        changeLanguage(code);
                        setLanguageMenuOpen(false);
                      }}
                      role="option"
                      aria-selected={language === code}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        language === code
                          ? "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-white"
                          : "text-neutral-700 hover:bg-neutral-100/80 dark:text-gray-200 dark:hover:bg-white/10"
                      }`}
                    >
                      <span aria-hidden>{flags[code]}</span>
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={toggleDark}
              className="inline-flex items-center gap-2 p-2 rounded-md hover:bg-black/5 transition-colors dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
              title={themeTitle}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline text-sm">{themeLabel}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-white/80 backdrop-blur border-b border-neutral-200/60 dark:bg-surface-dark/80 dark:border-neutral-800/60 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          <a href="/" className="flex items-center gap-3 relative">
            <img
              src="/Logo.png"
              alt="EcomMeasure logo"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain -my-2 md:-my-3 lg:-my-4"
              loading="eager"
              decoding="async"
            />
          </a>

          <div className="hidden md:flex items-stretch gap-8">
            {t.columns.map((column) => (
              <div key={column.title} className="svc-col">
                <a href={column.href} className="svc-head">
                  {column.title}
                </a>
                <span className="svc-sub">{column.subtitle}</span>
              </div>
            ))}
          </div>

          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="px-5 py-2 rounded-md bg-brand-blue text-white font-semibold shadow-[0_16px_36px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(59,130,246,0.45)]"
            >
              {t.cta}
            </a>
          </div>

          <div className="md:hidden absolute left-0 right-0 -bottom-10 px-6">
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {t.columns.map((column) => (
                <div key={column.title} className="svc-col-mobile">
                  <a href={column.href} className="svc-head">
                    {column.title}
                  </a>
                  <span className="svc-sub">{column.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
