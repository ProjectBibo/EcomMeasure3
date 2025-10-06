import React from "react";
import { ArrowRight } from "lucide-react";

export default function App() {
  return (
    <div className="bg-white text-neutral-900 font-sans">
      {/* HEADER */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a href="#hero" className="flex items-center gap-2 text-xl font-bold text-brand-blue">
            <span className="text-brand-blue">Ecom</span>Measure
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-700">
            <a href="#services" className="hover:text-brand-blue">Meer meten</a>
            <a href="#optimize" className="hover:text-brand-blue">Optimaliseer je website</a>
            <a href="#newsite" className="hover:text-brand-blue">Een nieuwe website</a>
            <a href="#projects" className="hover:text-brand-blue">Projecten</a>
            <a href="#contact" className="hover:text-brand-blue">Contact</a>
          </nav>
          <a
            href="#contact"
            className="px-4 py-2 rounded-md bg-brand-purple text-white font-semibold hover:opacity-90 transition"
          >
            Laten we kennismaken
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20 items-center"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-neutral-900">
            Bereik een geoptimaliseerde website dankzij een{" "}
            <span className="text-brand-blue">data- én mens-gedreven</span>{" "}
            aanpak
          </h1>
          <p className="text-neutral-600 mb-8">
            Samen met jou ontdekken we hoe we jouw website zó optimaliseren dat
            je er het volledige potentieel uit kunt halen.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-800 transition"
          >
            Zijn wij een goede match? <ArrowRight size={18} />
          </a>
          <div className="mt-4">
            <a href="#results" className="text-sm text-neutral-600 hover:underline">
              Bekijk hoe wij resultaat halen
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="https://dummyimage.com/500x350/edf2f7/004aad&text=Illustratie"
            alt="Illustratie samenwerking"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* USP BLOKKEN */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Ontdek quick wins",
            text: "Dankzij GA4, SEO en trend-research.",
          },
          {
            title: "Verbeter de gebruikservaring",
            text: "Gericht UX research dat conversie verhoogt.",
          },
          {
            title: "Verzilver je klantenkennis",
            text: "Met co-creatieprocessen en analyses.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-2 text-brand-blue">{item.title}</h3>
            <p className="text-neutral-600 text-sm">{item.text}</p>
          </div>
        ))}
      </section>

      {/* VIDEO + TESTIMONIAL */}
      <section id="testimonial" className="bg-brand-graylight py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
          <div>
            <div className="aspect-video rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Klantvideo"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div>
            <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
              KLANTEN AAN HET WOORD
            </span>
            <blockquote className="bg-white border border-neutral-200 rounded-xl p-6 mb-4 shadow-sm">
              <p className="mb-3 text-neutral-700">
                “Goede communicatie en samenwerking voor de doorontwikkeling van de webshop. Levert duidelijke rapportages en verbeterpunten aan.”
              </p>
              <footer className="text-sm text-neutral-500">
                — Joey Tuinstra, Offenga BMW Onderdelen
              </footer>
            </blockquote>
            <a href="#reviews" className="text-brand-blue hover:underline font-medium">
              Bekijk alle reviews
            </a>
          </div>
        </div>
      </section>

      {/* CASES & INSIGHTS */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
          <h3 className="font-semibold mb-2 text-brand-blue">
            Welke problemen ervaren klanten bij hun webshop?
          </h3>
          <p className="text-neutral-600 mb-4">
            Inzichten uit cases geven antwoord op echte klantproblemen en oplossingen.
          </p>
          <a
            href="#cases"
            className="px-4 py-2 bg-brand-yellow text-neutral-900 rounded-md font-medium hover:opacity-90"
          >
            Bekijk de case
          </a>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
          <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
            Insight #1
          </span>
          <h3 className="font-semibold mb-2 text-brand-blue">
            Ontwerpkeuzes maken met data
          </h3>
          <p className="text-neutral-600 mb-4">
            We helpen je betere beslissingen te nemen met betrouwbare data en UX-onderzoek.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-graylight border-t border-neutral-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
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
              <li>Optimalisatie aanvragen</li>
              <li>Conversion Research</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-brand-blue">Contact</h4>
            <p className="text-neutral-600 text-sm">info@ecommeasure.com</p>
            <p className="text-neutral-600 text-sm">+31 6 12345678</p>
          </div>
        </div>
        <div className="mt-8 text-center text-neutral-500 text-xs">
          © {new Date().getFullYear()} EcomMeasure. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
}
