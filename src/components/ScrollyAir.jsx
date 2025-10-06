import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Air-like scrollytelling die je huidige layout respecteert.
 * - Pinned sticky viewport
 * - 5 scènes die elkaar afwisselen tijdens scroll
 * - Smooth scrub
 * - Houdt rekening met je vaste header (via top offset)
 *
 * Assets: zet je video in /public/about.mp4 (en optioneel /public/video-poster.jpg)
 */

export default function ScrollyAir() {
  const root = useRef(null);
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null); // video
  const s4 = useRef(null);
  const s5 = useRef(null);

  useLayoutEffect(() => {
    // Respecteer "reduce motion"
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return; // sla animaties over

    // GSAP context voorkomt memory leaks bij hot reload / unmount
    const ctx = gsap.context(() => {
      // hoogte van je header (schatting/afhankelijk van jouw header)
      const HEADER_H = 80; // px; pas aan als je header hoger/lager is

      // Timeline met pinned sticky
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: `top-=${HEADER_H} top`,
          end: "+=3500",            // totale scroll-distance van de story
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.out" },
      });

      // Helper om een scene in/hold/uit te animeren
      const scene = (el, { inDur = 0.4, hold = 0.3, outDur = 0.4, from = {}, to = {} } = {}) => {
        const fromDefaults = { autoAlpha: 0, scale: 0.96, y: 40, ...from };
        const toDefaults = { autoAlpha: 1, scale: 1, y: 0, ...to };

        tl.fromTo(el, fromDefaults, { ...toDefaults, duration: inDur })
          .to(el, { autoAlpha: 1, duration: hold })
          .to(el, { autoAlpha: 0, scale: 0.98, y: -30, duration: outDur }, ">-0.06");
      };

      // Scenes à la Air
      scene(s1.current, { from: { scale: 0.92, y: 20 } });                    // 1. Claim
      scene(s2.current, { from: { y: 40, scale: 0.98 } });                     // 2. Subclaim
      scene(s3.current, { from: { autoAlpha: 0, scale: 0.98 }, to: { scale: 1 } }); // 3. Video fullscreen
      scene(s4.current, { from: { y: 50 }, to: { y: 0 } });                    // 4. Features

      // Laat laatste scene (CTA) staan
      tl.fromTo(
        s5.current,
        { autoAlpha: 0, scale: 0.98, y: 30 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.5 }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[400vh]">
      {/* sticky viewport (padding-top compenseert voor header, zodat content niet eronder kruipt) */}
      <div className="sticky top-0 h-screen overflow-hidden pt-20">
        {/* SCENE 1 — Claim */}
        <div ref={s1} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-brand-blue">Meer weten</span> = minder gokken
            </h1>
          </div>
        </div>

        {/* SCENE 2 — Subclaim */}
        <div ref={s2} className="absolute inset-0 grid place-items-center">
          <div className="text-center max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ontdek quick wins</h2>
            <p className="text-lg md:text-xl text-neutral-700 dark:text-gray-300">
              Voor je webshop of site dankzij <strong>Google Analytics 4</strong>, <strong>SEO</strong> en <strong>trend-research</strong>.
            </p>
          </div>
        </div>

        {/* SCENE 3 — Video fullscreen */}
        <div ref={s3} className="absolute inset-0">
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

        {/* SCENE 4 — Features (houd compact/clean zodat je layout herkenbaar blijft) */}
        <div ref={s4} className="absolute inset-0 grid place-items-center">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Feature title="GA4 & Consent Mode v2" desc="Betrouwbare metingen, ook met minder cookies." />
              <Feature title="UX / CRO"               desc="Van heuristiek tot tests: drempels weg, conversie omhoog." />
              <Feature title="SEO & Trends"           desc="Pak thema’s waar al vraag naar is. Snel zichtbaar, blijvend effect." />
            </div>
          </div>
        </div>

        {/* SCENE 5 — CTA (blijft staan aan het einde) */}
        <div ref={s5} className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Klaar om te starten?</h3>
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

function Feature({ title, desc }) {
  return (
    <div className="rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur p-6 border border-black/5 dark:border-white/10 shadow-sm">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-neutral-700 dark:text-gray-300">{desc}</p>
    </div>
  );
}
