import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Link2,
  Gauge,
  Timer,
  Rocket,
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-neutral-950 text-white min-h-screen scroll-smooth">
      {/* Skip link voor toegankelijkheid */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-black text-white px-3 py-2 rounded-md z-50"
      >
        Sla navigatie over
      </a>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur bg-neutral-950/80 border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight">
            EcomMeasure <span className="text-neutral-400">· Measurement Studio</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#results" className="hover:text-white">Resultaten</a>
            <a href="#features" className="hover:text-white">Diensten</a>
            <a href="#process" className="hover:text-white">Proces</a>
            <a href="#pricing" className="hover:text-white">Prijzen</a>
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#about" className="hover:text-white">Over mij</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>

          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition"
          >
            Plan de sprint
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative flex flex-col items-center justify-center text-center py-28 px-4">
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Meetbaar. Compliant. <span className="text-emerald-400">Groeien.</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300"
        >
          Binnen 30 dagen: betrouwbare metingen (GA4 + GTM), privacy op orde en
          een dashboard dat stuurt — zonder gedoe.
        </motion.p>

        {/* CTA's */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contact"
            className="bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition flex items-center gap-2 justify-center"
          >
            Plan de sprint <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#pricing"
            className="border border-neutral-800 hover:border-neutral-700 px-6 py-3 rounded-xl text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition"
          >
            Pakketten bekijken
          </a>
        </div>

        {/* TRUST STRIP */}
        <div className="mt-10 w-full">
          <div className="mx-auto max-w-4xl rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Stars count={5} />
              <span className="text-neutral-300">Beoordeeld op</span>
              <div className="flex gap-3 text-sm text-neutral-300">
                <Badge text="Projectmanagement" />
                <Badge text="Kwaliteit werk" />
                <Badge text="Tijdige levering" />
              </div>
            </div>

            {/* Logo strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-80">
              <img src="https://dummyimage.com/100x28/ffffff/000000&text=Shopify" alt="Shopify" className="h-6" />
              <img src="https://dummyimage.com/100x28/ffffff/000000&text=GA4" alt="Google Analytics 4" className="h-6" />
              <img src="https://dummyimage.com/100x28/ffffff/000000&text=GTM" alt="Google Tag Manager" className="h-6" />
              <img src="https://dummyimage.com/100x28/ffffff/000000&text=Meta" alt="Meta" className="h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS + metrics */}
      <section id="results" className="py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Result metrics */}
          <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["+38%", "Betere ROAS"],
              ["-27%", "Afgekeurde events"],
              ["<30 dgn", "Implementatie"],
              ["1 bron", "Dashboard"],
            ].map(([v, l], i) => (
              <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-950/70 p-4">
                <div className="text-2xl font-bold">{v}</div>
                <div className="text-sm text-neutral-400">{l}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-12">Dit zeggen klanten</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              name="Sanne — D2C koffiemerk"
              text="Eindelijk kloppen onze cijfers. ROAS steeg en discussies over data zijn weg."
            />
            <Testimonial
              name="Youssef — sportshop"
              text="Meta CAPI en consent goed geregeld. Minder afkeuringen, betere ads."
            />
            <Testimonial
              name="Lotte — woonwebshop"
              text="Dashboard is top. We zien precies waar de funnel lekt."
            />
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Mijn diensten</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              icon={<BarChart3 />}
              title="Betrouwbare meting"
              desc="GA4 + Tag Manager netjes ingericht: productview, add-to-cart, checkout, purchase."
            />
            <Feature
              icon={<Shield />}
              title="Privacyproof"
              desc="Consent Mode v2 en cookiebanner conform EU-regels. Rust en compliance."
            />
            <Feature
              icon={<Link2 />}
              title="Sterke koppelingen"
              desc="Meta Conversion API en Google Ads conversies voor slimmer bieden."
            />
            <Feature
              icon={<Gauge />}
              title="Dashboard dat stuurt"
              desc="Looker Studio met omzet, funnel en kanalen. Eén bron van waarheid."
            />
          </div>
        </div>
      </section>

      {/* PROCES */}
      <section id="process" className="py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Hoe werkt het?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <Step
              icon={<BarChart3 />}
              title="1. Audit"
              desc="We scannen je hele meetstack en maken een blueprint."
            />
            <Step
              icon={<Timer />}
              title="2. Implementatie"
              desc="We zetten GA4, GTM en koppelingen correct neer."
            />
            <Step
              icon={<Shield />}
              title="3. Consent"
              desc="Consent Mode v2 volledig werkend met je CMP."
            />
            <Step
              icon={<Rocket />}
              title="4. Dashboard"
              desc="Looker Studio rapport op maat + overdracht."
            />
          </div>
        </div>
      </section>

      {/* PRIJZEN */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Prijzen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Sprint Basis"
              price="€ 1.200"
              items={[
                "Audit & blueprint",
                "GA4 + GTM (basis e-commerce)",
                "CMP basis-koppeling",
                "Testrapport",
              ]}
            />
            <PricingCard
              name="Sprint Plus"
              price="€ 2.000"
              highlight
              items={[
                "Alles uit Basis",
                "Consent Mode v2 volledig",
                "Meta Conversion API",
                "Looker Studio dashboard",
              ]}
            />
            <PricingCard
              name="Sprint Pro"
              price="€ 3.000 – € 3.500"
              items={[
                "Alles uit Plus",
                "Server-side tagging",
                "Google Ads conversies direct",
                "30 dagen nazorg",
              ]}
            />
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Voorbeeld dashboard</h2>
          <p className="text-neutral-400 mb-8">
            Zo ziet een Looker Studio rapport eruit: omzet, funnel en kanalen in
            één overzicht.
          </p>
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="https://dummyimage.com/1200x500/0a0a0a/10b981&text=Voorbeeld+dashboard"
              alt="Voorbeeld van een Looker Studio dashboard met omzet- en kanalenoverzicht"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
          <FAQ
            q="Wat lever je precies op?"
            a="Een werkende meetstack (GA4 + GTM), correcte Consent Mode v2, Meta CAPI, Looker Studio-dashboard en testrapport."
          />
          <FAQ
            q="Hoe lang duurt de sprint?"
            a="Ongeveer 30 dagen: week 1 audit, week 2 meting, week 3 consent & koppelingen, week 4 QA + dashboard + overdracht."
          />
          <FAQ
            q="Voor wie is dit?"
            a="Shopify/WooCommerce-webshops die al adverteren of willen opschalen en betrouwbare data + privacy op orde willen."
          />
          <FAQ
            q="Wat kost onderhoud?"
            a="Vanaf € 250 per maand voor checks, kleine fixes en advies bij platformwijzigingen."
          />
        </div>
      </section>

      {/* OVER MIJ */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/rowan.jpg"
            alt="Rowan - specialist measurement & analytics"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Over mij</h2>
            <p className="text-neutral-300 mb-4">
              Mijn naam is Rowan. Ik help webshops om hun metingen,
              advertentiekoppelingen en cookietoestemming goed in te richten.
            </p>
            <p className="text-neutral-400 mb-6">
              Tijdens mijn studie AD e-commerce aan Hogeschool Windesheim
              ontdekte ik dat betere data leidt tot betere beslissingen — en dus
              tot groei.
            </p>
            <ul className="text-neutral-300 space-y-2">
              <li>🔎 Duidelijk en transparant</li>
              <li>⚡ Praktisch en snel toepasbaar</li>
              <li>📈 Gericht op resultaat</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-neutral-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="text-neutral-400 mb-6">
            Plan een sprint of stel je vraag direct.
          </p>
          <div className="flex flex-col gap-4 text-neutral-300">
            <p className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />{" "}
              <a href="mailto:info@ecommeasure.com" className="hover:underline">
                info@ecommeasure.com
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />{" "}
              <a href="tel:+31612345678" className="hover:underline">
                +31 6 12345678
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" /> Zwolle, Nederland
            </p>
          </div>
        </div>
      </section>

      {/* Zwevende conversieknop */}
      <a
        href="#contact"
        className="fixed bottom-4 right-4 md:right-6 md:bottom-6 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-semibold shadow-lg hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition"
        aria-label="Plan de sprint"
      >
        Plan de sprint
      </a>
    </div>
  );
}

/* Helper Components */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1 text-emerald-400">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function Badge({ text }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      {text}
    </span>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="group p-6 bg-neutral-950/80 rounded-xl border border-neutral-800 hover:border-neutral-700 transition">
      <div className="text-emerald-400 mb-3 group-hover:scale-105 transition-transform">{icon}</div>
      <h3 className="font-semibold mb-2 text-neutral-100">{title}</h3>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  );
}

function Step({ icon, title, desc }) {
  return (
    <div className="group p-6 bg-neutral-950/80 rounded-xl border border-neutral-800 hover:border-neutral-700 transition">
      <div className="text-emerald-400 mb-3 group-hover:scale-105 transition-transform">{icon}</div>
      <h3 className="font-semibold mb-2 text-neutral-100">{title}</h3>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  );
}

function PricingCard({ name, price, items, highlight }) {
  return (
    <div
      className={`p-6 rounded-xl border relative overflow-hidden ${
        highlight
          ? "border-emerald-500/60 bg-neutral-950/80 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]"
          : "border-neutral-800 bg-neutral-950/80"
      }`}
    >
      {highlight && (
        <span className="absolute right-3 top-3 text-xs rounded-full bg-emerald-500 text-black px-2 py-1 font-semibold">
          Meest gekozen
        </span>
      )}
      <h3 className="font-semibold text-xl mb-2">{name}</h3>
      <p className="text-3xl font-bold mb-4">{price}</p>
      <ul className="text-sm text-neutral-400 mb-6 space-y-1">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`block px-4 py-2 rounded-xl font-medium ${
          highlight
            ? "bg-emerald-500 text-black hover:bg-emerald-400"
            : "border border-neutral-700 hover:border-neutral-600"
        }`}
      >
        {highlight ? "Plan deze sprint" : "Kies dit pakket"}
      </a>
      <p className="mt-3 text-xs text-neutral-500">14 dagen support na oplevering</p>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800 text-left">
      <div className="flex gap-1 text-emerald-400 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-neutral-300 mb-3">{text}</p>
      <p className="text-sm text-neutral-500">— {name}</p>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold">{q}</h3>
      <p className="text-neutral-400 text-sm">{a}</p>
    </div>
  );
}
