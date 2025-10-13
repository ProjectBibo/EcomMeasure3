import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function HorizontalScrollShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].showcase;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["center center", "end center"],
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 768px)");
    const update = (event) => {
      setIsMobile(event.matches);
    };
    update(media);
    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  const enableHorizontalScroll = !shouldReduceMotion && !isMobile;

  const maxDistance = useMemo(
    () => -100 * Math.max(t.scenes.length - 1, 0),
    [t.scenes.length]
  );

  const x = useTransform(scrollYProgress, (value) => {
    if (!enableHorizontalScroll) {
      return "0%";
    }

    const startThreshold = 0.18;
    const normalised = Math.min(
      Math.max((value - startThreshold) / (1 - startThreshold), 0),
      1
    );

    const distance = normalised * maxDistance;
    return `${distance}%`;
  });

  const sectionHeight = useMemo(() => 140 + t.scenes.length * 50, [t.scenes.length]);

  const renderScene = (scene) => (
    <article
      key={scene.title}
      className="group relative flex w-full flex-shrink-0 flex-col justify-between rounded-[2.5rem] border border-white/60 bg-white/55 p-8 shadow-[12px_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-transform duration-500 dark:border-white/10 dark:bg-white/5 dark:shadow-[12px_24px_60px_rgba(2,6,23,0.45)]"
    >
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/50 via-white/10 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10 dark:via-white/5 dark:to-white/0" aria-hidden />
      <div className="relative flex flex-col gap-4">
        <span className="inline-flex w-max items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm dark:bg-white/10 dark:text-gray-200">
          {scene.eyebrow}
        </span>
        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">{scene.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{scene.description}</p>
      </div>
      <div className="relative mt-10">
        <div className="inline-flex flex-col items-start gap-1 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-teal px-4 py-3 text-white shadow-[0_16px_35px_rgba(15,23,42,0.18)] dark:shadow-[0_18px_40px_rgba(2,6,23,0.6)]">
          <span className="text-3xl font-bold">{scene.stat}</span>
          <span className="text-[11px] uppercase tracking-[0.24em] text-white/80">{scene.sub}</span>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-[1px] rounded-[2.6rem] shadow-[inset_2px_2px_6px_rgba(255,255,255,0.65),inset_-4px_-12px_24px_rgba(148,163,184,0.25)] transition-opacity duration-500 group-hover:opacity-100 dark:shadow-[inset_2px_2px_5px_rgba(255,255,255,0.12),inset_-6px_-12px_20px_rgba(8,47,73,0.35)]" aria-hidden />
    </article>
  );

  return (
    <section
      ref={sectionRef}
      data-snap-section
      style={enableHorizontalScroll ? { height: `${sectionHeight}vh` } : undefined}
      className="relative bg-gradient-to-b from-white/40 via-white/30 to-white/40 py-20 dark:from-surface-dark/80 dark:via-surface-dark/70 dark:to-surface-dark/80 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-brand-blue/10 via-transparent to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-teal/10 via-transparent to-transparent pointer-events-none" aria-hidden />
      {enableHorizontalScroll ? (
        <div className="sticky top-[calc(var(--header-offset)/2)] flex h-[calc(100vh-6rem)] items-center">
          <div className="relative w-full overflow-hidden">
            <motion.div style={{ x }} className="flex gap-8 pr-8 will-change-transform">
              {t.scenes.map((scene) => (
                <div key={scene.title} className="w-[min(85vw,28rem)] flex-shrink-0 snap-center">
                  {renderScene(scene)}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ) : shouldReduceMotion ? (
        <div className="relative mx-auto w-full max-w-5xl overflow-x-auto pb-6">
          <div className="flex gap-6">
            {t.scenes.map((scene) => (
              <div key={scene.title} className="min-w-[260px] flex-1">
                {renderScene(scene)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mx-auto grid w-full max-w-4xl gap-6">
          {t.scenes.map((scene) => renderScene(scene))}
        </div>
      )}
    </section>
  );
}
