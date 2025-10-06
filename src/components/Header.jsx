import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-surface-dark sticky top-0 z-50">
      {/* compacte hoogte */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo: hoogte begrensd zodat header niet meerekt */}
        <a href="#hero" className="shrink-0 flex items-center">
  <img
    src="/logo.png"
    alt="EcomMeasure logo"
    className="max-h-12 md:max-h-14 w-36 md:w-44 object-contain"
  />
</a>

        {/* Navigatie (2-regelig maar compact) */}
        <nav className="hidden md:flex gap-8 text-sm text-neutralInk dark:text-gray-300">
          <div className="flex flex-col items-center leading-tight hover:text-brand-blue cursor-pointer">
            <span className="text-[13px]">Meer meten</span>
            <span className="text-[11px] text-neutralInk/60 dark:text-gray-400 -mt-0.5">
              Google Analytics 4
            </span>
          </div>
          <div className="flex flex-col items-center leading-tight hover:text-brand-blue cursor-pointer">
            <span className="text-[13px]">Optimaliseer je website</span>
            <span className="text-[11px] text-neutralInk/60 dark:text-gray-400 -mt-0.5">
              UX / CRO
            </span>
          </div>
          <div className="flex flex-col items-center leading-tight hover:text-brand-blue cursor-pointer">
            <span className="text-[13px]">Een nieuwe website</span>
            <span className="text-[11px] text-neutralInk/60 dark:text-gray-400 -mt-0.5">
              Digitale ervaring op maat
            </span>
          </div>
          <a href="#projects" className="self-center hover:text-brand-blue">Projecten</a>
          <a href="#contact" className="self-center hover:text-brand-blue">Contact</a>
        </nav>

        {/* CTA + Toggle (compact) */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="px-3 py-2 rounded-md bg-brand-blue text-white text-sm font-semibold hover:brightness-90 transition"
          >
            Kennismaken
          </a>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
