// src/components/ScrollyPortal.jsx
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrollytelling “Portal Edition”
 * - Zeer smooth: power4 easing, langere timeline met ruimte tussen scenes
 * - Transparante, etherische kleurwipes (radial/conic + blend-modes)
 * - Portal-blobs met blur & mix-blend voor “andere dimensie” gevoel
 * - Kinetische typografie (per woord)
 * - XXL KPI count-up
 * - Fullscreen video + overlay (met placeholder)
 * - Case reveal met clip-path morph
 * - Magnetische CTA
 *
 * Assets in /public:
 *  - /about.mp4 (+ optioneel /video-poster.jpg)
 *  - /case-before.jpg, /case-after.jpg
 */

export default function ScrollyPortal() {
  const root = useRef(null);

  // layers
  const bgRadial = useRef(null);   // zachte radial gradient (transparant)
  const bgConic  = useRef(null);   // translucent conic “aura”
  const blobs    = useRef(null);   // container met 3 blur-blobs

  // scenes
  const sClaim = useRef(null);
  const sSub   = useRef(null);
  const sKpi   = useRef(null);
  const sVideo = useRef(null);
  const sCase  = useRef(null);
  const sCta   = useRef(null);

  // claim words
  const claimLine1Ref = useRef(null);
  const claimLine2Ref = useRef(null);

  // KPI
  const kVal = useRef(null);

  // case
  const caseAfter = useRef(null);

  // progress
  const progressRef = useRef(null);

  // helper: split tekst in <span class="word">
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

      // Progress rail
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) gsap.set(progressRef.current, { scaleY: self.progress });
        },
      });

      // Lange, smooth film-timeline (ruime ruimte tussen scenes)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: `top-=${HEADER_H} top`,
          end: "+=4600", // ⬅️ meer tussenruimte/adem
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power4.out" },
      });

      // ===== Portal Base States =====
      // Radial: heel transparant, soft
      gsap.set(bgRadial.current, {
        opacity: 0.55,
        background:
          "radial-gradient(1200px 800px at 50% 50%, rgba(11,95,255,0.22), rgba(0,0,0,0) 60%)",
      });
      // Conic aura
      gsap.set(bgConic.current, {
        opacity: 0.35,
        background:
          "conic-gradient(from 180deg at 50% 50%, rgba(14,165,165,0.18), rgba(249,197,19,0.18), rgba(11,95,255,0.18), rgba(14,165,165,0.18))",
      });
      // Blobs
      const [b1, b2, b3] = blobs.current.querySelectorAll(".blob");

      gsap.set(b1, { xPercent: -60, yPercent: -40, scale: 1.0, opacity: 0.30 });
      gsap.set(b2, { xPercent:  40, yPercent: -30, scale: 1.2, opacity: 0.26 });
      gsap.set(b3, { xPercent: -20, yPercent:  50, scale: 1.1, opacity: 0.24 });

      // Helper: scene met ruime “hold” en sterke scale (maar zacht door easing)
      const scene = (
        el,
        {
          inDur = 0.55,
          hold = 0.44,
          outDur = 0.55,
          from = { autoAlpha: 0, scale: 0.88, y: 70 },
          to   = { autoAlpha: 1, scale: 1.10, y: 0 },
        } = {}
      ) => {
        tl.fromTo(el, from, { ...to, duration: inDur })
          .to(el,  { autoAlpha: 1, duration: hold })
          .to(el,  { autoAlpha: 0, scale: 0.99, y: -60, duration: outDur }, ">-0.08");
      };

      // ===== Scene 1: Claim (kinetic words) =====
      scene(sClaim.current, { from: { scale: 0.9, y: 50 }, to: { scale: 1.12, y: 0 } });

      // Kinetic words
      const line1Words = splitWords(claimLine1Ref.current);
      const line2Words = splitWords(claimLine2Ref.current);
      tl.from(line1Words, { yPercent: 140, rotation: 8, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, "<+0.08");
      tl.from(line2Words, { yPercent: 140, rotation: 8, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, "<+0.04");

      // Portal layers meebewegen (langzaam en etherisch)
      tl.to(b1, { xPercent: -40, yPercent: -30, scale: 1.18, duration: 0.9 }, "<");
      tl.to(b2, { xPercent:  20, yPercent: -10, scale: 1.28, duration: 0.9 }, "<");
      tl.to(b3, { xPercent: -10, yPercent:  40, scale: 1.22, duration: 0.9 }, "<");
      tl.to(bgRadial.current, { opacity: 0.60, duration: 0.7 }, "<+0.05");
      tl.to(bgConic.current,  { opacity: 0.40, rotate: "+=30", duration: 0.9 }, "<");

      // ===== Scene 2: Subclaim =====
      scene(sSub.current, { from: { scale: 0.94, y: 70 }, to: { scale: 1.08, y: 0 } });
      // Aura shift (transparant)
      tl.to(bgRadial.current, {
        background:
          "radial-gradient(1200px 800px at 50% 50%, rgba(14,165,165,0.20), rgba(0,0,0,0) 60%)",
        duration: 0.8,
      }, "<+0.12");
      tl.to(bgConic.current, {
        rotate: "+=60",
        opacity: 0.38,
        duration: 0.8,
      }, "<");

      // ===== Scene 3: KPI (XXL) =====
      scene(sKpi.current, { from: { scale: 0.96, y: 60 }, to: { scale: 1.12, y: 0 } });
      const kObj = { val: 0 };
      tl.to(kObj, {
        val: 128, // pas aan naar jouw grote KPI
        duration: 1.0,
        ease: "power2.out",
        onUpdate: () => { if (kVal.current) kVal.current.textContent = Math.round(kObj.val); }
      }, "<+0.1");
      // portal verdiepen
      tl.to(b1, { xPercent: -20, yPercent: -20, scale: 1.32, duration: 1.0 }, "<");
      tl.to(b2, { xPercent:  10, yPercent:  10, scale: 1.34, duration: 1.0 }, "<");
      tl.to(b3, { xPercent: -5,  yPercent:  25, scale: 1.30, duration: 1.0 }, "<");
      tl.to(bgConic.current, { rotate: "+=80", opacity: 0.45, duration: 1.0 }, "<");

      // ===== Scene 4: Video =====
      scene(sVideo.current, { from: { autoAlpha: 0, scale: 0.98 }, to: { autoAlpha: 1, scale: 1.08 } });
      tl.to(sVideo.current, { "--overlay": 0.38, duration: 0.6 }, "<+0.08");
      // aura tint donkerder/transparanter
      tl.to(bgRadial.current, {
        background:
          "radial-gradient(1200px 800px at 50% 50%, rgba(9,26,68,0.22), rgba(0,0,0,0) 60%)",
        duration: 0.8,
      }, "<");
      tl.to(bgConic.current, { rotate: "+=40", opacity: 0.32, duration: 0.8 }, "<");

      // ===== Scene 5: Case (clip-path) =====
      tl.fromTo(sCase.current, { autoAlpha: 0, y: 70, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.06, duration: 0.55 });
      tl.fromTo(
        caseAfter.current,
        { clipPath: "inset(0 85% 0 0 round 18px)" },
        { clipPath: "inset(0 0% 0 0 round 18px)", duration: 1.05, ease: "power3.out" },
        "<+0.06"
      );
      tl.to(sCase.current, { autoAlpha: 0, y: -50, scale: 0.99, duration: 0.5 });

      // ===== Scene 6: CTA (laat staan) =====
      tl.fromTo(sCta.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.03, duration: 0.55 });

    }, root);

    return () => ctx.revert();
  }, []);

  // Magnetische CTA
  useEffect(() => {
    const btn = document.querySelector(".magnetic-cta");
    if (!btn) return;
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 10;
      const dy = (e.clientY - cy) / 10;
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
      {/* Portal Layers */}
      <div ref={bgRadial} className="portal-layer portal-radial" />
      <div ref={bgConic}  className="portal-layer portal-conic" />
      <div ref={blobs}    className="portal-layer portal-blobs">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      {/* Progress rail */}
      <div className="pointer-events-none hidden md:block fixed right-4 top-1/2 -translate-y-1/2 h-56 w-1 bg-black/10 dark:bg-white/10 rounded">
        <div ref={progressRef} className="origin-top h-full w-full bg-black/40 dark:bg-white/50 scale-y-0 rounded" />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden pt-24">
        {/* 1) Claim */}
        <div ref={sClaim} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6 leading-[1.07] select-none">
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
            <p className="text-xl md:text-2xl text-white/90">
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

        {/* 4) Video (placeholder als geen /about.mp4) */}
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
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,var(--overlay))" }} />
          <div className="absolute inset-0 grid place-items-center">
            <div className="px-6 py-3 rounded bg-black/50 text-white text-lg md:text-2xl">
              <strong>VIDEO PLACEHOLDER</strong> — voeg <code>/about.mp4</code> toe in <code>/public</code>
            </div>
          </div>
        </div>

        {/* 5) Case reveal */}
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

        {/* 6) CTA */}
        <div ref={sCta} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-7 text-white">Klaar om te starten?</h3>
            <a
              href="#contact"
              className="magnetic-cta inline-flex items-center gap-3 px-8 py-5 bg-white/90 text-neutral-900 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition will-change-transform backdrop-blur"
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
