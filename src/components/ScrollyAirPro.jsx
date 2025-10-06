import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrollytelling à la Air, maar jouw layout blijft leidend.
 * Scenes:
 * 1) Claim
 * 2) Subclaim
 * 3) Logos-marquee (social proof)
 * 4) KPI-counters (GA4/SEO/UX impact)
 * 5) Video fullscreen
 * 6) Case before/after (reveal)
 * 7) CTA (blijft staan)
 *
 * Assets die je in /public/ zet:
 *  - /about.mp4 (+ optioneel /video-poster.jpg)
 *  - /case-before.jpg en /case-after.jpg
 *  - /logos/1.svg ... /logos/6.svg (dubbele rij voor naadloze marquee)
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

  // KPI spans refs
  const k1 = useRef(null);
  const k2 = useRef(null);
  const k3 = useRef(null);

  // Before/After overlay (AFTER)
  const afterRef = useRef(null);

  // Progress rail
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const HEADER_H = 80; // pas aan als je header hoger/lager is

      // Progress rail (rechts)
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

      // Hoofd-timeline met pin + scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: `top-=${HEADER_H} top`,
          end: "+=3600", // totale scrollduur (snel en filmisch)
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.out" },
      });

      // Helper voor scenes (in → hold → out)
      const scene = (el, { inDur = 0.35, hold = 0.28, outDur = 0.35, from = {}, to = {} } = {}) => {
        const fromDefaults = { autoAlpha: 0, scale: 0.96, y: 40, ...from };
        const toDefaults   = { autoAlpha: 1, scale: 1.0, y: 0,   ...to };
        tl.fromTo(el, fromDefaults, { ...toDefaults, duration: inDur })
          .to(el,  { autoAlpha: 1, duration: hold })
          .to(el,  { autoAlpha: 0, scale: 0.98, y: -30, duration: outDur }, ">-0.05");
      };

      // 1) Claim
      scene(sClaim.current, { from: { scale: 0.92, y: 20 } });

      // 2) Subclaim
      scene(sSub.current, { from: { y: 40, scale: 0.98 } });

      // 3) Logos (marquee draait via CSS)
      scene(sLogos.current, { from: { y: 30, scale: 0.99 } });

      // 4) KPI-counters (met echte number tween, geen plugin nodig)
      {
        const kpis = [
          { ref: k1, to: 42 },   // bv. +42% conversie
          { ref: k2, to: 68 },   // bv. +68% organisch verkeer
          { ref: k3, to: 97 },   // bv. 97% meetdekking
        ].map(k => ({ ...k, val: 0 }));

        tl.fromTo(sKpi.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 })
          // counters tijdens "hold"
          .to(kpis, {
            val: (i) => kpis[i].to,
            duration: 0.8,
            ease: "power1.out",
            onUpdate: () => {
              kpis.forEach(k => {
                if (k.ref.current) k.ref.current.textContent = Math.round(k.val);
              });
            },
          }, ">-0.2")
          .to(sKpi.current, { autoAlpha: 1, duration: 0.25 })
          .to(sKpi.current, { autoAlpha: 0, y: -30, scale: 0.98, duration: 0.35 });
      }

      // 5) Video
      scene(sVideo.current, { from: { autoAlpha: 0, scale: 0.98 }, to: { autoAlpha: 1, scale: 1 } });

      // 6) Case Before/After — reveal "after" over "before"
      tl.fromTo(sCase.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 })
        .fromTo(afterRef.current, { scaleX: 0.15, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "power2.out" }, ">-0.2")
        .to(sCase.current, { autoAlpha: 0, y: -30, scale: 0.98, duration: 0.35 });

      // 7) CTA — laatste blijft staan
      tl.fromTo(sCta.current, { autoAlpha: 0, y: 30, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[420vh]">
      {/* Progress rail rechts */}
      <div className="pointer-events-none hidden md:block absolute right-4 top-1/2 -translate-y-1/2 h-56 w-1 bg-black/10 dark:bg-white/10 rounded">
        <div ref={progressRef} className="origin-top h-full w-full bg-black/40 dark:bg-white/50 scale-y-0 rounded" />
      </div>

      {/* Sticky viewport; pt-20 compenseert voor je header */}
      <div className="sticky top-0 h-screen overflow-hidden pt-20">
        {/* 1) Claim */}
        <div ref={sClaim} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-brand-blue">Meer weten</span> = minder gokken
            </h1>
          </div>
        </div>

        {/* 2) Subclaim */}
        <div ref={sSub} className="absolute inset-0 grid place-items-center">
          <div className="text-center max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ontdek quick wins</h2>
            <p className="text-lg md:text-xl text-neutral-700 dark:text-gray-300">
              Voor je webshop of site dankzij <strong>Google Analytics 4</strong>, <strong>SEO</strong> en <strong>trend-research</strong>.
            </p>
          </div>
        </div>

        {/* 3) Logos marquee */}
        <div ref={sLogos} className="absolute inset-0 grid place-items-center">
          <div className="w-full overflow-hidden">
            <div className="marquee-row">
              {/* Zet je eigen logo’s in /public/logos/1.svg t/m 6.svg en herhaal voor naadloze loop */}
              <img src="/logos/1.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/2.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/3.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/4.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/5.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/6.svg" className="h-10 mx-8 opacity-80" alt="" />
              {/* dup voor seamless */}
              <img src="/logos/1.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/2.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/3.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/4.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/5.svg" className="h-10 mx-8 opacity-80" alt="" />
              <img src="/logos/6.svg" className="h-10 mx-8 opacity-80" alt="" />
            </div>
          </div>
        </div>

        {/* 4) KPI-counters */}
        <div ref={sKpi} className="absolute inset-0 grid place-items-center">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Kpi title="Conversie" suffix="%">
                <span ref={k1}>0</span>
              </Kpi>
              <Kpi title="Organisch verkeer" suffix="%">
                <span ref={k2}>0</span>
              </Kpi>
              <Kpi title="Meetdekking" suffix="%">
                <span ref={k3}>0</span>
              </Kpi>
            </div>
            <p className="mt-4 text-center text-sm text-neutral-600 dark:text-gray-400">
              Met GA4/Consent Mode, SEO en UX-onderzoek sturen we op impact in weken, niet maanden.
            </p>
          </div>
        </div>

        {/* 5) Video */}
        <div ref={sVideo} className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            src="/about.mp4"
            playsInline
            muted
            autoPlay
            loop
            poster="/video-poster.jpg"
          />
        </div>

        {/* 6) Case before/after */}
        <div ref={sCase} className="absolute inset-0 grid place-items-center">
          <div className="relative w-[92vw] max-w-5xl aspect-[16/9] rounded-xl overflow-hidden shadow-lg border border-black/5 dark:border-white/10">
            <img src="/case-before.jpg" alt="Before" className="absolute inset-0 w-full h-full object-cover" />
            <div ref={afterRef} className="absolute inset-0 origin-left">
              <img src="/case-after.jpg" alt="After" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-3 top-3 px-3 py-1 rounded bg-black/60 text-white text-xs">Before</div>
            <div className="absolute right-3 top-3 px-3 py-1 rounded bg-black/60 text-white text-xs">After</div>
          </div>
        </div>

        {/* 7) CTA */}
        <div ref={sCta} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Klaar om minder te gokken en meer te winnen?</h3>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-md shadow hover:shadow-lg transition"
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
    <div className="rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur p-6 border border-black/5 dark:border-white/10 shadow-sm text-center">
      <div className="text-4xl font-extrabold tracking-tight">
        {children}
        <span className="text-brand-blue">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-neutral-700 dark:text-gray-300">{title}</div>
    </div>
  );
}
