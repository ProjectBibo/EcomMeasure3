// src/components/Header.jsx
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo links */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="EcomMeasure logo"
            className="h-8 w-auto"
          />
        </a>

        {/* Navigatie + toggle */}
        <nav className="flex items-center gap-6">
          <a href="#diensten" className="text-sm font-medium text-neutral-700 dark:text-gray-200 hover:text-brand-blue">
            Diensten
          </a>
          <a href="#case" className="text-sm font-medium text-neutral-700 dark:text-gray-200 hover:text-brand-blue">
            Cases
          </a>
          <a href="#reviews" className="text-sm font-medium text-neutral-700 dark:text-gray-200 hover:text-brand-blue">
            Reviews
          </a>
          <a href="#contact" className="text-sm font-medium text-neutral-700 dark:text-gray-200 hover:text-brand-blue">
            Contact
          </a>

          {/* Dark mode toggle */}
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
