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
  const progressRef = useRef(null);

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

  const splitWords = (el) => {
    if (!el) return [];
    const words = el.innerText.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
    return Array.from(el.querySelectorAll(".word"));
  };

  useLayoutEffect(() => {
    if (!root.current) return;

    try {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=4000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        // --- Scene 1: Claim ---
        if (sClaim.current) {
          const line1Words = splitWords(claimLine1Ref.current);
          const line2Words = splitWords(claimLine2Ref.current);

          tl.set(sClaim.current, { autoAlpha: 0, display: "flex" });
          tl.fromTo(
            sClaim.current,
            { autoAlpha: 0, y: 50, scale: 0.9 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 }
          );
          if (line1Words.length)
            tl.from(line1Words, {
              yPercent: 140,
              autoAlpha: 0,
              stagger: 0.06,
              duration: 0.7,
            });
          if (line2Words.length)
            tl.from(line2Words, {
              yPercent: 140,
              autoAlpha: 0,
              stagger: 0.06,
              duration: 0.7,
            });
          tl.to(sClaim.current, {
            autoAlpha: 0,
            y: -40,
            scale: 0.95,
            duration: 0.5,
          });
          tl.set(sClaim.current, { display: "none" });
        }

        // --- Scene 2: Subclaim ---
        if (sSub.current) {
          tl.set(sSub.current, { autoAlpha: 0, display: "flex" });
          tl.fromTo(
            sSub.current,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          );
          tl.to(sSub.current, { autoAlpha: 0, y: -40, duration: 0.5 });
          tl.set(sSub.current, { display: "none" });
        }

        // --- Scene 3: KPI ---
        if (sKpi.current && kVal.current) {
          tl.set(sKpi.current, { autoAlpha: 0, display: "flex" });
          tl.fromTo(
            sKpi.current,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          );
          const kObj = { val: 0 };
          tl.to(kObj, {
            val: 128,
            duration: 1.0,
            ease: "power2.out",
            onUpdate: () => {
              if (kVal.current)
                kVal.current.textContent = Math.round(kObj.val);
            },
          });
          tl.to(sKpi.current, { autoAlpha: 0, y: -40, duration: 0.5 });
          tl.set(sKpi.current, { display: "none" });
        }

        // --- Scene 4: Video ---
        if (sVideo.current) {
          tl.set(sVideo.current, { autoAlpha: 0, display: "flex" });
          tl.fromTo(
            sVideo.current,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          );
          tl.to(sVideo.current, { autoAlpha: 0, y: -40, duration: 0.5 });
          tl.set(sVideo.current, { display: "none" });
        }

        // --- Scene 5: Case ---
        if (sCase.current && caseAfter.current) {
          tl.set(sCase.current, { autoAlpha: 0, display: "flex" });
          tl.fromTo(
            sCase.current,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          );
          tl.fromTo(
            caseAfter.current,
            { clipPath: "inset(0 85% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.0 }
          );
          tl.to(sCase.current, { autoAlpha: 0, y: -40, duration: 0.5 });
          tl.set(sCase.current, { display: "none" });
        }

        // --- Scene 6: CTA (blijft staan) ---
        if (sCta.current) {
          tl.set(sCta.current, { autoAlpha: 0, display: "flex" });
          tl.fromTo(
            sCta.current,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          );
        }

        // --- Progress rail ---
        if (progressRef.current) {
          ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              if (progressRef.current)
                gsap.set(progressRef.current, { scaleY: self.progress });
            },
          });
        }
      }, root);

      return () => ctx.revert();
    } catch (err) {
      console.error("ScrollyPortal init error", err);
    }
  }, []);

  // Theme toggle observer
  useEffect(() => {
    const html = document.documentElement;
    const mo = new MutationObserver(() => {
      // we zouden hier dynamisch bg kunnen aanpassen
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <section ref={root} className="relative">
      {/* Progress rail */}
      <div className="pointer-events-none hidden md:block fixed right-4 top-1/2 -translate-y-1/2 h-56 w-1 bg-black/10 dark:bg-white/10 rounded">
        <div
          ref={progressRef}
          className="origin-top h-full w-full bg-black/40 dark:bg-white/50 scale-y-0 rounded"
        />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Scenes */}
        <div
          ref={sClaim}
          className="scene absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white">
            <span ref={claimLine1Ref}>Meer weten</span>
            <br />
            <span ref={claimLine2Ref} className="text-brand-blue">
              = minder gokken
            </span>
          </h1>
        </div>

        <div
          ref={sSub}
          className="scene absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Ontdek quick wins
          </h2>
        </div>

        <div
          ref={sKpi}
          className="scene absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <div>
            <div className="text-[18vw] font-black text-neutral-900 dark:text-white leading-none">
              <span ref={kVal}>0</span>
              <span className="align-top text-[8vw]">%</span>
            </div>
            <p className="mt-4 text-neutral-700 dark:text-gray-300">
              Gemiddelde groei bij nieuwe implementaties
            </p>
          </div>
        </div>

        <div
          ref={sVideo}
          className="scene absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <p className="text-xl text-neutral-800 dark:text-gray-200">
            VIDEO PLACEHOLDER
          </p>
        </div>

        <div
          ref={sCase}
          className="scene absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <div className="relative w-[92vw] max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden border border-black/10 dark:border-white/20">
            <img
              src="/case-before.jpg"
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div ref={caseAfter} className="absolute inset-0">
              <img
                src="/case-after.jpg"
                alt="After"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          ref={sCta}
          className="scene absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <div>
            <h3 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              Klaar om te starten?
            </h3>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg"
            >
              Laten we kennismaken
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
