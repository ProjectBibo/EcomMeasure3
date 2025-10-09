// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ensureTheme, setThemeMode } from "../utils/theme";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const { mode } = ensureTheme();
    setIsDark(mode === "dark");

    const handleMode = (event) => {
      if (event?.detail?.mode) {
        setIsDark(event.detail.mode === "dark");
      }
    };

    window.addEventListener("theme:mode", handleMode);
    return () => window.removeEventListener("theme:mode", handleMode);
  }, []);

  const toggleDark = () => {
    const next = isDark ? "light" : "dark";
    setThemeMode(next);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* === TOP BAR: gecentreerde hoofdnav + dark toggle rechts === */}
      <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="max-w-7xl mx-auto h-12 px-6 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* links lege kolom als spacer */}
          <div />
          {/* gecentreerde nav */}
          <nav className="flex items-center gap-6 text-[15px] md:text-base lg:text-[17px] font-medium">
            <a href="#diensten" className="nav-underline text-neutral-700 dark:text-gray-200">Diensten</a>
            <a href="#workflow" className="nav-underline text-neutral-700 dark:text-gray-200">Aanpak</a>
            <a href="#case" className="nav-underline text-neutral-700 dark:text-gray-200">Cases</a>
            <a href="#reviews" className="nav-underline text-neutral-700 dark:text-gray-200">Reviews</a>
            <a href="#contact" className="nav-underline text-neutral-700 dark:text-gray-200">Contact</a>
          </nav>
          {/* dark toggle rechts */}
          <div className="flex items-center justify-end">
            <button
              onClick={toggleDark}
              className="inline-flex items-center gap-2 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
              title={isDark ? "Schakel licht thema in" : "Schakel donker thema in"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline text-sm">{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* === BOTTOM BAR: groot logo + 3 dienstenkolommen + CTA === */}
      <div className="relative bg-white/80 dark:bg-surface-dark/80 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* Logo links — groot, mag buiten bar uitsteken */}
          <a href="/" className="flex items-center gap-3 relative">
            {/* Let op bestandsnaam/case in /public/ */}
            <img
              src="/Logo.png"
              alt="EcomMeasure logo"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain -my-2 md:-my-3 lg:-my-4"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* 3 dienstenkolommen in het midden (md+) */}
          <div className="hidden md:flex items-stretch gap-8">
            <div className="svc-col">
              <a href="#diensten" className="svc-head">Meer meten</a>
              <a href="#ga4" className="svc-sub">Google Analytics 4</a>
            </div>
            <div className="svc-col">
              <a href="#optimaliseer" className="svc-head">Optimaliseer je website</a>
              <a href="#ux" className="svc-sub">UX / CRO</a>
            </div>
            <div className="svc-col">
              <a href="#dx" className="svc-head">Digitale ervaring op maat</a>
              <a href="#nieuwesite" className="svc-sub">Een nieuwe website</a>
            </div>
          </div>

          {/* CTA rechts */}
          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="px-5 py-2 rounded-md bg-accent text-white font-semibold shadow hover:shadow-lg hover-lift transition"
            >
              Laten we kennismaken
            </a>
          </div>

          {/* Mobiel: horizontale scroller onder bar */}
          <div className="md:hidden absolute left-0 right-0 -bottom-10 px-6">
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <div className="svc-col-mobile">
                <a href="#diensten" className="svc-head">Meer meten</a>
                <a href="#ga4" className="svc-sub">Google Analytics 4</a>
              </div>
              <div className="svc-col-mobile">
                <a href="#optimaliseer" className="svc-head">Optimaliseer je website</a>
                <a href="#ux" className="svc-sub">UX / CRO</a>
              </div>
              <div className="svc-col-mobile">
                <a href="#dx" className="svc-head">Digitale ervaring op maat</a>
                <a href="#nieuwesite" className="svc-sub">Een nieuwe website</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
