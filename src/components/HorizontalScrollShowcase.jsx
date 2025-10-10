import React, { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const scenes = [
  {
    eyebrow: "Story beat",
    title: "Je metrics worden een walkthrough",
    description:
      "Vanuit een sticky navigatie zoomt de bezoeker horizontaal door de belangrijkste cijfers. Elk paneel bouwt voort op het vorige.",
    stat: "3x langer",
    sub: "gemiddelde tijd op de pagina",
    accent: "from-brand-blue via-brand-teal to-brand-yellow",
  },
  {
    eyebrow: "Glass CTA",
    title: "Glasheldere call-to-action",
    description:
      "Glassmorphism zorgt voor focus zonder de achtergrond te blokkeren. Het voelt alsof je door het verhaal heen klikt.",
    stat: "+18%",
    sub: "meer interacties met primaire CTA",
    accent: "from-brand-teal via-brand-blue to-brand-yellow",
  },
  {
    eyebrow: "Micro-transitie",
    title: "Schaduw geeft tastbare feedback",
    description:
      "Neomorfe knoppen krijgen een subtiele drukanimatie wanneer je scrollt of klikt. Daardoor voelt de interface responsief.",
    stat: "94%",
    sub: "positieve feedback in gebruikerstests",
    accent: "from-brand-yellow via-brand-blue to-brand-teal",
  },
  {
    eyebrow: "Pilot",
    title: "Van inspiratie naar conversie",
    description:
      "De horizontale flow eindigt in een pilot-aanvraag. Lazy loading zorgt dat alles licht en snel blijft terwijl je scrolt.",
    stat: ">40%",
    sub: "bezoekers vragen een gesprek aan",
    accent: "from-brand-blue via-brand-yellow to-brand-teal",
  },
];

export default function HorizontalScrollShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const maxDistance = useMemo(
    () => -100 * Math.max(scenes.length - 1, 0),
    [scenes.length]
  );

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${maxDistance}%`]);

  return (
    <section
      ref={sectionRef}
      data-snap-section
      className="relative h-[240vh] bg-gradient-to-b from-white/40 via-white/30 to-white/40 dark:from-surface-dark/80 dark:via-surface-dark/70 dark:to-surface-dark/80"
    >
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-brand-blue/10 via-transparent to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-teal/10 via-transparent to-transparent pointer-events-none" aria-hidden />
      <div
        className={`sticky top-[calc(var(--header-offset)/2)] flex h-[calc(100vh-6rem)] items-center`}
      >
        <div
          className={`relative w-full ${
            shouldReduceMotion
              ? "overflow-x-auto snap-x snap-mandatory"
              : "overflow-hidden"
          }`}
        >
          <motion.div
            style={shouldReduceMotion ? undefined : { x }}
            className="flex gap-8 pr-8 will-change-transform"
          >
            {scenes.map((scene) => (
              <article
                key={scene.title}
                className="group relative flex w-[min(85vw,28rem)] flex-shrink-0 flex-col justify-between rounded-[2.5rem] border border-white/60 bg-white/55 p-8 shadow-[12px_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-transform duration-500 snap-center dark:border-white/10 dark:bg-white/5 dark:shadow-[12px_24px_60px_rgba(2,6,23,0.45)]"
              >
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/50 via-white/10 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10 dark:via-white/5 dark:to-white/0" aria-hidden />
                <div className="relative flex flex-col gap-4">
                  <span className="inline-flex w-max items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm dark:bg-white/10 dark:text-gray-200">
                    {scene.eyebrow}
                  </span>
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    {scene.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                    {scene.description}
                  </p>
                </div>
                <div className="relative mt-10">
                  <div className={`inline-flex flex-col items-start gap-1 rounded-2xl bg-gradient-to-br ${scene.accent} px-4 py-3 text-white shadow-[0_16px_35px_rgba(15,23,42,0.18)] dark:shadow-[0_18px_40px_rgba(2,6,23,0.6)]`}>
                    <span className="text-3xl font-bold">{scene.stat}</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/80">
                      {scene.sub}
                    </span>
                  </div>
                </div>
                <div className="pointer-events-none absolute -inset-[1px] rounded-[2.6rem] shadow-[inset_2px_2px_6px_rgba(255,255,255,0.65),inset_-4px_-12px_24px_rgba(148,163,184,0.25)] transition-opacity duration-500 group-hover:opacity-100 dark:shadow-[inset_2px_2px_5px_rgba(255,255,255,0.12),inset_-6px_-12px_20px_rgba(8,47,73,0.35)]" aria-hidden />
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
