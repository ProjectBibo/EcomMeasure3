// src/components/ScrollyPortal.jsx
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyPortal() {
  const root = useRef(null);
  const bgRadial = useRef(null);
  const bgConic  = useRef(null);
  const blobs    = useRef(null);

  // Scenes (volgorde: VIDEO -> CLAIM -> SUB -> KPI -> CASE -> CTA)
  const sVideoIntro = useRef(null);
  const sClaim = useRef(null);
  const sSub   = useRef(null);
  const sKpi   = useRef(null);
  const sCase  = useRef(null);
  const sCta   = useRef(null);

  // Refs binnen scenes
  const introFrameRef = useRef(null);
  const kVal = useRef(null);
  const claimLine1Ref = useRef(null);
  const claimLine2Ref = useRef(null);
  const caseAfter = useRef(null);
  const progressRef = useRef(null);

  // Video state voor placeholder/zichtbaarheid
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const splitWords = (el) => {
    if (!el) return [];
    const words = el.innerText.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
    return Array.from(el.querySelectorAll(".word"));
  };

  const getPalette = (isDark) =>
    isDark
      ? {
          radialA: "radial-gradient(1200px 800px at 50% 50%, rgba(9,26,68,0.22), rgba(0,0,0,0) 60%)",
          radialB: "radial-gradient(1200px 800px at 50% 50%, rgba(11,95,255,0.18), rgba(0,0,0,0) 60%)",
          conicA:  "conic-gradient(from 180deg at 50% 50%, rgba(14,165,165,0.16), rgba(249,197,19,0.14), rgba(11,95,255,0.18), rgba(14,165,165,0.16))",
          conicB:  "conic-gradient(from 180deg at 50% 50%, rgba(11,95,255,0.20), rgba(14,165,165,0.16), rgba(249,197,19,0.14), rgba(11,95,255,0.20))",
          blobA:   "radial-gradient(circle at 50% 50%, rgba(11,95,255,0.22), rgba(0,0,0,0) 60%)",
          blobB:   "radial-gradient(circle at 50% 50%, rgba(14,165,165,0.20), rgba(0,0,0,0) 60%)",
          blobC:   "radial-gradient(circle at 50% 50%, rgba(249,197,19,0.16), rgba(0,0,0,0) 60%)",
          radialOpacity: 0.48,
          conicOpacity:  0.30,
          blobOpacity:   [0.24, 0.22, 0.20],
        }
      : {
          radialA: "radial-gradient(1200px 800px at 50% 50%, rgba(11,95,255,0.22), rgba(0,0,0,0) 60%)",
          radialB: "radial-gradient(1200px 800px at 50% 50%, rgba(14,165,165,0.20), rgba(0,0,0,0) 60%)",
          conicA:  "conic-gradient(from 180deg at 50% 50%, rgba(14,165,165,0.18), rgba(249,197,19,0.18), rgba(11,95,255,0.18), rgba(14,165,165,0.18))",
          conicB:  "conic-gradient(from 180deg at 50% 50%, rgba(11,95,255,0.20), rgba(14,165,165,0.18), rgba(249,197,19,0.18), rgba(11,95,255,0.20))",
          blobA:   "radial-gradient(circle at 50% 50%, rgba(11,95,255,0.25), rgba(0,0,0,0) 60%)",
          blobB:   "radial-gradient(circle at 50% 50%, rgba(14,165,165,0.22), rgba(0,0,0,0) 60%)",
          blobC:   "radial-gradient(circle at 50% 50%, rgba(249,197,19,0.20), rgba(0,0,0,0) 60%)",
          radialOpacity: 0.55,
          conicOpacity:  0.35,
          blobOpacity:   [0.30, 0.26, 0.24],
        };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const palette = getPalette(isDark);

      // Progress
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) gsap.set(progressRef.current, { scaleY: self.progress });
        },
      });

      // Portal baseline
      const [b1, b2, b3] = blobs.current.querySelectorAll(".blob");
      gsap.set(bgRadial.current, { opacity: palette.radialOpacity, background: palette.radialA });
      gsap.set(bgConic.current,  { opacity: palette.conicOpacity,  background: palette.conicA, rotate: 0 });

      gsap.set(b1, { xPercent: -60, yPercent: -40, scale: 1.0, opacity: palette.blobOpacity[0], background: palette.blobA });
      gsap.set(b2, { xPercent:  40, yPercent: -30, scale: 1.2, opacity: palette.blobOpacity[1], background: palette.blobB });
      gsap.set(b3, { xPercent: -20, yPercent:  50, scale: 1.1, opacity: palette.blobOpacity[2], background: palette.blobC });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=4800",           // totale lengte
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power4.out" },
      });

      // Helper om een scene netjes in/uit te faden
      const sceneStrict = (el, from = { autoAlpha: 0, scale: 0.9, y: 50 }, to = { autoAlpha: 1, scale: 1.08, y: 0 }) => {
        const L = tl.duration();
        tl.addLabel(`S${L}`);
        tl.set(el, { autoAlpha: 0, display: "flex" }, `S${L}`);
        tl.fromTo(el, from, { ...to, duration: 0.6 }, `S${L}`);
        tl.to(el,  { autoAlpha: 1, duration: 0.4 });
        tl.to(el,  { autoAlpha: 0, scale: 0.98, y: -60, duration: 0.55 });
        tl.set(el, { display: "none" });
      };

      // --- Scene 1: INTRO VIDEO (grow -> full -> shrink) ---
      {
        const L = tl.duration();
        tl.addLabel(`INTRO${L}`);
        tl.set(sVideoIntro.current, { autoAlpha: 0, display: "flex" }, `INTRO${L}`);

        // frame start klein & met afgeronde hoeken -> naar full
        tl.fromTo(
          introFrameRef.current,
          { clipPath: "inset(22% 22% 22% 22% round 24px)", scale: 0.9, autoAlpha: 0.0 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1.0, autoAlpha: 1, duration: 1.0, ease: "power3.out" },
          `INTRO${L}`
        );
        // houd even ‘full’
        tl.to(introFrameRef.current, { duration: 0.6 });
        // shrink & fade om plaats te maken voor volgende scene
        tl.to(introFrameRef.current, { clipPath: "inset(28% 28% 28% 28% round 24px)", scale: 0.86, duration: 0.7, ease: "power3.inOut" });
        tl.to(sVideoIntro.current, { autoAlpha: 0, duration: 0.4 }, "<");
        tl.set(sVideoIntro.current, { display: "none" });

        // subtiele background beweging
        tl.to(b1, { xPercent: -40, yPercent: -30, scale: 1.15, duration: 0.9 }, `INTRO${L}+0.1`);
        tl.to(b2, { xPercent:  20, yPercent: -10, scale: 1.24, duration: 0.9 }, "<");
        tl.to(b3, { xPercent: -10, yPercent:  40, scale: 1.18, duration: 0.9 }, "<");
        tl.to(bgRadial.current, { background: palette.radialB, duration: 0.8 }, "<+0.1");
        tl.to(bgConic.current,  { background: palette.conicB, rotate: "+=40", duration: 0.9 }, "<");
      }

      // --- Scene 2: CLAIM ---
      sceneStrict(sClaim.current, { autoAlpha: 0, scale: 0.92, y: 40 }, { autoAlpha: 1, scale: 1.1, y: 0 });
      const line1Words = splitWords(claimLine1Ref.current);
      const line2Words = splitWords(claimLine2Ref.current);
      tl.from(line1Words, { yPercent: 140, rotation: 8, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, ">-0.35");
      tl.from(line2Words, { yPercent: 140, rotation: 8, autoAlpha: 0, stagger: 0.06, duration: 0.7 });

      // --- Scene 3: SUBCLAIM ("Ontdek quick wins") ---
      sceneStrict(sSub.current, { autoAlpha: 0, scale: 0.95, y: 60 }, { autoAlpha: 1, scale: 1.06, y: 0 });

      // --- Scene 4: KPI ---
      sceneStrict(sKpi.current, { autoAlpha: 0, scale: 0.96, y: 60 }, { autoAlpha: 1, scale: 1.1, y: 0 });
      const kObj = { val: 0 };
      tl.to(kObj, {
        val: 128,
        duration: 1.0,
        ease: "power2.out",
        onUpdate: () => { if (kVal.current) kVal.current.textContent = Math.round(kObj.val); }
      }, ">-0.8");

      // --- Scene 5: CASE ---
      {
        const Lcase = tl.duration();
        tl.addLabel(`CASE${Lcase}`);
        tl.set(sCase.current, { autoAlpha: 0, display: "flex" }, `CASE${Lcase}`);
        tl.fromTo(sCase.current, { autoAlpha: 0, y: 70, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.06, duration: 0.55 }, `CASE${Lcase}`);
        tl.fromTo(
          caseAfter.current,
          { clipPath: "inset(0 85% 0 0 round 18px)" },
          { clipPath: "inset(0 0% 0 0 round 18px)", duration: 1.05, ease: "power3.out" },
          ">-0.35"
        );
        tl.to(sCase.current, { autoAlpha: 0, y: -50, scale: 0.99, duration: 0.5 });
        tl.set(sCase.current, { display: "none" });
      }

      // --- Scene 6: CTA (blijft staan) ---
      const Lcta = tl.duration();
      tl.addLabel(`CTA${Lcta}`);
      tl.set(sCta.current, { autoAlpha: 0, display: "flex" }, `CTA${Lcta}`);
      tl.fromTo(sCta.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.03, duration: 0.55 }, `CTA${Lcta}`);
    }, root);

    return () => ctx.revert();
  }, []);

  // Live theme support (portal kleurt mee)
  useEffect(() => {
    const html = document.documentElement;
    const applyTheme = () => {
      const isDark = html.classList.contains("dark");
      const p = getPalette(isDark);
      const [b1, b2, b3] = blobs.current ? blobs.current.querySelectorAll(".blob") : [];
      if (!bgRadial.current || !bgConic.current || !b1) return;
      gsap.set(bgRadial.current, { opacity: p.radialOpacity, background: p.radialA });
      gsap.set(bgConic.current,  { opacity: p.conicOpacity,  background: p.conicA });
      gsap.set(b1, { background: p.blobA, opacity: p.blobOpacity[0] });
      gsap.set(b2, { background: p.blobB, opacity: p.blobOpacity[1] });
      gsap.set(b3, { background: p.blobC, opacity: p.blobOpacity[2] });
    };
    applyTheme();
    const mo = new MutationObserver(applyTheme);
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Reusable inline pattern voor de placeholder (geen extra CSS nodig)
  const placeholderBg = {
    backgroundImage: `
      radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,.18), rgba(0,0,0,0)),
      repeating-linear-gradient(135deg, rgba(255,255,255,.10) 0px, rgba(255,255,255,.10) 4px, rgba(255,255,255,0) 4px, rgba(255,255,255,0) 12px)
    `,
    backgroundBlendMode: "overlay, normal",
  };

  return (
    <section ref={root} data-snap-section className="relative">
      {/* Portal layers */}
      <div ref={bgRadial} className="portal-layer portal-radial" />
      <div ref={bgConic}  className="portal-layer portal-conic" />
      <div ref={blobs}    className="portal-layer portal-blobs">
        <div className="blob" />
        <div className="blob" />
        <div className="blob" />
      </div>

      {/* Progress rail */}
      <div className="progress-rail hidden md:block">
        <div ref={progressRef} className="progress-bar" />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 1) INTRO VIDEO */}
        <div ref={sVideoIntro} className="scene absolute inset-0 flex items-center justify-center px-6">
          <div
            ref={introFrameRef}
            className="relative w-[92vw] max-w-6xl aspect-[16/9] overflow-hidden shadow-2xl rounded-2xl bg-neutral-900/60 dark:bg-black/50"
            style={{ clipPath: "inset(22% 22% 22% 22% round 24px)" }}
          >
            {/* --- VISUELE PLACEHOLDER --- */}
            {(!videoReady || videoError) && (
              <div
                className="absolute inset-0 flex items-center justify-center text-white"
                style={placeholderBg}
                aria-label="Video placeholder"
                role="img"
              >
                {/* Vulling & pseudo UI */}
                <div className="absolute inset-0">
                  {/* Top bar met titel */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-black/30 backdrop-blur-sm flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400/80" />
                      <span className="ml-3 text-sm md:text-base font-semibold tracking-wide opacity-90">Intro-video</span>
                    </div>
                    <span className="text-xs md:text-sm opacity-80">16:9 • /about.mp4</span>
                  </div>

                  {/* Bottom "controls" */}
                  <div className="absolute left-0 right-0 bottom-0 px-5 pb-5">
                    <div className="mx-auto w-full max-w-[92%] rounded-md bg-white/15 h-1.5 mb-3 overflow-hidden">
                      <div className="h-full w-1/3 bg-white/60" />
                    </div>
                    <div className="flex items-center justify-between text-xs opacity-85">
                      <span>00:00</span>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline">HD</span>
                        <span className="hidden sm:inline">Subtitles</span>
                        <span className="hidden sm:inline">Loop</span>
                      </div>
                      <span>00:12</span>
                    </div>
                  </div>

                  {/* Hoeklabel */}
                  <div className="absolute left-4 top-16 px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-white/15 backdrop-blur">
                    VIDEO PLACEHOLDER
                  </div>
                </div>

                {/* Groot “play” icoon (decoratief) */}
                <div className="relative z-10 grid place-items-center">
                  <div className="group inline-grid place-items-center rounded-full w-24 h-24 md:w-28 md:h-28 bg-white/20 backdrop-blur-lg ring-1 ring-white/40 hover:bg-white/30 transition">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" className="text-white/95">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="mt-4 text-center px-6">
                    <div className="text-xl md:text-2xl font-extrabold mb-1">Intro-video</div>
                    <div className="text-xs md:text-sm opacity-90">
                      Plaats je bestand als <code className="font-mono">/public/about.mp4</code>
                      {` `} (optioneel poster: <code className="font-mono">/public/video-poster.jpg</code>)
                    </div>
                    {videoError && (
                      <div className="mt-2 text-xs text-red-200/90">
                        Kon video niet laden — controleer pad/bestand.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Video layer (fade in zodra ready) */}
            <video
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${videoReady && !videoError ? "opacity-100" : "opacity-0"}`}
              src="/about.mp4"
              playsInline
              muted
              autoPlay
              loop
              preload="auto"
              poster="/video-poster.jpg"
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoError(true)}
            />
          </div>
        </div>

        {/* 2) CLAIM */}
        <div ref={sClaim} className="scene absolute inset-0 flex items-center justify-center text-center px-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-gray-100 leading-[1.07]">
            <span ref={claimLine1Ref}>Meer weten</span><br />
            <span ref={claimLine2Ref} className="text-brand-blue">= minder gokken</span>
          </h1>
        </div>

        {/* 3) SUBCLAIM */}
        <div ref={sSub} className="scene absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-neutral-900 dark:text-gray-100">Ontdek quick wins</h2>
            <p className="text-xl md:text-2xl text-neutral-800 dark:text-gray-200">
              Dankzij <strong>Google Analytics 4</strong>, <strong>SEO</strong> en <strong>trend-research</strong> maak je keuzes die winnen.
            </p>
          </div>
        </div>

        {/* 4) KPI */}
        <div ref={sKpi} className="scene absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="text-[18vw] leading-none font-black tracking-tight text-neutral-900 dark:text-gray-100">
              <span ref={kVal}>0</span><span className="align-top text-[8vw]">%</span>
            </div>
            <div className="mt-3 text-lg md:text-xl text-neutral-800 dark:text-gray-200">
              Gemiddelde groei bij nieuwe implementaties
            </div>
          </div>
        </div>

        {/* 5) CASE */}
        <div ref={sCase} className="scene absolute inset-0 flex items-center justify-center px-6">
          <div className="relative w-[92vw] max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/20">
            <img src="/case-before.jpg" alt="Before" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 grid place-items-center bg-black/10 text-neutral-900 dark:text-gray-100 text-xl font-semibold">
              CASE BEFORE PLACEHOLDER — voeg <code>case-before.jpg</code> toe
            </div>
            <div ref={caseAfter} className="absolute inset-0">
              <img src="/case-after.jpg" alt="After" className="w-full h-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-black/10 text-neutral-900 dark:text-gray-100 text-xl font-semibold">
                CASE AFTER PLACEHOLDER — voeg <code>case-after.jpg</code> toe
              </div>
            </div>
          </div>
        </div>

        {/* 6) CTA */}
        <div ref={sCta} className="scene absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-7 text-neutral-900 dark:text-gray-100">
              Klaar om te starten?
            </h3>
            <a href="#contact" className="inline-flex items-center gap-3 px-8 py-5 bg-brand-blue text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition">
              Laten we kennismaken
            </a>
            <p className="mt-4 text-neutral-800 dark:text-gray-200">
              Binnen 30 dagen live met betrouwbare metingen & zichtbare winst.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
