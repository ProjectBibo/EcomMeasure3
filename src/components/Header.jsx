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
                viewBox="0 0 48 48"
                className="h-9 w-9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient id="em-spark" x1="10" y1="34" x2="36" y2="12" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fff7ed" />
                    <stop offset="1" stopColor="#fde68a" />
                  </linearGradient>
                  <linearGradient id="em-pillar" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#e0f2fe" />
                    <stop offset="1" stopColor="#f0fdf4" />
                  </linearGradient>
                </defs>
                <g strokeLinecap="round" strokeLinejoin="round">
                  <path
                    d="M10 34h4.5c1.1 0 2-.9 2-2V24c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2Z"
                    fill="url(#em-pillar)"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M22 34h4.5c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2Z"
                    fill="url(#em-pillar)"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M34 34h4.5c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2H34c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2Z"
                    fill="url(#em-pillar)"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 26L18.2 20L24.5 26.8L31.4 18.2L40 24"
                    stroke="url(#em-spark)"
                    strokeWidth="2.8"
                  />
                  <circle cx="31" cy="17" r="3.2" fill="#fef9c3" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" />
                </g>
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
