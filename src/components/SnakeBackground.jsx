import React from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Dunne puzzel-slang met brede zig-zag
 * - Meer stukjes (voller)
 * - Kleine blokjes + kleine gap voor strakke ketting
 * - Parallax + zigzag op scroll
 * - Performant: alleen GPU-transforms
 */
const SETTINGS = {
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"], // brandkleuren
  OPACITY_CLASS: "opacity-10",               // zachter/doorzichtig
  PIECE_SIZE: 28,                             // 🔹 iets kleiner
  ROUND: 8,                                   // afronding
  GAP: 8,                                     // 🔹 iets minder ruimte
  NUM_PIECES: 52,                             // 🔹 meer blokjes (voller)

  AMP_X: 140,         // brede zigzag (links↔rechts uitslag)
  AMP_Y: 18,          // verticale micro-golf
  WAVE_FREQ: 0.9,     // hoe kronkelig de slang is

  PHASE_SCROLL_RANGE: [0, 2200],           // scroll input
  PHASE_OUTPUT_RANGE: [0, Math.PI * 8],    // aantal zig-zag cycli

  PARALLAX_RANGE: [0, 2200],  // scroll input
  PARALLAX_SHIFT: [0, 280],   // langzamer dan de content naar beneden

  ROTATE_DEG: -10,     // lichte diagonale hoek
  TOP_OFFSET_VH: 8,    // start iets onder de top (in vh)
  MAX_WIDTH: 1800,     // iets ruimer voor langere slang
};

export default function SnakeBackground() {
  const { scrollY } = useScroll();

  // Fase verandert met scroll → bepaalt zig-zag richting & snelheid
  const phaseMV = useTransform(
    scrollY,
    SETTINGS.PHASE_SCROLL_RANGE,
    SETTINGS.PHASE_OUTPUT_RANGE
  );

  // Parallax van de hele slang (naar beneden, trager dan de content)
  const parallaxYMV = useTransform(
    scrollY,
    SETTINGS.PARALLAX_RANGE,
    SETTINGS.PARALLAX_SHIFT
  );

  // Huidige waarden van phase & parallax opslaan
  const [phase, setPhase] = React.useState(0);
  const [parallaxY, setParallaxY] = React.useState(0);
  useMotionValueEvent(phaseMV, "change", (v) => setPhase(v));
  useMotionValueEvent(parallaxYMV, "change", (v) => setParallaxY(v));

  // Posities van de puzzelblokjes berekenen
  const pieces = React.useMemo(() => {
    const arr = [];
    const S = SETTINGS.PIECE_SIZE;
    const G = SETTINGS.GAP;
    const step = S + G;

    for (let i = 0; i < SETTINGS.NUM_PIECES; i++) {
      // basis verticale positie
      const baseY = i * step;

      // micro-golf
      const localY =
        baseY +
        Math.cos(phase * 0.6 + i * SETTINGS.WAVE_FREQ * 0.85) *
          SETTINGS.AMP_Y;

      // zig-zag horizontaal (links↔rechts)
      const localX =
        i * (S * 0.15) +
        Math.sin(phase + i * SETTINGS.WAVE_FREQ) * SETTINGS.AMP_X;

      arr.push({
        x: localX,
        y: localY,
        color: SETTINGS.COLORS[i % SETTINGS.COLORS.length],
      });
    }
    return arr;
  }, [phase]);

  // Totale breedte (voor centreren)
  const totalWidth =
    Math.min(
      (SETTINGS.PIECE_SIZE + SETTINGS.GAP) * SETTINGS.NUM_PIECES * 0.35 +
        SETTINGS.AMP_X * 2 +
        200,
      SETTINGS.MAX_WIDTH
    );

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${SETTINGS.OPACITY_CLASS}`}
      aria-hidden="true"
      style={{
        transform: `translate3d(-50%, ${parallaxY}px, 0) rotate(${SETTINGS.ROTATE_DEG}deg)`,
        position: "fixed",
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
        {pieces.map((p, i) => (
          <div
            key={i}
            className="absolute will-change-transform"
            style={{
              transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            }}
          >
            {/* puzzelblokje */}
            <div
              style={{
                width: SETTINGS.PIECE_SIZE,
                height: SETTINGS.PIECE_SIZE,
                borderRadius: SETTINGS.ROUND,
                background: p.color,
              }}
            />
            {/* subtiele nubs */}
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
        ))}
      </div>
    </div>
  );
}
