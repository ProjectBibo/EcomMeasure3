import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, BarChart3, Shield, Link2, Gauge, Timer, Rocket, HelpCircle, Mail, Phone, MapPin, Star } from "lucide-react";

/*
 One-page website (standard version, no 3D)
 Deployed easiest on Netlify. The contact form uses Netlify Forms (no backend code).
*/

const features = [
  { icon: <BarChart3 className="h-6 w-6" />, title: "Betrouwbare meting", desc: "GA4 + Tag Manager netjes ingericht: productview, add‑to‑cart, checkout, purchase." },
  { icon: <Shield className="h-6 w-6" />, title: "Privacyproof", desc: "Consent Mode v2 en je cookiebanner volgens EU‑regels. Rust en compliance." },
  { icon: <Link2 className="h-6 w-6" />, title: "Sterke koppelingen", desc: "Meta Conversion API en Google Ads conversies voor slimmer bieden." },
  { icon: <Gauge className="h-6 w-6" />, title: "Dashboard dat stuurt", desc: "Looker Studio met omzet, funnel en kanalen. Eén bron van waarheid." },
];

const pricing = [
  { name: "Sprint Basis", price: "€ 1.200", badge: "Start veilig", items: ["Audit & blueprint", "GA4 + GTM (basis e‑commerce)", "CMP basis‑koppeling", "Testrapport"], cta: "Start met Basis" },
  { name: "Sprint Plus", price: "€ 2.000", badge: "Meest gekozen", items: ["Alles uit Basis", "Consent Mode v2 volledig", "Meta Conversion API", "Looker Studio dashboard"], highlight: true, cta: "Kies Plus" },
  { name: "Sprint Pro", price: "€ 3.000 – € 3.500", badge: "Voor schaal", items: ["Alles uit Plus", "Server‑side tagging (GTM Server)", "Google Ads conversies direct", "30 dagen nazorg"], cta: "Ga voor Pro" },
];

const faqs = [
  { q: "Wat lever je precies op?", a: "Een werkende meetstack (GA4 + GTM), correcte Consent Mode v2 met CMP, Meta CAPI, een Looker Studio‑dashboard en een testrapport met bewijs dat alles werkt." },
  { q: "Hoe lang duurt de sprint?", a: "Ongeveer 30 dagen: week 1 audit, week 2 meting, week 3 consent & koppelingen, week 4 QA + dashboard + overdracht." },
  { q: "Voor wie is dit?", a: "Shopify/ WooCommerce‑webshops die al adverteren of willen opschalen en betrouwbare data + privacy op orde willen." },
  { q: "Wat kost onderhoud?", a: "Vanaf € 250 per maand voor checks, kleine fixes en advies bij platformwijzigingen." },
];

const testimonials = [
  { name: "Sanne — D2C koffiemerk", text: "Eindelijk kloppen onze cijfers. ROAS steeg en discussies over data zijn weg.", rating: 5 },
  { name: "Youssef — sportshop", text: "Meta CAPI en consent goed geregeld. Minder afkeuringen, betere ads.", rating: 5 },
  { name: "Lotte — woonwebshop", text: "Dashboard is top. We zien precies waar de funnel lekt.", rating: 5 },
];

export default function MeetGroeiSite() {
  return (
    <div className="bg-neutral-950 text-white min-h-screen scroll-smooth">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur bg-neutral-950/80 border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight">Meet & Groei <span className="text-neutral-400">· E‑commerce Studio</span></a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white">Diensten</a>
            <a href="#pricing" className="hover:text-white">Prijzen</a>
            <a href="#process" className="hover:text-white">Proces</a>
            <a href="#results" className="hover:text-white">Resultaten</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="#contact" className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400">Plan de sprint</a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-bold">
            Meetbaar. Compliant. <span className="text-emerald-400">Groeien.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300">
            Wij fixen in 30 dagen je metingen, cookietoestemming en advertentiekoppelingen — mét duidelijk dashboard. Zodat elke marketing‑euro meer oplevert.
          </motion.p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-emerald-400 flex items-center gap-2 justify-center">
              Plan de sprint <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="border border-neutral-700 hover:border-neutral-600 px-6 py-3 rounded-xl">
              Gratis scan aanvragen
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-neutral-800 flex items-center justify-center">{f.icon}</div>
              <h3 className="font-semibold">{f.title}</h3>
            </div>
            <p className="mt-3 text-sm text-neutral-300">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <div className="flex items-center gap-2 text-emerald-400">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
              </div>
              <p className="mt-3 text-neutral-300 text-sm">“{t.text}”</p>
              <p className="mt-3 text-neutral-400 text-xs">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pakketten die wérken</h2>
          <p className="mt-3 text-neutral-300">Kies een sprint die past. Alle pakketten leveren een testrapport en heldere overdracht op.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <div key={p.name} className={`relative rounded-2xl p-6 border ${p.highlight ? "border-emerald-500/40 bg-neutral-900/60" : "border-neutral-800 bg-neutral-900/40"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${p.highlight ? "border-emerald-500/60 text-emerald-400" : "border-neutral-700 text-neutral-300"}`}>{p.badge}</span>
              </div>
              <div className="mt-3 text-3xl font-bold">{p.price}</div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-6 w-full px-4 py-3 rounded-xl inline-flex items-center justify-center ${p.highlight ? "bg-emerald-500 text-black hover:bg-emerald-400" : "border border-neutral-700 hover:border-neutral-600"}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Zo werken we in 30 dagen</h2>
          <p className="mt-3 text-neutral-300">Een vaste sprint met heldere stappen. Geen ruis, wel resultaat.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[{ icon: <Timer className="h-5 w-5" />, t: "Week 1", d: "Scan & plan: toegang, audit, blueprint." },
            { icon: <BarChart3 className="h-5 w-5" />, t: "Week 2", d: "Meting bouwen: GA4 + GTM events + tests." },
            { icon: <Shield className="h-5 w-5" />, t: "Week 3", d: "Consent & koppelingen: CMP + Consent Mode v2, Meta CAPI." },
            { icon: <Rocket className="h-5 w-5" />, t: "Week 4", d: "QA, dashboard, overdracht & video‑uitleg." }].map((s) => (
            <div key={s.t} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <div className="flex items-center gap-2 text-neutral-200"><div className="h-9 w-9 rounded-xl bg-neutral-800 flex items-center justify-center">{s.icon}</div><p className="font-semibold">{s.t}</p></div>
              <p className="mt-3 text-sm text-neutral-300">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="border-y border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="text-4xl font-bold text-emerald-400">+22%</p>
            <p className="mt-2 text-neutral-300 text-sm">Hogere conversieratio na fix meting + consent</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="text-4xl font-bold text-emerald-400">−18%</p>
            <p className="mt-2 text-neutral-300 text-sm">Lagere CPA door betere signalen naar ads</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="text-4xl font-bold text-emerald-400">95%→99%</p>
            <p className="mt-2 text-neutral-300 text-sm">Purchase‑match tussen shop en GA4</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Veelgestelde vragen</h2>
        <div className="mt-10 divide-y divide-neutral-800 rounded-2xl border border-neutral-800 overflow-hidden">
          {faqs.map((f, i) => (
            <details key={i} className="group open:bg-neutral-900/50">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left marker:hidden hover:bg-neutral-900/50">
                <span className="font-medium">{f.q}</span>
                <HelpCircle className="h-4 w-4 text-neutral-400 group-open:rotate-45 transition" />
              </summary>
              <div className="px-5 pb-5 text-neutral-300 text-sm">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT (Netlify Forms wired) */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-2xl font-semibold">Plan je sprint</h3>
            <p className="mt-2 text-neutral-300 text-sm">Stuur je gegevens en we plannen een korte kennismaking. Je krijgt direct een gratis scan en een helder plan.</p>
            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/success.html" className="mt-6 grid grid-cols-1 gap-4">
              {/* Netlify form fields */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Laat dit veld leeg: <input name="bot-field" /></label>
              </p>
              <input name="naam" placeholder="Naam" required className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" />
              <input name="email" type="email" placeholder="E‑mail" required className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" />
              <input name="url" placeholder="Webshop URL" className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" />
              <textarea name="bericht" placeholder="Waar loop je tegenaan?" rows={4} className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" />
              <button type="submit" className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-emerald-400 flex items-center gap-2 justify-center">
                Versturen <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-2xl font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-neutral-300 text-sm">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-emerald-400" /> hallo@meetengroei.nl</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-emerald-400" /> 06‑12 34 56 78</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-emerald-400" /> Zwolle • Nederland</li>
            </ul>
            <div className="mt-6 rounded-xl border border-neutral-800 p-4 text-sm text-neutral-400">
              <p className="font-medium text-neutral-200">Wat je krijgt na je aanvraag</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Korte intake (15–20 min)</li>
                <li>Gratis scan + concrete verbeterlijst</li>
                <li>Vaste prijs & planning voor de sprint</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-neutral-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Meet & Groei E‑commerce Studio</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-neutral-200">Privacy</a>
              <a href="#" className="hover:text-neutral-200">Voorwaarden</a>
              <a href="#contact" className="hover:text-neutral-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
