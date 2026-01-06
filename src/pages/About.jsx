import React, { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

const heroContent = {
  heading: "Over EcomMeasure",
  paragraphs: [
    "EcomMeasure is ontstaan in Deventer. Niet omdat ik per se een bureau wilde beginnen, maar omdat ik steeds vaker zag dat teams beslissingen moesten nemen op basis van halve informatie — en dat eigenlijk normaal vonden.",
    "Tijdens mijn opleiding Digital Marketing werkte ik met analytics, campagnes en optimalisatie. Wat me opviel: bijna iedereen was bezig met verbeteren, maar lang niet iedereen wist waarom iets werkte of juist niet. Soms was de meting niet op orde. Soms was er wél data, maar geen richting. En soms werden CRO-beslissingen genomen zonder context, gewoon omdat “het logisch leek”.",
    "Dat kan beter.",
  ],
};

const sections = [
  {
    id: "hoe-dit-begon",
    heading: "Hoe dit begon",
    paragraphs: [
      "Ik begon EcomMeasure omdat ik merkte dat analytics en CRO vaak los van elkaar worden ingezet, terwijl ze elkaar juist moeten versterken. Meten zonder verbeteren levert weinig op. Optimaliseren zonder inzicht nog minder.",
      "Sommige teams hebben hun metingen nog niet goed ingericht. Andere teams meten al jaren, maar halen er nauwelijks concrete acties uit. In beide gevallen ontbreekt hetzelfde: helder inzicht in wat er gebeurt en wat dat betekent voor de volgende stap.",
      "Daarom richt EcomMeasure zich niet op één discipline, maar op de combinatie.",
    ],
  },
  {
    id: "analytics-en-cro",
    heading: "Analytics én CRO, in samenhang",
    paragraphs: [
      "Bij EcomMeasure werken we aan twee dingen tegelijk: inzicht en verbetering.",
      "We helpen teams hun metingen op orde te brengen — of te controleren — zodat duidelijk is wat gebruikers doen, waar ze afhaken en welke stappen in de funnel aandacht verdienen. Tegelijk kijken we naar de website zelf: UX, content, flows en interacties. Wat zien gebruikers? Wat verwachten ze? En waar ontstaat frictie?",
      "Soms begint dat bij analytics.",
      "Soms juist bij een UX-review of gedragsanalyse.",
      "De volgorde hangt af van de situatie, niet van een vast stappenplan.",
    ],
  },
  {
    id: "geen-aannames",
    heading: "Geen aannames, geen testfabriek",
    paragraphs: [
      "CRO is geen wedstrijdje “wie het meeste test”. Het is een manier om betere keuzes te maken.",
      "Bij EcomMeasure werken we met gedragsanalyse, UX-insights en data om verbeteringen te onderbouwen. Dat kan leiden tot optimalisaties, maar ook tot het schrappen van ideeën die op papier goed klonken, maar in de praktijk weinig toevoegen. Dat is geen verlies — dat is vooruitgang.",
    ],
  },
  {
    id: "geen-klassiek-zzp-verhaal",
    heading: "Waarom dit geen klassiek ZZP-verhaal is",
    paragraphs: [
      "Hoewel ik EcomMeasure zelf heb opgezet, is het bewust geen one-man-show voor altijd.",
      "Goede digitale ervaringen ontstaan op het snijvlak van data, UX en techniek. Daarom is EcomMeasure opgezet met de ambitie om uit te groeien tot een klein, inhoudelijk sterk team. Geen productieband, geen ruis, geen lagen. Wel mensen die weten wat ze doen en elkaar aanvullen.",
      "Klein genoeg om scherp te blijven. Groot genoeg om kwaliteit te leveren.",
    ],
  },
  {
    id: "voor-wie",
    heading: "Voor wie EcomMeasure werkt",
    paragraphs: [
      "EcomMeasure werkt voor e-commerce teams die:",
      "* betere beslissingen willen nemen over hun website",
      "* inzicht zoeken in gedrag, niet alleen cijfers",
      "* analytics en CRO niet los zien, maar als één geheel",
      "Niet voor wie snel iets wil “testen omdat het kan”.",
      "Wel voor teams die willen begrijpen waar verbetering nodig is — en waarom.",
      "EcomMeasure staat nog aan het begin.",
      "Maar de manier van werken is helder:",
      "inzicht en verbetering horen bij elkaar. En daar nemen we de tijd voor.",
    ],
  },
];

export default function About() {
  const [progress, setProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const contentRef = useRef(null);
  const sectionRefs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!contentRef.current) return undefined;

    const handleProgress = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const contentTop = window.scrollY + rect.top;
      const contentHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const maxScrollable = contentHeight - viewportHeight;

      if (maxScrollable <= 0) {
        setProgress(100);
        return;
      }

      const scrolled = window.scrollY - contentTop;
      const nextProgress = Math.min(Math.max((scrolled / maxScrollable) * 100, 0), 100);
      setProgress(nextProgress);
    };

    const handleScroll = () => requestAnimationFrame(handleProgress);
    handleProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleProgress);
    };
  }, []);

  useEffect(() => {
    if (!sectionRefs.current.length) return undefined;

    if (prefersReducedMotion) {
      const initialVisibility = sectionRefs.current.reduce((acc, ref) => {
        if (ref?.dataset?.sectionId) {
          acc[ref.dataset.sectionId] = true;
        }
        return acc;
      }, {});
      setVisibleSections(initialVisibility);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target, isIntersecting } = entry;
          const sectionId = target.dataset.sectionId;
          if (isIntersecting && sectionId) {
            setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <>
      <SEO title="Over EcomMeasure" description="De achtergrond en werkwijze van EcomMeasure." />
      <div className="about-page relative min-h-screen bg-surface-light">
        <div className="about-progress" aria-hidden>
          <div className="about-progress__bar" style={{ width: `${progress}%` }} />
        </div>

        <main ref={contentRef} className="px-6 pb-20 pt-16 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-14">
            <header
              ref={(node) => {
                sectionRefs.current[0] = node;
              }}
              data-section-id="hero"
              className={`about-section space-y-5 rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur ${
                visibleSections.hero ? "is-visible" : ""
              }`}
            >
              <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue shadow-sm">
                {heroContent.heading}
              </div>
              <h1 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">{heroContent.heading}</h1>
              <div className="space-y-4 text-lg leading-8 text-neutral-800">
                {heroContent.paragraphs.map((paragraph, index) => (
                  <p key={`hero-${index}`} className="max-w-2xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            </header>

            <section className="space-y-12">
              {sections.map((section, index) => (
                <article
                  key={section.id}
                  ref={(node) => {
                    sectionRefs.current[index + 1] = node;
                  }}
                  data-section-id={section.id}
                  className={`about-section rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur ${
                    visibleSections[section.id] ? "is-visible" : ""
                  }`}
                >
                  <h2 className="text-2xl font-semibold leading-tight text-neutral-900">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-lg leading-8 text-neutral-800">
                    {section.paragraphs.map((paragraph, paragraphIndex) => {
                      const isListItem = paragraph.trim().startsWith("*");
                      if (isListItem) {
                        const listItems = section.paragraphs
                          .slice(paragraphIndex)
                          .filter((item) => item.trim().startsWith("*"))
                          .map((item) => item.replace(/^\*\s*/, ""));

                        if (paragraphIndex === section.paragraphs.findIndex((item) => item.trim().startsWith("*"))) {
                          return (
                            <ul key={`${section.id}-list`} className="list-disc space-y-2 pl-6">
                              {listItems.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          );
                        }

                        return null;
                      }

                      return (
                        <p key={`${section.id}-${paragraphIndex}`} className="max-w-2xl">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </article>
              ))}
            </section>

            <section
              ref={(node) => {
                sectionRefs.current[sections.length + 1] = node;
              }}
              data-section-id="cta"
              className={`about-section rounded-2xl border border-neutral-200 bg-neutral-900 px-8 py-10 text-white shadow-sm transition-colors ${
                visibleSections.cta ? "is-visible" : ""
              }`}
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold leading-tight">Plan een gratis adviesgesprek</h2>
                <p className="text-lg leading-8 text-white/80">
                  Bespreek de volgende stap voor je e-commerce groei. Geen verkooppraat, wel concreet advies.
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="/#contact"
                  className="button-primary inline-flex items-center justify-center gap-2"
                >
                  Plan een gratis adviesgesprek
                </a>
              </div>
            </section>
          </div>
        </main>

        <style>{`
          .about-page {
            position: relative;
          }

          .about-progress {
            position: fixed;
            inset: 0 0 auto 0;
            height: 4px;
            background: linear-gradient(90deg, rgba(15,23,42,0.08), rgba(15,23,42,0.04));
            z-index: 50;
            overflow: hidden;
            pointer-events: none;
          }

          .about-progress__bar {
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, #1f6feb, #3b82f6);
            transform-origin: left;
            transition: width 160ms ease-out;
          }

          .about-section {
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 320ms ease, transform 340ms ease;
            will-change: opacity, transform;
          }

          .about-section.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          @media (prefers-reduced-motion: reduce) {
            .about-progress__bar {
              transition: none;
            }

            .about-section {
              opacity: 1;
              transform: none;
              transition: none;
            }
          }
        `}</style>
      </div>
    </>
  );
}
