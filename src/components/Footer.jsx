import React from "react";

export default function Footer() {
  return (
    <footer className="bg-brand-graylight border-t border-neutral-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Left block */}
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">EcomMeasure</h4>
          <p className="text-neutral-600 text-sm">
            Samen komen we altijd tot een voorstel op maat dat aansluit bij jouw doelstellingen en budget.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-block px-4 py-2 bg-brand-yellow text-neutral-900 rounded-md font-medium hover:opacity-90"
          >
            Laten we kennismaken
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">Meer Meten</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>Google Analytics 4</li>
            <li>Consent Mode</li>
            <li>Dashboarding</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">Optimaliseer je site</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>UX Audit</li>
            <li>Conversion Research</li>
            <li>Strategische verbeteringen</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">Contact</h4>
          <p className="text-neutral-600 text-sm">info@ecommeasure.com</p>
          <p className="text-neutral-600 text-sm">+31 6 12345678</p>
          <p className="text-neutral-600 text-sm">Deventer, Nederland</p>
        </div>
      </div>

      <div className="mt-8 text-center text-neutral-500 text-xs">
        © {new Date().getFullYear()} EcomMeasure. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}

