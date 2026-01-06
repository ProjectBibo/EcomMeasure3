import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const heroStatement = ["Eerst begrijpen.", "Dan verbeteren."];

const manifestoSections = [
  {
    id: "over",
    label: "Over EcomMeasure",
    lines: [
      { id: "over-1", content: "EcomMeasure is ontstaan in Deventer." },
      {
        id: "over-2",
        content:
          "Niet omdat ik per se een bureau wilde beginnen, maar omdat ik steeds vaker zag dat teams beslissingen moesten nemen op basis van halve informatie — en dat eigenlijk normaal vonden.",
      },
      {
        id: "over-3",
        content:
          "Tijdens mijn opleiding Digital Marketing werkte ik met analytics, campagnes en optimalisatie.",
      },
      {
        id: "over-4",
        content: (
          <>
            Wat me opviel: bijna iedereen was bezig met <span className="micro-keyword">verbeteren</span>, maar lang niet iedereen wist waarom iets werkte of juist niet.
          </>
        ),
      },
      { id: "over-5", content: "Soms was de meting niet op orde." },
      { id: "over-6", content: "Soms was er wél data, maar geen richting." },
      {
        id: "over-7",
        content:
          "En soms werden CRO-beslissingen genomen zonder context, gewoon omdat “het logisch leek”.",
      },
      { id: "over-8", content: "Dat kan beter." },
    ],
  },
  {
    id: "begin",
    label: "Hoe dit begon",
    lines: [
      {
        id: "begin-1",
        content:
          "Ik begon EcomMeasure omdat ik merkte dat analytics en CRO vaak los van elkaar worden ingezet, terwijl ze elkaar juist moeten versterken.",
      },
      { id: "begin-2", content: "Meten zonder verbeteren levert weinig op." },
      { id: "begin-3", content: "Optimaliseren zonder inzicht nog minder." },
      { id: "begin-4", content: "Sommige teams hebben hun metingen nog niet goed ingericht." },
      {
        id: "begin-5",
        content: "Andere teams meten al jaren, maar halen er nauwelijks concrete acties uit.",
      },
      {
        id: "begin-6",
        content:
          "In beide gevallen ontbreekt hetzelfde: helder inzicht in wat er gebeurt en wat dat betekent voor de volgende stap.",
      },
      {
        id: "begin-7",
        content: "Daarom richt EcomMeasure zich niet op één discipline, maar op de combinatie.",
      },
    ],
  },
  {
    id: "duet",
    label: "Analytics én CRO, in samenhang",
    lines: [
      {
        id: "duet-1",
        content: (
          <>
            Bij EcomMeasure werken we aan twee dingen tegelijk: <span className="micro-keyword">inzicht</span> en <span className="micro-keyword">verbetering</span>.
          </>
        ),
      },
      {
        id: "duet-2",
        content:
          "We helpen teams hun metingen op orde te brengen — of te controleren — zodat duidelijk is wat gebruikers doen, waar ze afhaken en welke stappen in de funnel aandacht verdienen.",
      },
      { id: "duet-3", content: "Tegelijk kijken we naar de website zelf: UX, content, flows en interacties." },
      { id: "duet-4", content: "Wat zien gebruikers?" },
      { id: "duet-5", content: "Wat verwachten ze?" },
      { id: "duet-6", content: "En waar ontstaat frictie?" },
      { id: "duet-7", content: "Soms begint dat bij analytics." },
      { id: "duet-8", content: "Soms juist bij een UX-review of gedragsanalyse." },
      { id: "duet-9", content: "De volgorde hangt af van de situatie, niet van een vast stappenplan." },
    ],
  },
  {
    id: "keuzes",
    label: "Onderbouwde keuzes boven aannames",
    lines: [
      {
        id: "keuzes-1",
        content:
          "CRO draait niet om zoveel mogelijk wijzigingen doorvoeren, maar om betere keuzes maken.",
      },
      {
        id: "keuzes-2",
        content: (
          <>
            Bij EcomMeasure combineren we <span className="micro-keyword">gedragsanalyse</span>, UX-inzichten en data om verbeteringen te onderbouwen.
          </>
        ),
      },
      {
        id: "keuzes-3",
        content:
          "Dat kan leiden tot concrete optimalisaties, maar ook tot het loslaten van ideeën die op papier logisch klonken, maar in de praktijk weinig toevoegen.",
      },
      { id: "keuzes-4", content: "Dat is geen stap terug — dat is richting." },
    ],
  },
  {
    id: "team",
    label: "Waarom dit geen klassiek ZZP-verhaal is",
    lines: [
      {
        id: "team-1",
        content: "Hoewel ik EcomMeasure zelf heb opgezet, is het bewust geen one-man-show voor altijd.",
      },
      { id: "team-2", content: "Goede digitale ervaringen ontstaan op het snijvlak van data, UX en techniek." },
      {
        id: "team-3",
        content:
          "Daarom is EcomMeasure opgezet met de ambitie om uit te groeien tot een klein, inhoudelijk sterk team.",
      },
      { id: "team-4", content: "Geen productieband, geen ruis, geen lagen." },
      { id: "team-5", content: "Wel mensen die weten wat ze doen en elkaar aanvullen." },
      { id: "team-6", content: "Klein genoeg om scherp te blijven." },
      { id: "team-7", content: "Groot genoeg om kwaliteit te leveren." },
    ],
  },
  {
    id: "voor-wie",
    label: "Voor wie EcomMeasure werkt",
    lines: [
      { id: "wie-1", content: "EcomMeasure werkt voor e-commerce teams die:" },
      { id: "wie-2", content: "• betere beslissingen willen nemen over hun website" },
      { id: "wie-3", content: "• inzicht zoeken in gedrag, niet alleen cijfers" },
      { id: "wie-4", content: "• analytics en CRO niet los zien, maar als één geheel" },
      { id: "wie-5", content: "Niet voor wie snel iets wil proberen zonder richting." },
      { id: "wie-6", content: "Wel voor teams die willen begrijpen waar verbetering nodig is — en waarom." },
      { id: "wie-7", content: "EcomMeasure staat nog aan het begin." },
      { id: "wie-8", content: "Maar de manier van werken is helder:" },
      {
        id: "wie-9",
        content: (
          <strong className="micro-keyword">inzicht en verbetering horen bij elkaar. En daar nemen we de tijd voor.</strong>
        ),
      },
    ],
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function About() {
  const { language } = useLanguage();
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const lineRefs = useRef([]);
  const activeLineRef = useRef(0);
  const [activeLine, setActiveLine] = useState(0);
  const [heroScale, setHeroScale] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const sections = useMemo(() => {
    let counter = 0;
    return manifestoSections.map((section) => ({
      ...section,
      lines: section.lines.map((line) => ({ ...line, globalIndex: counter++ })),
    }));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const hero = heroRef.current;
    if (!hero) return undefined;
    let frame = null;

    const handleMove = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty("--hero-tilt-x", `${clamp(relX * 12, -10, 10)}px`);
        hero.style.setProperty("--hero-tilt-y", `${clamp(relY * 12, -10, 10)}px`);
      });
    };

    const handleLeave = () => {
      hero.style.setProperty("--hero-tilt-x", "0px");
      hero.style.setProperty("--hero-tilt-y", "0px");
    };

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", handleLeave);
    return () => {
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    let ticking = false;

    const updateStates = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const heroHeight = heroRef.current?.offsetHeight || 1;
      const heroProgress = clamp(scrollY / (heroHeight * 0.9), 0, 1);
      setHeroScale(1 - heroProgress * 0.12);
      setHeroOpacity(1 - heroProgress * 0.55);

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = activeLineRef.current;
      let smallestDistance = Number.POSITIVE_INFINITY;

      lineRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - center);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeLineRef.current) {
        activeLineRef.current = closestIndex;
        setActiveLine(closestIndex);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateStates);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateStates();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return undefined;
    setHeroScale(1);
    setHeroOpacity(1);
    activeLineRef.current = -1;
    setActiveLine(-1);
    setScrollProgress(0);
    return undefined;
  }, [reduceMotion]);

  return (
    <>
      <SEO
        title={language === "en" ? "About EcomMeasure" : "Over EcomMeasure"}
        description={
          language === "en"
            ? "A kinetic manifesto about measurement and improvement."
            : "Een kinetisch manifest over inzicht en verbetering."
        }
      />
      <main className="relative isolate overflow-hidden bg-[#0b1220] text-white">
        <div className="progress-rail about-progress" aria-hidden>
          <span className="progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />
        </div>

        <section
          ref={heroRef}
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-16"
          style={{ "--hero-tilt-x": "0px", "--hero-tilt-y": "0px" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
            <div className="glow-orb about-orb" />
            <div className="glow-orb about-orb-secondary" />
          </div>
          <div
            className="relative max-w-6xl text-center"
            style={{
              transform: reduceMotion
                ? "none"
                : `translate3d(var(--hero-tilt-x), var(--hero-tilt-y), 0) scale(${heroScale})`,
              opacity: heroOpacity,
              transition: reduceMotion
                ? "none"
                : "transform 360ms var(--motion-ease-emphasized), opacity 360ms var(--motion-ease-emphasized)",
            }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">Kinetic Manifesto</p>
            <div className="mt-6 flex flex-col gap-2 text-[12vw] font-black leading-[0.95] tracking-tight sm:text-[10vw]">
              {heroStatement.map((line) => (
                <span key={line} className="block drop-shadow-[0_18px_38px_rgba(0,0,0,0.35)]">
                  {line}
                </span>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="h-8 w-px animate-pulse-slow bg-white/50" aria-hidden />
          </div>
        </section>

        <section ref={storyRef} className="relative bg-[#0b1220] px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            {sections.map((section) => (
              <article key={section.id} className="space-y-5">
                <div className="sticky top-10 z-10 flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-white/45">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 font-semibold text-white/70">
                    {section.label.split(" ")[0].charAt(0)}
                  </span>
                  <span className="backdrop-blur-sm">{section.label}</span>
                </div>
                <div className="space-y-3 rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
                  {section.lines.map((line) => {
                    const distance = activeLine < 0 ? 0 : Math.abs(activeLine - line.globalIndex);
                    const opacity = activeLine < 0 ? 1 : distance === 0 ? 1 : distance === 1 ? 0.65 : 0.45;
                    const translateY = activeLine < 0 ? 0 : clamp(distance * 2, 0, 8);
                    return (
                      <p
                        key={line.id}
                        ref={(el) => {
                          lineRefs.current[line.globalIndex] = el;
                        }}
                        className="about-line text-lg leading-relaxed text-white/80 sm:text-xl"
                        style={{
                          opacity,
                          transform: reduceMotion ? "none" : `translateY(${translateY}px)`,
                          transition: reduceMotion
                            ? "opacity 120ms linear"
                            : "opacity 240ms var(--motion-ease-standard), transform 260ms var(--motion-ease-standard)",
                        }}
                      >
                        {line.content}
                      </p>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative bg-[#0b1220] px-6 pb-28 pt-10 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.04] p-10 text-center shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">Verder praten</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Plan een gratis adviesgesprek
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Rustig tempo, scherpe vragen, directe inzichten. Geen druk, wel richting.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/#contact"
                data-variant="primary"
                className="rounded-full bg-brand-yellow px-7 py-3 text-base font-semibold text-neutral-900 shadow-[0_20px_45px_rgba(255,204,2,0.35)] transition-colors duration-200 hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                Plan een gratis adviesgesprek
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .about-progress {
          position: fixed;
          inset: 0 auto auto 0;
          z-index: 20;
          height: 3px;
          background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
        }

        .about-orb {
          width: 420px;
          height: 420px;
          top: 12%;
          left: 14%;
          opacity: 0.35;
          background: radial-gradient(circle at 50% 50%, rgba(31, 111, 235, 0.26), transparent 60%);
        }

        .about-orb-secondary {
          width: 420px;
          height: 420px;
          bottom: 6%;
          right: 10%;
          opacity: 0.22;
          background: radial-gradient(circle at 40% 50%, rgba(24, 79, 158, 0.24), transparent 60%);
        }

        .about-line strong {
          font-weight: 800;
          letter-spacing: 0.01em;
        }

        .micro-keyword {
          position: relative;
          display: inline-block;
        }

        @media (hover: hover) and (pointer: fine) {
          .micro-keyword::after {
            content: "";
            position: absolute;
            inset: 65% 0 -6px 0;
            background: linear-gradient(90deg, rgba(255, 204, 2, 0.2), rgba(31, 111, 235, 0.2));
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 220ms var(--motion-ease-standard);
          }

          .micro-keyword:hover::after {
            transform: scaleX(1);
          }

          .micro-keyword:hover {
            letter-spacing: 0.01em;
            font-variation-settings: "wght" 640;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-progress {
            display: none;
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 1800ms ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
