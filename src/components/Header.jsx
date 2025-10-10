// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const flags = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
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

  const toggleLanguage = () => {
    const nextLanguage = language === "nl" ? "en" : "nl";
    changeLanguage(nextLanguage);
  };

  const nextLanguage = language === "nl" ? "en" : "nl";

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 140) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transform-gpu transition-transform duration-300 ease-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
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
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
              aria-label={t.languageSwitch.aria[language]}
              title={t.languageSwitch.title[language]}
            >
              <span aria-hidden>{flags[nextLanguage]}</span>
              <span>{t.languageSwitch.cta[language]}</span>
              <span className="sr-only">{t.languageSwitch.helper[language]}</span>
            </button>
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
          <a href="/" className="group flex items-center gap-3 relative" aria-label="EcomMeasure home">
            <span className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-blue via-brand-teal to-brand-yellow text-white shadow-[0_16px_32px_rgba(15,23,42,0.2)] ring-1 ring-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 dark:ring-white/10 dark:shadow-[0_18px_36px_rgba(2,6,23,0.45)]">
              <svg
                viewBox="0 0 40 40"
                className="h-8 w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M8 28L14.5 16.5L20 24L24.5 18L32 28"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12.5H14M26 12.5H32"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute -inset-1 rounded-[1.75rem] border border-white/20 opacity-40" aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-neutral-900 transition-colors dark:text-white">EcomMeasure</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.38em] text-neutral-500 transition-colors group-hover:text-neutral-700 dark:text-gray-300 dark:group-hover:text-white">
                Insights
              </span>
            </span>
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
