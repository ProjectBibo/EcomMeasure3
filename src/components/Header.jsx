// src/components/Header.jsx
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ===== Top bar: hoofd-navigatie + dark toggle ===== */}
      <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="max-w-7xl mx-auto h-11 px-6 flex items-center justify-between">
          {/* Hoofdnav links */}
          <nav className="flex items-center gap-5 text-sm font-medium">
            <a href="#diensten" className="nav-underline text-neutral-700 dark:text-gray-200">Diensten</a>
            <a href="#workflow" className="nav-underline text-neutral-700 dark:text-gray-200">Aanpak</a>
            <a href="#case" className="nav-underline text-neutral-700 dark:text-gray-200">Cases</a>
            <a href="#reviews" className="nav-underline text-neutral-700 dark:text-gray-200">Reviews</a>
            <a href="#contact" className="nav-underline text-neutral-700 dark:text-gray-200">Contact</a>
          </nav>

          {/* Toggle rechts */}
          <div className="flex items-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* ===== Bottom bar: groot logo + dienstencluster + CTA ===== */}
      <div className="relative bg-white/80 dark:bg-surface-dark/80 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* Groot logo links (mag buiten bar uitsteken) */}
          <a href="/" className="flex items-center gap-3 relative">
            <img
              src="/Logo.png"
              alt="EcomMeasure logo"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain -my-2 md:-my-3 lg:-my-4"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Diensten-cluster midden (scrollbaar op mobiel) */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="#diensten" className="pill-link">Meer meten</a>
            <a href="#ga4" className="pill-link">Google Analytics 4</a>
            <a href="#optimaliseer" className="pill-link">Optimaliseer je website</a>
            <a href="#ux" className="pill-link">UX / CRO</a>
            <a href="#nieuwesite" className="pill-link">Een nieuwe website</a>
            <a href="#dx" className="pill-link">Digitale ervaring op maat</a>
          </nav>

          {/* CTA rechts */}
          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="px-5 py-2 rounded-md bg-brand-blue text-white font-semibold shadow hover:shadow-lg hover-lift transition"
            >
              Laten we kennismaken
            </a>
          </div>

          {/* Mobiel: horizontaal scrollbare diensten onder de bar */}
          <div className="md:hidden absolute left-0 right-0 -bottom-10 px-6">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <a href="#diensten" className="pill-link">Meer meten</a>
              <a href="#ga4" className="pill-link">GA4</a>
              <a href="#optimaliseer" className="pill-link">Optimaliseer</a>
              <a href="#ux" className="pill-link">UX/CRO</a>
              <a href="#nieuwesite" className="pill-link">Nieuwe site</a>
              <a href="#dx" className="pill-link">DX op maat</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
