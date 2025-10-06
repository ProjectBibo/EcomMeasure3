import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function App() {
  return (
    <div className="bg-neutral-950 text-white font-sans">
      {/* HEADER */}
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a href="#hero" className="text-xl font-bold">
            <span className="text-emerald-400">Ecom</span>Measure
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
            <a href="#services" className="hover:text-white">Meten</a>
            <a href="#optimize" className="hover:text-white">Optimaliseer</a>
            <a href="#newsite" className="hover:text-white">Nieuwe site</a>
            <a href="#cases" className="hover:text-white">Projecten</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-emerald-400 text-black font-semibold hover:opacity-90 transition"
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
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Bereik een geoptimaliseerde website dankzij een{" "}
            <span className="text-emerald-400">data- én mens-gedreven</span>{" "}
            aanpak
          </h1>
          <p className="text-neutral-300 mb-8">
            Samen met jou ontdekken we hoe we jouw website zó optimaliseren dat
            je er het volledige potentieel uit kunt halen.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-black font-semibold rounded-xl hover:opacity-90 transition"
          >
            Zijn wij een goede match? <ArrowRight size={18} />
          </a>
        </div>
        <div className="flex justify-center">
          <img
            src="https://dummyimage.com/500x350/0a0a0a/10b981&text=Illustratie"
            alt="Illustratie samenwerking"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* USP BLOKKEN */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Meer weten = minder gokken",
            text: "Onze workflows zijn op maat gemaakt om websites en mensen te helpen groeien.",
          },
          {
            title: "Ontdek quick wins",
            text: "Snelle verbeteringen dankzij GA4, SEO en trend-research.",
          },
          {
            title: "Verbeter de gebruikservaring",
            text: "Gericht User Experience research geeft je inzichten die conversie verhogen.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-neutral-400 text-sm">{item.text}</p>
          </div>
        ))}
      </section>

      {/* VIDEO + TESTIMONIAL */}
      <section id="cases" className="bg-neutral-900 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
          <div>
            <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Klantvideo"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Klanten aan het woord</h2>
            <blockquote className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 mb-4">
              <p className="mb-3 text-neutral-300">
                “Goede communicatie en samenwerking. Duidelijke rapportages en
                verbeterpunten.”
              </p>
              <footer className="text-sm text-neutral-500">
                — Joey Tulkstra, Offenga BMW Onderdelen
              </footer>
            </blockquote>
            <a href="#contact" className="text-emerald-400 hover:underline">
              Bekijk alle reviews
            </a>
          </div>
        </div>
      </section>

      {/* INSIGHTS / CASES */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h3 className="font-semibold mb-2">
            Welke problemen ervaren klanten bij hun webshop?
          </h3>
          <p className="text-neutral-400 mb-4">
            Inzichten uit cases geven antwoord op echte klantproblemen en
            oplossingen.
          </p>
          <a
            href="#cases"
            className="px-4 py-2 bg-emerald-400 text-black rounded-lg font-medium hover:opacity-90"
          >
            Bekijk de cases
          </a>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h3 className="font-semibold mb-2">Ontwerpkeuzes maken met data</h3>
          <p className="text-neutral-400 mb-4">
            We helpen je betere beslissingen te nemen met betrouwbare data en
            UX-onderzoek.
          </p>
          <ul className="text-sm text-neutral-300 space-y-2">
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="text-emerald-400" size={18} /> Duidelijk
              en transparant
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="text-emerald-400" size={18} /> Gericht op
              resultaat
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="text-emerald-400" size={18} /> Praktisch
              en toepasbaar
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-3">EcomMeasure</h4>
            <p className="text-neutral-400 text-sm">
              Samen komen we altijd tot een voorstel op maat dat aansluit bij
              jouw doelstellingen en budget.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Meer meten</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Google Analytics 4</li>
              <li>Consent Mode</li>
              <li>Dashboarding</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-neutral-400 text-sm">info@ecommeasure.com</p>
            <p className="text-neutral-400 text-sm">+31 6 12345678</p>
          </div>
        </div>
        <div className="mt-8 text-center text-neutral-600 text-xs">
          © {new Date().getFullYear()} EcomMeasure. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
}
