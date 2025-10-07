// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-blue-100 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 text-sm text-neutralInk">
          <div className="font-semibold">EcomMeasure</div>
          <nav className="flex items-center gap-6">
            <a href="#about" className="hover:text-brand-blue">Over</a>
            <a href="#projects" className="hover:text-brand-blue">Projecten</a>
            <a href="#contact" className="hover:text-brand-blue">Contact</a>
          </nav>
        </div>
      </div>
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold">EcomMeasure</a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-md bg-brand-blue text-white text-base font-semibold shadow hover:brightness-95 transition"
          >
            Laten we kennismaken
          </a>
        </div>
      </div>
    </header>
  );
}
