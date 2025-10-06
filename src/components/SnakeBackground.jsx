import React from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Dunne puzzel-slang met brede zig-zag + nummers + scroll-reactive glow
 */
const SETTINGS = {
  // Branding / stijl
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"], // blauw, teal, geel
  OPACITY_CLASS: "opacity-10",               // subtiel zichtbaar
  TEXT_COLOR: "#0B1220",                     // donkere tekst in light
  TEXT_COLOR_DARK: "#E5E7EB",                // lichte tekst in dark (optioneel; zie BELOW_TEXT_COLOR)

  // Geometrie
  PIECE_SIZE: 28,
  ROUND: 8,
  GAP: 8,
  NUM_PIECES: 52,

  // Zig-zag / parallax
  AMP_X: 140,     // breedte van links↔rechts slinger
  AMP_Y: 18,      // mini verticale golf
  WAVE_FREQ: 0.9, // “kronkel” per stukje

  PHASE_SCROLL_RANGE: [0, 2200],        // input scroll
  PHASE_OUTPUT_RANGE: [0, Math.PI * 8], // aantal zig-zag cycli
  PARALLAX_RANGE: [0, 2200],
  PARALLAX_SHIFT: [0, 280],             // trager dan content naar beneden

  ROTATE_DEG: -10, // lichte diagonale hoek
  TOP_OFFSET_VH: 8,
  MAX_WIDTH: 1800,

  // Glow-instellingen (scroll-reactive)
  GLOW_COUNT: 5,          // hoeveel stukjes tegelijk oplichten bij beweging
  GLOW_DURATION_MS: 300,  // hoe lang ze gloeien
  GLOW_INTENSITY: 0.75,   // 0..1, schaal voor glow alpha
};

// Optioneel: detecteer dark mode om tekstkleur te kiezen
const isDarkMode = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

export default function SnakeBackground() {
  const { scrollY } = useScroll();

  // Fase van de golf (bepaalt richtingwissel links↔rechts)
  const phaseMV = useTransform(
    scrollY,
    SETTINGS.PHASE_SCROLL_RANGE,
    SETTINGS.PHASE_OUTPUT_RANGE
  );

  // Parallax verplaatsing omlaag
  const parallaxYMV = useTransform(
    scrollY,
    SETTINGS.PARALLAX_RANGE,
    SETTINGS.PARALLAX_SHIFT
  );

  // Houd de actuele waarden bij als plain state (voor berekeningen)
  const [phase, setPhase] = React.useState(0);
  const [parallaxY, setParallaxY] = React.useState(0);
  useMotionValueEvent(phaseMV, "change", (v) => setPhase(v));
  useMotionValueEvent(parallaxYMV, "change", (v) => setParallaxY(v));

  /**
   * Scroll-reactive glow:
   * - Wanneer scrollY verandert, kies willekeurig GLOW_COUNT indices
   * - Markeer die indices kort als "glowing"
   */
  const [glowingSet, setGlowingSet] = React.useState(new Set());
  const glowTimerRef = React.useRef(null);
  const lastScrollRef = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    // laat bij elk “merkbare” scrollverschil de glow afgaan
    const delta = Math.abs(current - lastScrollRef.current);
    lastScrollRef.current = current;

    // Optional throttle: alleen reageren bij >= 4px scroll
    if (delta < 4) return;

    // Kies willekeurige indices
    const count = Math.min(SETTINGS.GLOW_COUNT, SETTINGS.NUM_PIECES);
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * SETTINGS.NUM_PIECES));
    }
    setGlowingSet(indices);

    // Reset glow na korte duur
    if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
    glowTimerRef.current = setTimeout(() => {
      setGlowingSet(new Set());
    }, SETTINGS.GLOW_DURATION_MS);
  });

  React.useEffect(() => {
    return () => {
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
    };
  }, []);

  // Posities & nummers van stukjes
  const pieces = React.useMemo(() => {
    const arr = [];
    const S = SETTINGS.PIECE_SIZE;
    const G = SETTINGS.GAP;
    const step = S + G;

    for (let i = 0; i < SETTINGS.NUM_PIECES; i++) {
      // basis verticale positie
      const baseY = i * step;

      // mini-golf in Y
      const localY =
        baseY +
        Math.cos(phase * 0.6 + i * SETTINGS.WAVE_FREQ * 0.85) *
          SETTINGS.AMP_Y;

      // zig-zag links↔rechts
      const localX =
        i * (S * 0.15) +
        Math.sin(phase + i * SETTINGS.WAVE_FREQ) * SETTINGS.AMP_X;

      // nummer 1..9
      const num = (i % 9) + 1;

      arr.push({
        x: localX,
        y: localY,
        color: SETTINGS.COLORS[i % SETTINGS.COLORS.length],
        num,
      });
    }
    return arr;
  }, [phase]);

  // Breedte voor centreren
  const totalWidth = Math.min(
    (SETTINGS.PIECE_SIZE + SETTINGS.GAP) * SETTINGS.NUM_PIECES * 0.35 +
      SETTINGS.AMP_X * 2 +
      200,
    SETTINGS.MAX_WIDTH
  );

  // Tekstkleur afhankelijk van thema
  const BELOW_TEXT_COLOR = isDarkMode()
    ? SETTINGS.TEXT_COLOR_DARK
    : SETTINGS.TEXT_COLOR;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${SETTINGS.OPACITY_CLASS}`}
      aria-hidden="true"
      style={{
        transform: `translate3d(-50%, ${parallaxY}px, 0) rotate(${SETTINGS.ROTATE_DEG}deg)`,
        left: "50%",
        top: `${-SETTINGS.TOP_OFFSET_VH}vh`,
      }}
    >
      <div
        className="relative will-change-transform"
        style={{
          width: `${totalWidth}px`,
          height: `${
            (SETTINGS.PIECE_SIZE + SETTINGS.GAP) * (SETTINGS.NUM_PIECES / 2)
          }px`,
        }}
      >
        {pieces.map((p, i) => {
          const isGlowing = glowingSet.has(i);
          // Zachte glow via box-shadow (lichtgewicht) + iets grotere schaal
          const glowShadow = isGlowing
            ? `0 0 18px rgba(255,255,255,${SETTINGS.GLOW_INTENSITY})`
            : "0 0 0 rgba(0,0,0,0)";
          const scale = isGlowing ? 1.06 : 1;

          return (
            <div
              key={i}
              className="absolute will-change-transform"
              style={{
                transform: `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`,
                transition: "transform 180ms ease, box-shadow 180ms ease, color 180ms ease",
              }}
            >
              {/* puzzelblokje */}
              <div
                style={{
                  width: SETTINGS.PIECE_SIZE,
                  height: SETTINGS.PIECE_SIZE,
                  borderRadius: SETTINGS.ROUND,
                  background: p.color,
                  boxShadow: glowShadow,
                }}
              />

              {/* nummer in het midden */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: SETTINGS.PIECE_SIZE,
                  height: SETTINGS.PIECE_SIZE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: BELOW_TEXT_COLOR,
                  textShadow: isGlowing
                    ? "0 0 6px rgba(255,255,255,0.85)"
                    : "none",
                  transform: "translateZ(0)",
                }}
              >
                {p.num}
              </div>

              {/* subtiele nubs (boven/onder) */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: p.color,
                  opacity: 0.3,
                  position: "absolute",
                  left: SETTINGS.PIECE_SIZE / 2 - 4,
                  top: -6,
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: p.color,
                  opacity: 0.3,
                  position: "absolute",
                  left: SETTINGS.PIECE_SIZE / 2 - 4,
                  top: SETTINGS.PIECE_SIZE - 2,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
