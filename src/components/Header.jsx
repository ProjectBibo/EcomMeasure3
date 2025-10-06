import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* 🔹 Top bar */}
      <div className="bg-blue-100 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-end px-6 py-2 text-sm text-neutralInk">
          {/* Rechts: menu items */}
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-brand-blue">Over EcomMeasure</a>
            <a href="#projects" className="hover:text-brand-blue">Projecten</a>
            <a href="#contact" className="hover:text-brand-blue">Contact</a>

            {/* Language switcher */}
            <div className="flex items-center gap-1 cursor-pointer">
              <img src="/flag-nl.svg" alt="NL" className="h-4 w-6" />
              <span>NL ▾</span>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="px-3 py-2 rounded-md bg-brand-blue text-white text-sm font-semibold shadow hover:brightness-90 transition"
            >
              Laten we kennismaken
            </a>

            {/* Dark mode toggle */}
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* 🔹 Main nav */}
      <div className="bg-surface-light dark:bg-surface-dark border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          {/* Logo (extra groot) */}
          <a href="#hero" className="flex items-center">
            <img
              src="/logo.png"
              alt="EcomMeasure logo"
              className="h-28 md:h-32 w-auto object-contain"
            />
          </a>

          {/* Diensten */}
          <nav className="hidden md:flex gap-12 text-neutralInk dark:text-gray-200">
            <div className="flex flex-col leading-tight hover:text-brand-blue cursor-pointer">
              <span className="font-semibold">Meer meten</span>
              <span className="text-sm text-neutralInk/60 dark:text-gray-400">
                Google Analytics 4
              </span>
            </div>
            <div className="flex flex-col leading-tight hover:text-brand-blue cursor-pointer">
              <span className="font-semibold">Optimaliseer je website</span>
              <span className="text-sm text-neutralInk/60 dark:text-gray-400">
                UX / CRO
              </span>
            </div>
            <div className="flex flex-col leading-tight hover:text-brand-blue cursor-pointer">
              <span className="font-semibold">Een nieuwe website</span>
              <span className="text-sm text-neutralInk/60 dark:text-gray-400">
                Digitale ervaring op maat
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
