// src/components/ScrollyAirElite.jsx
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Air-achtige scrollytelling met "€10k feel":
 * - Kleur-wipes (achtergrondlaag)
 * - Kinetische typografie (per woord)
 * - XXL KPI-scène (dramatische count-up + overlay)
 * - Fullscreen video (met placeholder overlay)
 * - Case reveal met clip-path morph
 * - Magnetische CTA
 *
 * Assets die je in /public/ zet:
 *  - /about.mp4 (+ optioneel /video-poster.jpg)
 *  - /case-before.jpg, /case-after.jpg
 *  - /logos/1.svg .. /logos/6.svg (optioneel voor marquee)
 */

export default function ScrollyAirElite() {
  const root = useRef(null);

  // achtergrond wipe layer
  const bg = useRef(null);

  // scenes
  const sClaim = useRef(null);
  const sSub   = useRef(null);
  const sKpi   = useRef(null);
  const sVideo = useRef(null);
  const sCase  = useRef(null);
  const sCta   = useRef(null);

  // claim words refs
  const claimLine1Ref = useRef(null);
  const claimLine2Ref = useRef(null);

  // KPI refs
  const kVal = useRef(null);

  // case overlay
  const caseAfter = useRef(null);

  // progress rail
  const progressRef = useRef(null);

  // helper: split een tekstnode in <span class="word">...</span>
  const splitWords = (el) => {
    if (!el) return [];
    const words = el.innerText.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
    return Array.from(el.querySelectorAll(".word"));
  };

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const HEADER_H = 80;

      // progress rail
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) gsap.set(progressRef.current, { scaleY: self.progress });
        },
      });

      // hoofdtimeline: iets ruimer dan "Pro", maar nog strak
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: `top-=${HEADER_H} top`,
          end: "+=3800",  // ⬅️ totale “film”-duur; hoger = meer ruimte
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power3.out" },
      });

      // SCENE: helper (with stronger scale and richer timings)
      const scene = (
        el,
        {
          inDur = 0.45,
          hold = 0.38,
          outDur = 0.45,
          from = { autoAlpha: 0, scale: 0.88, y: 60 },
          to   = { autoAlpha: 1, scale: 1.08, y: 0 },
        } = {}
      ) => {
        tl.fromTo(el, from, { ...to, duration: inDur })
          .to(el,  { autoAlpha: 1, duration: hold })
          .to(el,  { autoAlpha: 0, scale: 0.98, y: -50, duration: outDur }, ">-0.06");
      };

      // 0) kleur-wipe start (achtergrondlaag)
      gsap.set(bg.current, { background: "linear-gradient(120deg, #F4F1EB 0%, #F4F1EB 100%)" });

      // 1) Claim — kinetic words
      scene(sClaim.current, { from: { scale: 0.9, y: 40 }, to: { scale: 1.1, y: 0 } });

      // kinetic words animatie (sub-timeline gekoppeld aan hetzelfde scrub venster)
      const line1Words = splitWords(claimLine1Ref.current);
      const line2Words = splitWords(claimLine2Ref.current);
      tl.from(line1Words, { yPercent: 120, rotation: 6, autoAlpha: 0, stagger: 0.06, duration: 0.6 }, "<+0.05");
      tl.from(line2Words, { yPercent: 120, rotation: 6, autoAlpha: 0, stagger: 0.06, duration: 0.6 }, "<+0.05");

      // kleur-wipe naar brand-blauw → teal
      tl.to(bg.current, {
        background: "linear-gradient(120deg, #0B5FFF 0%, #00B6A1 100%)",
        duration: 0.8,
      }, "<+0.1");

      // 2) Subclaim — groot, centrum
      scene(sSub.current, { from: { scale: 0.93, y: 60 }, to: { scale: 1.06, y: 0 } });

      // wipe naar geel-accent
      tl.to(bg.current, {
        background: "linear-gradient(120deg, #00B6A1 0%, #F9C513 100%)",
        duration: 0.8,
      }, "<+0.1");

      // 3) KPI — XXL
      scene(sKpi.current, { from: { scale: 0.95, y: 50 }, to: { scale: 1.08, y: 0 } });

      // KPI count-up
      const kObj = { val: 0 };
      tl.to(kObj, {
        val: 128, // jouw grote “wow” KPI — pas aan
        duration: 0.9,
        ease: "power1.out",
        onUpdate: () => {
          if (kVal.current) kVal.current.textContent = Math.round(kObj.val);
        },
      }, "<+0.1");

      // wipe naar diepe blauw-tint
      tl.to(bg.current, {
        background: "linear-gradient(120deg, #091A44 0%, #0B5FFF 100%)",
        duration: 0.8,
      }, "<");

      // 4) Video — fullscreen
      scene(sVideo.current, { from: { autoAlpha: 0, scale: 0.98 }, to: { autoAlpha: 1, scale: 1.06 } });

      // zachte dark overlay op video
      tl.to(sVideo.current, { "--overlay": 0.35, duration: 0.5 }, "<+0.05");

      // 5) Case — clip-path reveal (van kleine balk naar full)
      tl.fromTo(sCase.current, { autoAlpha: 0, y: 60, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.04, duration: 0.45 });
      tl.fromTo(
        caseAfter.current,
        { clipPath: "inset(0 85% 0 0 round 16px)" },
        { clipPath: "inset(0 0% 0 0 round 16px)", duration: 0.9, ease: "power2.out" },
        "<+0.05"
      );
      tl.to(sCase.current, { autoAlpha: 0, y: -40, scale: 0.99, duration: 0.4 });

      // 6) CTA — laatste blijft staan
      tl.fromTo(sCta.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.02, duration: 0.5 });

    }, root);

    return () => ctx.revert();
  }, []);

  // Magnetische CTA micro-interactie
  useEffect(() => {
    const btn = document.querySelector(".magnetic-cta");
    if (!btn) return;
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 8;
      const dy = (e.clientY - cy) / 8;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { btn.style.transform = "translate(0,0)"; };
    window.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={root} className="relative">
      {/* achtergrond kleur-wipe laag */}
      <div ref={bg} className="fixed inset-0 -z-10 transition-colors duration-500" />

      {/* progress rail */}
      <div className="pointer-events-none hidden md:block fixed right-4 top-1/2 -translate-y-1/2 h-56 w-1 bg-black/10 dark:bg-white/10 rounded">
        <div ref={progressRef} className="origin-top h-full w-full bg-black/40 dark:bg-white/50 scale-y-0 rounded" />
      </div>

      {/* sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden pt-24">
        {/* 1) Claim — kinetic words */}
        <div ref={sClaim} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6 leading-[1.08] select-none">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span ref={claimLine1Ref}>Meer weten</span>
              <br />
              <span ref={claimLine2Ref} className="text-brand-blue">= minder gokken</span>
            </h1>
          </div>
        </div>

        {/* 2) Subclaim */}
        <div ref={sSub} className="absolute inset-0 grid place-items-center">
          <div className="text-center max-w-4xl px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Ontdek quick wins</h2>
            <p className="text-xl md:text-2xl text-neutral-100/90">
              Dankzij <strong>Google Analytics 4</strong>, <strong>SEO</strong> en <strong>trend-research</strong> maak je keuzes die winnen.
            </p>
          </div>
        </div>

        {/* 3) KPI XXL */}
        <div ref={sKpi} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <div className="text-[18vw] leading-none font-black tracking-tight mix-blend-screen text-white/90 drop-shadow-xl">
              <span ref={kVal}>0</span><span className="align-top text-[8vw]">%</span>
            </div>
            <div className="mt-3 text-lg md:text-xl text-white/90">Gemiddelde groei bij nieuwe implementaties</div>
          </div>
        </div>

        {/* 4) Video fullscreen (+ placeholder) */}
        <div
          ref={sVideo}
          className="absolute inset-0"
          style={{ position: "absolute", inset: 0, "--overlay": 0 }}
        >
          <video
            className="w-full h-full object-cover"
            src="/about.mp4"
            playsInline muted autoPlay loop
            poster="/video-poster.jpg"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,var(--overlay))" }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="px-6 py-3 rounded bg-black/50 text-white text-lg md:text-2xl">
              <strong>VIDEO PLACEHOLDER</strong> — voeg <code>/about.mp4</code> toe in <code>/public</code>
            </div>
          </div>
        </div>

        {/* 5) Case reveal (clip-path morph) */}
        <div ref={sCase} className="absolute inset-0 grid place-items-center">
          <div className="relative w-[92vw] max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img src="/case-before.jpg" alt="Before" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 grid place-items-center bg-black/25 text-white text-xl font-semibold">
              CASE BEFORE PLACEHOLDER — voeg <code>case-before.jpg</code> toe
            </div>
            <div ref={caseAfter} className="absolute inset-0">
              <img src="/case-after.jpg" alt="After" className="w-full h-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-black/10 text-white text-xl font-semibold">
                CASE AFTER PLACEHOLDER — voeg <code>case-after.jpg</code> toe
              </div>
            </div>
          </div>
        </div>

        {/* 6) CTA — magnetisch */}
        <div ref={sCta} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-7 text-white">Klaar om te starten?</h3>
            <a
              href="#contact"
              className="magnetic-cta inline-flex items-center gap-3 px-8 py-5 bg-white text-neutral-900 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition will-change-transform"
            >
              Laten we kennismaken
            </a>
            <p className="mt-4 text-white/80">Binnen 30 dagen live met betrouwbare metingen & zichtbare winst.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
