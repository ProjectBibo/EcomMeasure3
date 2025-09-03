import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, Link2, Gauge, Timer, Rocket, Mail, Phone, MapPin, Star } from "lucide-react";

export default function App() {
  return (
    <div className="bg-neutral-950 text-white min-h-screen scroll-smooth">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur bg-neutral-950/80 border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight">
            EcomMeasure <span className="text-neutral-400">· Measurement Studio</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white">Diensten</a>
            <a href="#process" className="hover:text-white">Proces</a>
            <a href="#pricing" className="hover:text-white">Prijzen</a>
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
            <a href="#results" className="hover:text-white">Resultaten</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#about" className="hover:text-white">Over mij</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="#contact" className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400">
            Plan de sprint
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative flex flex-col items-center justify-center text-center py-32">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-bold">
          Meetbaar. Compliant. <span className="text-emerald-400">Groeien.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300">
          Wij fixen in 30 dagen je metingen, cookietoestemming en advertentiekoppelingen — mét duidelijk dashboard. Zodat elke marketing-euro meer oplevert.
        </motion.p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#contact" className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-emerald-400 flex items-center gap-2 justify-center">
            Plan de sprint <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="border border-neutral-700 hover:border-neutral-600 px-6 py-3 rounded-xl">
            Gratis scan aanvragen
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Mijn diensten</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature icon={<BarChart3 />} title="Betrouwbare meting" desc="GA4 + Tag Manager netjes ingericht: productview, add-to-cart, checkout, purchase." />
            <Feature icon={<Shield />} title="Privacyproof" desc="Consent Mode v2 en cookiebanner conform EU-regels." />
            <Feature icon={<Link2 />} title="Sterke koppelingen" desc="Meta Conversion API en Google Ads conversies voor slimmer bieden." />
            <Feature icon={<Gauge />} title="Dashboard dat stuurt" desc="Looker Studio met omzet, funnel en kanalen. Eén bron van waarheid." />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Hoe werkt het?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <Step icon={<BarChart3 />} title="1. Audit" desc="We scannen je hele meetstack en maken een blueprint." />
            <Step icon={<Timer />} title="2. Implementatie" desc="We zetten GA4, GTM en koppelingen correct neer." />
            <Step icon={<Shield />} title="3. Consent" desc="Consent Mode v2 volledig werkend met je CMP." />
            <Step icon={<Rocket />} title="4. Dashboard" desc="Looker Studio rapport op maat + overdracht." />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Prijzen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard name="Sprint Basis" price="€ 1.200" items={["Audit & blueprint", "GA4 + GTM (basis e-commerce)", "CMP basis-koppeling", "Testrapport"]} />
            <PricingCard name="Sprint Plus" price="€ 2.000" highlight items={["Alles uit Basis", "Consent Mode v2 volledig", "Meta Conversion API", "Looker Studio dashboard"]} />
            <PricingCard name="Sprint Pro" price="€ 3.000 – € 3.500" items={["Alles uit Plus", "Server-side tagging", "Google Ads conversies direct", "30 dagen nazorg"]} />
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Voorbeeld dashboard</h2>
          <p className="text-neutral-400 mb-8">Zo ziet een Looker Studio rapport eruit: omzet, funnel en kanalen in één overzicht.</p>
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <img src="https://dummyimage.com/1200x500/0a0a0a/10b981&text=Voorbeeld+dashboard" alt="Voorbeeld dashboard" className="w-full h-96 object-cover" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="results" className="py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Resultaten</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial name="Sanne — D2C koffiemerk" text="Eindelijk kloppen onze cijfers. ROAS steeg en discussies over data zijn weg." />
            <Testimonial name="Youssef — sportshop" text="Meta CAPI en consent goed geregeld. Minder afkeuringen, betere ads." />
            <Testimonial name="Lotte — woonwebshop" text="Dashboard is top. We zien precies waar de funnel lekt." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
          <FAQ q="Wat lever je precies op?" a="Een werkende meetstack (GA4 + GTM), correcte Consent Mode v2, Meta CAPI, Looker Studio-dashboard en testrapport." />
          <FAQ q="Hoe lang duurt de sprint?" a="Ongeveer 30 dagen: week 1 audit, week 2 meting, week 3 consent & koppelingen, week 4 QA + dashboard + overdracht." />
          <FAQ q="Voor wie is dit?" a="Shopify/ WooCommerce-webshops die al adverteren of willen opschalen en betrouwbare data + privacy op orde willen." />
          <FAQ q="Wat kost onderhoud?" a="Vanaf € 250 per maand voor checks, kleine fixes en advies bij platformwijzigingen." />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img src="/rowan.jpg" alt="Rowan" className="rounded-2xl shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold mb-4">Over mij</h2>
            <p className="text-neutral-300 mb-4">
              Mijn naam is Rowan. Ik help webshops om hun metingen,
              advertentiekoppelingen en cookietoestemming goed in te richten.
            </p>
            <p className="text-neutral-400 mb-6">
              Tijdens mijn studie AD e-commerce aan Hogeschool Windesheim ontdekte ik
              dat betere data leidt tot betere beslissingen — en dus tot groei.
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
          <p className="text-neutral-400 mb-6">Plan een sprint of stel je vraag direct.</p>
          <div className="flex flex-col gap-4 text-neutral-300">
            <p className="flex items-center justify-center gap-2"><Mail className="h-5 w-5" /> info@ecommeasure.com</p>
            <p className="flex items-center justify-center gap-2"><Phone className="h-5 w-5" /> +31 6 12345678</p>
            <p className="flex items-center justify-center gap-2"><MapPin className="h-5 w-5" /> Zwolle, Nederland</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Helper components */
function Feature({ icon, title, desc }) {
  return (
    <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800 text-left">
      <div className="text-emerald-400 mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  );
}

function Step({ icon, title, desc }) {
  return (
    <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800">
      <div className="text-emerald-400 mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  );
}

function PricingCard({ name, price, items, highlight }) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? "border-emerald-500 bg-neutral-950" : "border-neutral-800 bg-neutral-950"}`}>
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
        {highlight ? "Meest gekozen" : "Kies dit pakket"}
      </a>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800 text-left">
      <div className="flex gap-1 text-emerald-400 mb-3">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
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
