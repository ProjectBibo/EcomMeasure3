import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-surface-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 h-20">
        
        {/* Logo nog groter gemaakt */}
        <a href="#hero" className="flex items-center">
          <img
            src="/logo.png"
            alt="EcomMeasure logo"
            className="h-32 md:h-40 w-auto object-contain -my-4"
          />
        </a>

        {/* Navigatie */}
        <nav className="hidden md:flex gap-8 text-sm text-neutralInk dark:text-gray-300">
          <a href="#ga4" className="self-center hover:text-brand-blue">Meer meten</a>
          <a href="#ux" className="self-center hover:text-brand-blue">Optimaliseer</a>
          <a href="#web" className="self-center hover:text-brand-blue">Nieuwe website</a>
          <a href="#projects" className="self-center hover:text-brand-blue">Projecten</a>
          <a href="#contact" className="self-center hover:text-brand-blue">Contact</a>
        </nav>

        {/* CTA + Dark toggle */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="px-4 py-2 rounded-md bg-brand-blue text-white text-sm font-semibold hover:brightness-90 transition"
          >
            Kennismaken
          </a>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
