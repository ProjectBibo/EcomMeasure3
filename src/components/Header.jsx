// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  // Sync initial dark-mode state
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    if (typeof document === "undefined") return;
    try {
      const html = document.documentElement;
      const next = !html.classList.contains("dark");

      html.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      setIsDark(next);

      // Smoothen transition (optioneel, kun je weghalen)
      html.classList.add("theme-transition");
      window.setTimeout(() => html.classList.remove("theme-transition"), 250);

      // Browser UI (adresbalk) mee kleuren
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next ? "#0f172a" : "#fafaf7");
    } catch (e) {
      console.error("Dark mode toggle failed:", e);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-surface-dark/80 backdrop-blur-lg border-b border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* ===== BOVENSTE BAR: alleen toggle ===== */}
        <div className="flex justify-end items-center px-6 py-2 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <button
            onClick={toggleDark}
            className="inline-flex items-center gap-2 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
            title={isDark ? "Schakel licht thema in" : "Schakel donker thema in"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:inline text-sm">
              {isDark ? "Light" : "Dark"}
            </span>
          </button>
        </div>

        {/* ===== ONDERSTE BAR: logo + nav + CTA ===== */}
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo — maak ‘m groot */}
          <a href="/" className="flex-shrink-0 flex items-center gap-3">
            {/* Gebruik de juiste bestandsnaam: /Logo.png of /logo.png */}
            <img
              src="/Logo.png"
              alt="EcomMeasure logo"
              className="h-16 md:h-24 lg:h-28 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Navigatie */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* Pas de anchors aan op jouw sectie-id's */}
            <a href="#diensten" className="text-neutral-700 dark:text-gray-300 hover:text-brand-blue transition">
              Diensten
            </a>
            <a href="#workflow" className="text-neutral-700 dark:text-gray-300 hover:text-brand-blue transition">
              Aanpak
            </a>
            <a href="#case" className="text-neutral-700 dark:text-gray-300 hover:text-brand-blue transition">
              Cases
            </a>
            <a href="#reviews" className="text-neutral-700 dark:text-gray-300 hover:text-brand-blue transition">
              Reviews
            </a>
            <a href="#contact" className="text-neutral-700 dark:text-gray-300 hover:text-brand-blue transition">
              Contact
            </a>
          </nav>

          {/* CTA */}
          <div className="ml-6">
            <a
              href="#contact"
              className="px-5 py-2 rounded-md bg-brand-blue text-white font-semibold shadow hover:shadow-lg transition"
            >
              Laten we kennismaken
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
