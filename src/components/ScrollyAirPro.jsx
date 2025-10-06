import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrollytelling Pro (sneller + groter + placeholders)
 * Scenes:
 * 1) Claim (big)
 * 2) Subclaim (big)
 * 3) Logos marquee (social proof)
 * 4) KPI counters
 * 5) Video (placeholder als je nog geen /about.mp4 hebt)
 * 6) Case before/after (placeholder images)
 * 7) CTA (blijft staan)
 */

export default function ScrollyAirPro() {
  const root = useRef(null);
  const sClaim = useRef(null);
  const sSub   = useRef(null);
  const sLogos = useRef(null);
  const sKpi   = useRef(null);
  const sVideo = useRef(null);
  const sCase  = useRef(null);
  const sCta   = useRef(null);

  const k1 = useRef(null);
  const k2 = useRef(null);
  const k3 = useRef(null);
  const afterRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const HEADER_H = 80;

      // Progress rail rechts
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleY: self.progress });
          }
        },
      });

      // Snellere, krachtigere timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: `top-=${HEADER_H} top`,
          end: "+=2600",          // korter = sneller achter elkaar
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.out" },
      });

      // Helper voor scènes (grotere schaal en snellere overgangen)
      const scene = (
        el,
        {
          inDur = 0.28,
          hold = 0.20,
          outDur = 0.28,
          from = { autoAlpha: 0, scale: 0.90, y: 60 },
          to   = { autoAlpha: 1, scale: 1.04, y: 0 },
        } = {}
      ) => {
        tl.fromTo(el, from, { ...to, duration: inDur })
          .to(el,  { autoAlpha: 1, duration: hold })
          .to(el,  { autoAlpha: 0, scale: 0.98, y: -40, duration: outDur }, ">-0.04");
      };

      // 1) Claim — groot
      scene(sClaim.current, { from: { scale: 0.88, y: 40 }, to: { scale: 1.06, y: 0 } });

      // 2) Subclaim — groot
      scene(sSub.current,   { from: { scale: 0.92, y: 60 }, to: { scale: 1.05, y: 0 } });

      // 3) Logos
      scene(sLogos.current, { from: { scale: 0.97, y: 40 }, to: { scale: 1.03, y: 0 } });

      // 4) KPI-counters — snel animeren
      {
        const kpis = [
          { ref: k1, to: 42 },
          { ref: k2, to: 68 },
          { ref: k3, to: 97 },
        ].map(k => ({ ...k, val: 0 }));

        tl.fromTo(sKpi.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.04, duration: 0.3 })
          .to(kpis, {
            val: (i) => kpis[i].to,
            duration: 0.55,
            ease: "power1.out",
            onUpdate: () => {
              kpis.forEach(k => {
                if (k.ref.current) k.ref.current.textContent = Math.round(k.val);
              });
            },
          }, ">-0.12")
          .to(sKpi.current, { autoAlpha: 1, duration: 0.18 })
          .to(sKpi.current, { autoAlpha: 0, y: -40, scale: 0.98, duration: 0.28 });
      }

      // 5) Video (placeholder zichtbaar als je nog geen video hebt)
      scene(sVideo.current, { from: { autoAlpha: 0, scale: 0.98 }, to: { autoAlpha: 1, scale: 1.04 } });

      // 6) Case before/after — reveal snel en vol scherm
      tl.fromTo(sCase.current, { autoAlpha: 0, y: 50, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.03, duration: 0.3 })
        .fromTo(afterRef.current, { scaleX: 0.1, transformOrigin: "left center" }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, ">-0.1")
        .to(sCase.current, { autoAlpha: 0, y: -40, scale: 0.98, duration: 0.28 });

      // 7) CTA — blijft staan
      tl.fromTo(sCta.current, { autoAlpha: 0, y: 30, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.02, duration: 0.35 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[360vh]">
      {/* Progress rail rechts */}
      <div className="pointer-events-none hidden md:block absolute right-4 top-1/2 -translate-y-1/2 h-56 w-1 bg-black/10 dark:bg-white/10 rounded">
        <div ref={progressRef} className="origin-top h-full w-full bg-black/40 dark:bg-white/50 scale-y-0 rounded" />
      </div>

      {/* Sticky viewport; pt-24 vult scherm beter en houdt rekening met je header */}
      <div className="sticky top-0 h-screen overflow-hidden pt-24">
        {/* 1) Claim */}
        <div ref={sClaim} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="text-brand-blue">Meer weten</span> = minder gokken
            </h1>
          </div>
        </div>

        {/* 2) Subclaim */}
        <div ref={sSub} className="absolute inset-0 grid place-items-center">
          <div className="text-center max-w-4xl px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Ontdek quick wins</h2>
            <p className="text-xl md:text-2xl text-neutral-700 dark:text-gray-300">
              Voor je webshop of site dankzij <strong>Google Analytics 4</strong>, <strong>SEO</strong> en <strong>trend-research</strong>.
            </p>
          </div>
        </div>

        {/* 3) Logos marquee */}
        <div ref={sLogos} className="absolute inset-0 grid place-items-center">
          <div className="w-full overflow-hidden">
            <div className="marquee-row">
              {/* Zet je eigen logo’s in /public/logos/1.svg t/m 6.svg en dupliceer voor loop */}
              <img src="/logos/1.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/2.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/3.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/4.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/5.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/6.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/1.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/2.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/3.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/4.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/5.svg" className="h-12 mx-10 opacity-80" alt="" />
              <img src="/logos/6.svg" className="h-12 mx-10 opacity-80" alt="" />
            </div>
          </div>
        </div>

        {/* 4) KPI counters */}
        <div ref={sKpi} className="absolute inset-0 grid place-items-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Kpi title="Conversie" suffix="%"><span ref={k1}>0</span></Kpi>
              <Kpi title="Organisch verkeer" suffix="%"><span ref={k2}>0</span></Kpi>
              <Kpi title="Meetdekking" suffix="%"><span ref={k3}>0</span></Kpi>
            </div>
            <p className="mt-5 text-center text-base md:text-lg text-neutral-600 dark:text-gray-400">
              Met GA4/Consent Mode, SEO en UX-onderzoek sturen we op impact in weken, niet maanden.
            </p>
          </div>
        </div>

        {/* 5) Video — met duidelijke placeholder */}
        <div ref={sVideo} className="absolute inset-0">
          {/* Video-element (als je later /about.mp4 toevoegt werkt dit direct) */}
          <video
            className="w-full h-full object-cover"
            src="/about.mp4"
            playsInline muted autoPlay loop
            poster="/video-poster.jpg"
          />
          {/* Placeholder overlay (blijft zichtbaar als je nog geen video hebt) */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="px-6 py-3 rounded bg-black/50 text-white text-lg md:text-2xl">
              <strong>VIDEO PLACEHOLDER</strong> — vervang <code>/about.mp4</code> in <code>/public</code>
            </div>
          </div>
        </div>

        {/* 6) Case before/after — met placeholders */}
        <div ref={sCase} className="absolute inset-0 grid place-items-center">
          <div className="relative w-[92vw] max-w-6xl aspect-[16/9] rounded-xl overflow-hidden shadow-xl border border-black/5 dark:border-white/10">
            {/* Before (achtergrond) */}
            <div className="absolute inset-0 w-full h-full">
              <img src="/case-before.jpg" alt="Before" className="w-full h-full object-cover" />
              {/* Placeholder if no image */}
              <div className="absolute inset-0 grid place-items-center bg-black/20 text-white text-xl font-semibold">
                CASE BEFORE PLACEHOLDER — voeg <code>case-before.jpg</code> toe aan <code>/public</code>
              </div>
            </div>
            {/* After (reveal) */}
            <div ref={afterRef} className="absolute inset-0 origin-left">
              <img src="/case-after.jpg" alt="After" className="w-full h-full object-cover" />
              {/* Placeholder if no image */}
              <div className="absolute inset-0 grid place-items-center bg-black/10 text-white text-xl font-semibold">
                CASE AFTER PLACEHOLDER — voeg <code>case-after.jpg</code> toe aan <code>/public</code>
              </div>
            </div>

            <div className="absolute left-3 top-3 px-3 py-1 rounded bg-black/60 text-white text-xs">Before</div>
            <div className="absolute right-3 top-3 px-3 py-1 rounded bg-black/60 text-white text-xs">After</div>
          </div>
        </div>

        {/* 7) CTA — eindigt groot in beeld */}
        <div ref={sCta} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-7">Klaar om te starten?</h3>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-7 py-4 bg-brand-blue text-white text-lg font-semibold rounded-md shadow hover:shadow-lg transition"
            >
              Laten we kennismaken
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kpi({ title, suffix, children }) {
  return (
    <div className="rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur p-8 border border-black/5 dark:border-white/10 shadow-sm text-center">
      <div className="text-5xl font-extrabold tracking-tight">
        {children}
        <span className="text-brand-blue">{suffix}</span>
      </div>
      <div className="mt-3 text-base md:text-lg font-medium text-neutral-700 dark:text-gray-300">{title}</div>
    </div>
  );
}
