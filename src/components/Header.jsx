import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-surface-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* 🔹 Alleen het logo (nog groter) */}
        <a href="#hero" className="flex items-center">
          <img
            src="/logo.png"
            alt="EcomMeasure logo"
            className="h-24 w-auto"   // vergroot naar 96px hoog
          />
        </a>

        {/* Navigatie */}
        <nav className="hidden md:flex gap-10 text-sm text-neutralInk dark:text-gray-300">
          <div className="flex flex-col items-center hover:text-brand-blue cursor-pointer">
            <span>Meer meten</span>
            <span className="text-xs text-neutralInk/60 dark:text-gray-400">
              Google Analytics 4
            </span>
          </div>
          <div className="flex flex-col items-center hover:text-brand-blue cursor-pointer">
            <span>Optimaliseer je website</span>
            <span className="text-xs text-neutralInk/60 dark:text-gray-400">
              UX / CRO
            </span>
          </div>
          <div className="flex flex-col items-center hover:text-brand-blue cursor-pointer">
            <span>Een nieuwe website</span>
            <span className="text-xs text-neutralInk/60 dark:text-gray-400">
              Digitale ervaring op maat
            </span>
          </div>
          <a href="#projects" className="hover:text-brand-blue">
            Projecten
          </a>
          <a href="#contact" className="hover:text-brand-blue">
            Contact
          </a>
        </nav>

        {/* CTA + Dark toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 rounded-md bg-brand-blue text-white font-semibold hover:brightness-90 transition"
          >
            Laten we kennismaken
          </a>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
