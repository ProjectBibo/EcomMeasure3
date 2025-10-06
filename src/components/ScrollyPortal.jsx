// src/components/ScrollyPortal.jsx
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyPortal() {
  const root = useRef(null);
  const bgRadial = useRef(null);
  const bgConic = useRef(null);
  const blobs = useRef(null);

  const sClaim = useRef(null);
  const sSub = useRef(null);
  const sKpi = useRef(null);
  const sVideo = useRef(null);
  const sCase = useRef(null);
  const sCta = useRef(null);

  const claimLine1Ref = useRef(null);
  const claimLine2Ref = useRef(null);
  const kVal = useRef(null);
  const caseAfter = useRef(null);
  const progressRef = useRef(null);

  const splitWords = (el) => {
    if (!el) return [];
    const words = el.innerText.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
    return Array.from(el.querySelectorAll(".word"));
  };

  // Helper: palette op basis van huidig theme
  const getPalette = (isDark) =>
    isDark
      ? {
          radialA:
            "radial-gradient(1200px 800px at 50% 50%, rgba(9,26,68,0.22), rgba(0,0,0,0) 60%)",
          radialB:
            "radial-gradient(1200px 800px at 50% 50%, rgba(11,95,255,0.18), rgba(0,0,0,0) 60%)",
          conicA:
            "conic-gradient(from 180deg at 50% 50%, rgba(14,165,165,0.16), rgba(249,197,19,0.14), rgba(11,95,255,0.18), rgba(14,165,165,0.16))",
          conicB:
            "conic-gradient(from 180deg at 50% 50%, rgba(11,95,255,0.20), rgba(14,165,165,0.16), rgba(249,197,19,0.14), rgba(11,95,255,0.20))",
          blobA:
            "radial-gradient(circle at 50% 50%, rgba(11,95,255,0.22), rgba(0,0,0,0) 60%)",
          blobB:
            "radial-gradient(circle at 50% 50%, rgba(14,165,165,0.20), rgba(0,0,0,0) 60%)",
          blobC:
            "radial-gradient(circle at 50% 50%, rgba(249,197,19,0.16), rgba(0,0,0,0) 60%)",
          radialOpacity: 0.48,
          conicOpacity: 0.3,
          blobOpacity: [0.24, 0.22, 0.2],
        }
      : {
          radialA:
            "radial-gradient(1200px 800px at 50% 50%, rgba(11,95,255,0.22), rgba(0,0,0,0) 60%)",
          radialB:
            "radial-gradient(1200px 800px at 50% 50%, rgba(14,165,165,0.20), rgba(0,0,0,0) 60%)",
          conicA:
            "conic-gradient(from 180deg at 50% 50%, rgba(14,165,165,0.18), rgba(249,197,19,0.18), rgba(11,95,255,0.18), rgba(14,165,165,0.18))",
          conicB:
            "conic-gradient(from 180deg at 50% 50%, rgba(11,95,255,0.20), rgba(14,165,165,0.18), rgba(249,197,19,0.18), rgba(11,95,255,0.20))",
          blobA:
            "radial-gradient(circle at 50% 50%, rgba(11,95,255,0.25), rgba(0,0,0,0) 60%)",
          blobB:
            "radial-gradient(circle at 50% 50%, rgba(14,165,165,0.22), rgba(0,0,0,0) 60%)",
          blobC:
            "radial-gradient(circle at 50% 50%, rgba(249,197,19,0.20), rgba(0,0,0,0) 60%)",
          radialOpacity: 0.55,
          conicOpacity: 0.35,
          blobOpacity: [0.3, 0.26, 0.24],
        };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const palette = getPalette(isDark);

      // Progress rail
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current)
            gsap.set(progressRef.current, { scaleY: self.progress });
        },
      });

      // Portal base
      const [b1, b2, b3] = blobs.current.querySelectorAll(".blob");
      gsap.set(bgRadial.current, {
        opacity: palette.radialOpacity,
        background: palette.radialA,
      });
      gsap.set(bgConic.current, {
        opacity: palette.conicOpacity,
        background: palette.conicA,
        rotate: 0,
      });

      gsap.set(b1, {
        xPercent: -60,
        yPercent: -40,
        scale: 1.0,
        opacity: palette.blobOpacity[0],
        background: palette.blobA,
      });
      gsap.set(b2, {
        xPercent: 40,
        yPercent: -30,
        scale: 1.2,
        opacity: palette.blobOpacity[1],
        background: palette.blobB,
      });
      gsap.set(b3, {
        xPercent: -20,
        yPercent: 50,
        scale: 1.1,
        opacity: palette.blobOpacity[2],
        background: palette.blobC,
      });

      // Hoofd-timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=3200", // korter: scenes komen sneller
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power4.out" },
      });

      // Kortere, snappier scenes
      const sceneStrict = (
        el,
        from = { autoAlpha: 0, scale: 0.88, y: 70 },
        to = { autoAlpha: 1, scale: 1.1, y: 0 }
      ) => {
        const L = tl.duration();
        tl.addLabel(`S${L}`);
        tl.set(el, { autoAlpha: 0, display: "flex" }, `S${L}`);
        tl.fromTo(el, from, { ...to, duration: 0.45 }, `S${L}`);
        tl.to(el, { autoAlpha: 1, duration: 0.2 });
        tl.to(el, { autoAlpha: 0, scale: 0.99, y: -50, duration: 0.4 });
        tl.set(el, { display: "none" });
      };

      // 1) Claim (compacter)
      sceneStrict(
        sClaim.current,
        { autoAlpha: 0, scale: 0.9, y: 50 },
        { autoAlpha: 1, scale: 1.1, y: 0 }
      );
      const line1Words = splitWords(claimLine1Ref.current);
      const line2Words = splitWords(claimLine2Ref.current);
      tl.from(
        line1Words,
        {
          yPercent: 120,
          rotation: 6,
          autoAlpha: 0,
          stagger: 0.05,
          duration: 0.45,
        },
        ">-0.25"
      );
      tl.from(
        line2Words,
        {
          yPercent: 120,
          rotation: 6,
          autoAlpha: 0,
          stagger: 0.05,
          duration: 0.45,
        },
        "<+0.1"
      );
      tl.to(
        b1,
        { xPercent: -40, yPercent: -30, scale: 1.16, duration: 0.55 },
        "<"
      );
      tl.to(
        b2,
        { xPercent: 20, yPercent: -10, scale: 1.22, duration: 0.55 },
        "<"
      );
      tl.to(
        b3,
        { xPercent: -10, yPercent: 40, scale: 1.18, duration: 0.55 },
        "<"
      );
      tl.to(bgRadial.current, { background: palette.radialB, duration: 0.45 }, "<+0.05");
      tl.to(bgConic.current, { background: palette.conicB, rotate: "+=36", duration: 0.55 }, "<");

      // 2) Subclaim
      sceneStrict(sSub.current, { autoAlpha: 0, scale: 0.94, y: 70 }, { autoAlpha: 1, scale: 1.08, y: 0 });

      // 3) KPI
      sceneStrict(sKpi.current, { autoAlpha: 0, scale: 0.96, y: 60 }, { autoAlpha: 1, scale: 1.12, y: 0 });
      const kObj = { val: 0 };
      tl.to(kObj, {
        val: 128,
        duration: 1.0,
        ease: "power2.out",
        onUpdate: () => {
          if (kVal.current) kVal.current.textContent = Math.round(kObj.val);
        },
      }, ">-0.8");

      // 4) Video
      sceneStrict(sVideo.current, { autoAlpha: 0, scale: 0.98, y: 50 }, { autoAlpha: 1, scale: 1.08, y: 0 });
      tl.to(sVideo.current, { "--overlay": 0.36, duration: 0.6 }, ">-0.5");

      // 5) Case
      const Lcase = tl.duration();
      tl.addLabel(`CASE${Lcase}`);
      tl.set(sCase.current, { autoAlpha: 0, display: "flex" }, `CASE${Lcase}`);
      tl.fromTo(sCase.current, { autoAlpha: 0, y: 70, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.06, duration: 0.55 }, `CASE${Lcase}`);
      tl.fromTo(caseAfter.current, { clipPath: "inset(0 85% 0 0 round 18px)" }, { clipPath: "inset(0 0% 0 0 round 18px)", duration: 1.05, ease: "power3.out" }, ">-0.35");
      tl.to(sCase.current, { autoAlpha: 0, y: -50, scale: 0.99, duration: 0.5 });
      tl.set(sCase.current, { display: "none" });

      // 6) CTA
      const Lcta = tl.duration();
      tl.addLabel(`CTA${Lcta}`);
      tl.set(sCta.current, { autoAlpha: 0, display: "flex" }, `CTA${Lcta}`);
      tl.fromTo(sCta.current, { autoAlpha: 0, y: 40, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1.03, duration: 0.55 }, `CTA${Lcta}`);
    }, root);

    return () => ctx.revert();
  }, []);

  // Live theme support
  useEffect(() => {
    const html = document.documentElement;
    const applyTheme = () => {
      const isDark = html.classList.contains("dark");
      const p = getPalette(isDark);
      const [b1, b2, b3] = blobs.current
        ? blobs.current.querySelectorAll(".blob")
        : [];
      if (!bgRadial.current || !bgConic.current || !b1) return;
      gsap.set(bgRadial.current, { opacity: p.radialOpacity, background: p.radialA });
      gsap.set(bgConic.current, { opacity: p.conicOpacity, background: p.conicA });
      gsap.set(b1, { background: p.blobA, opacity: p.blobOpacity[0] });
      gsap.set(b2, { background: p.blobB, opacity: p.blobOpacity[1] });
      gsap.set(b3, { background: p.blobC, opacity: p.blobOpacity[2] });
    };

    applyTheme();
    const mo = new MutationObserver(applyTheme);
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <section ref={root} className="relative">
      {/* Portal layers */}
      <div ref={bgRadial} className="portal-layer portal-radial" />
      <div ref={bgConic} className="portal-layer portal-conic" />
      <div ref={blobs} className="portal-layer portal-blobs">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      {/* Progress rail */}
      <div className="pointer-events-none hidden md:block fixed right-4 top-1/2 -translate-y-1/2 h-56 w-1 bg-black/10 dark:bg-white/10 rounded">
        <div ref={progressRef} className="origin-top h-full w-full bg-black/40 dark:bg-white/50 scale-y-0 rounded" />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 1) Claim */}
        <div ref={sClaim} className="scene absolute inset-0 flex items-center justify-center text-center px-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-gray-100 leading-[1.07]">
            <span ref={claimLine1Ref}>Meer weten</span><br />
            <span ref={claimLine2Ref} className="text-brand-blue">= minder gokken</span>
          </h1>
        </div>

        {/* 2) Subclaim */}
        <div ref={sSub} className="scene absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-neutral-900 dark:text-gray-100">Ontdek quick wins</h2>
            <p className="text-xl md:text-2xl text-neutral-800 dark:text-gray-200">
              Dankzij <strong>Google Analytics 4</strong>, <strong>SEO</strong> en <strong>trend-research</strong> maak je keuzes die winnen.
            </p>
          </div>
        </div>

        {/* 3) KPI */}
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

        {/* 4) Video */}
        <div ref={sVideo} className="scene absolute inset-0 flex items-center justify-center" style={{ "--overlay": 0 }}>
          <video className="w-full h-full object-cover" src="/about.mp4" playsInline muted autoPlay loop poster="/video-poster.jpg" />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,var(--overlay))" }} />
          <div className="absolute inset-0 grid place-items-center">
            <div className="px-6 py-3 rounded bg-black/50 text-white text-lg md:text-2xl">
              <strong>VIDEO PLACEHOLDER</strong> — voeg <code>/about.mp4</code> toe in <code>/public</code>
            </div>
          </div>
        </div>

        {/* 5) Case */}
        <div ref={sCase} className="scene absolute inset-0 flex items-center justify-center px-6">
          <div className="relative w-[92vw] max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/20">
            <img src="/case-before.jpg" alt="Before" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 grid place-items-center bg-black/10 text-neutral-900 dark:text-gray-100 text-xl font-semibold">
              CASE BEFORE PLACEHOLDER — voeg <code>case-before.jpg</code> toe
            </div>
            <div ref={caseAfter} className="absolute inset-0">
              <img src="/case-after.jpg" alt="After" className="w-full h-full object
