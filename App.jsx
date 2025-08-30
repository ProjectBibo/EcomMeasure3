import React, { useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import {
  Sparkles,
  Check,
  Shield,
  BarChart3,
  Link2,
  Gauge,
  Timer,
  Rocket,
  ArrowRight,
  Cookie,
} from "lucide-react";

// Custom magnetic button component for subtle interactive motion
function MagneticButton({ className = "", children, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.2);
    y.set(relY * 0.2);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 will-change-transform transition ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// TiltCard adds a 3D tilt effect based on mouse position
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-50, Math.min(50, relX / 4)));
    y.set(Math.max(-50, Math.min(50, relY / 4)));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className={`relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ScrollProgress bar for a visual indicator of page progress
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });
  return (
    <motion.div
      style={{ scaleX: scale }}
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-emerald-500/80"
    />
  );
}

// 3D Particle Nebula using R3F Points
function ParticleNebula() {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 3000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.03;
      ref.current.rotation.y -= delta * 0.04;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation
        color="#10b981"
        depthWrite={false}
      />
    </Points>
  );
}

// Main glowing torus core in hero
function HeroCore() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.8, 0.25, 200, 16]} />
      <meshStandardMaterial
        emissive="#10b981"
        emissiveIntensity={1.5}
        color="#0ea5e9"
        roughness={0.2}
        metalness={0.4}
      />
    </mesh>
  );
}

// Main page component
export default function EcomMeasureSite() {
  // data for features, pricing, faqs
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" aria-hidden />,
      title: "Betrouwbare meting",
      desc: "GA4 & GTM correct ingericht voor productview, add‑to‑cart, checkout, purchase.",
    },
    {
      icon: <Shield className="h-6 w-6" aria-hidden />,
      title: "Privacyproof",
      desc: "Consent Mode v2 en cookiebanner volgens EU-regels. Rust en compliance.",
    },
    {
      icon: <Link2 className="h-6 w-6" aria-hidden />,
      title: "Sterke advertentiekoppeling",
      desc: "Meta Conversion API en Google Ads conversies voor slimmer bieden.",
    },
    {
      icon: <Gauge className="h-6 w-6" aria-hidden />,
      title: "Dashboard dat stuurt",
      desc: "Looker Studio met omzet, funnels en kanalen. Eén bron van waarheid.",
    },
  ];

  const pricing = [
    {
      name: "Sprint Basis",
      price: "€ 1.200",
      badge: "Start veilig",
      items: [
        "Audit & blueprint",
        "GA4 + GTM (basis e‑commerce)",
        "CMP basis-koppeling",
        "Testrapport",
      ],
      cta: "Start Basis",
    },
    {
      name: "Sprint Plus",
      price: "€ 2.000",
      badge: "Meest gekozen",
      items: [
        "Alles uit Basis",
        "Consent Mode v2 volledig",
        "Meta Conversion API",
        "Looker Studio dashboard",
      ],
      highlight: true,
      cta: "Kies Plus",
    },
    {
      name: "Sprint Pro",
      price: "€ 3.000 – € 3.500",
      badge: "Voor schaal",
      items: [
        "Alles uit Plus",
        "Server‑side tagging (GTM Server)",
        "Google Ads conversies direct",
        "30 dagen nazorg",
      ],
      cta: "Ga voor Pro",
    },
  ];

  const faqs = [
    {
      q: "Wat lever ik precies op?",
      a: "Een werkende meetstack (GA4+GTM), correcte Consent Mode v2 met CMP, Meta CAPI, een Looker Studio-dashboard en een testrapport.",
    },
    {
      q: "Voor wie is dit?",
      a: "Voor Shopify/WooCommerce webshops die adverteren of willen opschalen en betrouwbare data + privacy op orde willen.",
    },
    {
      q: "Hoe snel is het klaar?",
      a: "De sprint duurt circa 30 dagen: audit, implementatie, consent & koppelingen, QA & overdracht.",
    },
    {
      q: "Wat kost onderhoud?",
      a: "Vanaf € 250 per maand voor checks, kleine fixes en advies bij platformwijzigingen.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* scroll progress bar */}
      <ScrollProgress />
      {/* header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800 backdrop-blur bg-neutral-950/70">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-emerald-500/20 flex items-center justify-center shadow-inner">
              <Sparkles className="h-5 w-5 text-emerald-400" aria-hidden />
            </div>
            <div className="font-semibold tracking-tight">
              EcomMeasure <span className="text-neutral-400">· e‑commerce studio</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white">Diensten</a>
            <a href="#pricing" className="hover:text-white">Prijzen</a>
            <a href="#process" className="hover:text-white">Proces</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <MagneticButton className="border border-neutral-700 hover:border-neutral-600">Gratis scan</MagneticButton>
            <MagneticButton className="bg-emerald-500 text-black font-medium hover:bg-emerald-400">Plan de sprint</MagneticButton>
          </div>
        </div>
      </header>
      {/* hero section with 3D background */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 5]} intensity={1.5} />
            <ParticleNebula />
            <HeroCore />
            <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.25} />
          </Canvas>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/0 via-neutral-950/60 to-neutral-950" />
        <div className="relative mx-auto max-w-7xl px-4 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            Meetbaar. Compliant. <span className="text-emerald-400">Groeien.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-5 max-w-2xl mx-auto text-lg text-neutral-300"
          >
            Wij fixen in 30 dagen je metingen, cookietoestemming en advertentiekoppelingen — mét duidelijk dashboard. Zodat elke marketing-euro meer oplevert.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <MagneticButton className="bg-emerald-500 text-black font-semibold hover:bg-emerald-400">
              Plan de sprint <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton className="border border-neutral-700 hover:border-neutral-600">
              Gratis scan aanvragen
            </MagneticButton>
          </motion.div>
        </div>
        {/* feature cards overlay on hero bottom */}
        <div className="relative -mt-14 mx-auto max-w-7xl px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <TiltCard key={i} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-neutral-800 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm text-neutral-300">{f.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* pricing section */}
      <section id="pricing" className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pakketten die wérken</h2>
            <p className="mt-3 text-neutral-300">Kies een sprint die past. Alle pakketten leveren een testrapport en heldere overdracht op.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((p, i) => (
              <TiltCard key={i} className={p.highlight ? "border-emerald-500/40" : ""}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${p.highlight ? "border-emerald-500/60 text-emerald-400" : "border-neutral-700 text-neutral-300"}`}
                  >
                    {p.badge}
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold">{p.price}</div>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  className={`mt-6 w-full ${p.highlight ? "bg-emerald-500 text-black hover:bg-emerald-400" : "border border-neutral-700 hover:border-neutral-600"}`}
                >
                  {p.cta}
                </MagneticButton>
              </TiltCard>
            ))}
          </div>
          {/* Add-ons note */}
          <div className="mt-12 rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
            <div className="flex items-center gap-3">
              <Cookie className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold">Add-ons & upsells (na de sprint)</h3>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-300">
              <div>
                <p className="font-medium text-neutral-200">Productfeed & Merchant Ops</p>
                <p>
                  Channable/DataFeedWatch, GMC-fouten oplossen.{' '}
                  <span className="text-neutral-400">€ 800–€ 2.000 setup + € 200–€ 600/mnd</span>
                </p>
              </div>
              <div>
                <p className="font-medium text-neutral-200">Lifecycle & deliverability</p>
                <p>
                  Klaviyo/AC flows, DMARC/SPF/DKIM.{' '}
                  <span className="text-neutral-400">€ 1.000–€ 3.000 setup + € 400–€ 900/mnd</span>
                </p>
              </div>
              <div>
                <p className="font-medium text-neutral-200">CRO‑onderzoek & testen</p>
                <p>
                  UX‑audit, hypothesen, A/B‑tests.{' '}
                  <span className="text-neutral-400">€ 1.500 audit + € 800–€ 1.500/mnd</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* process section */}
      <section id="process" className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Zo werken we in 30 dagen</h2>
            <p className="mt-3 text-neutral-300">Een vaste sprint met heldere stappen. Geen ruis, wel resultaat.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: <Timer className="h-5 w-5" />,
                t: "Week 1",
                d: "Scan & plan: toegang, audit, blueprint.",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                t: "Week 2",
                d: "Meting bouwen: GA4 + GTM events + tests.",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                t: "Week 3",
                d: "Consent & koppelingen: CMP + Consent Mode v2, Meta CAPI.",
              },
              {
                icon: <Rocket className="h-5 w-5" />,
                t: "Week 4",
                d: "QA, dashboard, overdracht & video-uitleg.",
              },
            ].map((s, i) => (
              <TiltCard key={i} className="p-5">
                <div className="flex items-center gap-2 text-neutral-200">
                  <div className="h-9 w-9 rounded-xl bg-neutral-800 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <p className="font-semibold">{s.t}</p>
                </div>
                <p className="mt-3 text-sm text-neutral-300">{s.d}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="faq" className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Veelgestelde vragen</h2>
          <div className="mt-10 divide-y divide-neutral-800 rounded-2xl border border-neutral-800 overflow-hidden">
            {faqs.map((f, i) => (
              <details key={i} className="group open:bg-neutral-900/50">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left marker:hidden hover:bg-neutral-900/50">
                  <span className="font-medium">{f.q}</span>
                  <span className="text-neutral-400 group-open:rotate-45 transition">+</span>
                </summary>
                <div className="px-5 pb-5 text-neutral-300 text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Plan je sprint</h2>
          <p className="mt-3 text-neutral-300 text-center">
            Vul het formulier in voor een gratis scan en ontvang een concreet voorstel binnen 1 werkdag.
          </p>
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/success.html" className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-4">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                required
                placeholder="Naam"
                className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="E-mail"
                className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <input
              name="website"
              placeholder="URL webshop (optioneel)"
              className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="message"
              required
              rows="4"
              placeholder="Vertel iets meer over je project..."
              className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <MagneticButton type="submit" className="bg-emerald-500 text-black font-semibold hover:bg-emerald-400 w-full md:w-auto mx-auto px-8 py-3 rounded-xl">
              Versturen
            </MagneticButton>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} EcomMeasure</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-neutral-200">Privacy</a>
              <a href="#" className="hover:text-neutral-200">Voorwaarden</a>
              <a href="#" className="hover:text-neutral-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
