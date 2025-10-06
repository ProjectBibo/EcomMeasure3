import React from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Doelen:
 * - Dunne puzzel-slang
 * - Echte zig-zag: links↔rechts terwijl hij meebeweegt naar beneden op scroll
 * - Performance: alleen CSS transforms, geen filters of per-item animatielussen
 */
const SETTINGS = {
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"], // brandkleuren
  OPACITY_CLASS: "opacity-10",               // zachter/doorzichtig (pas aan naar smaak)
  PIECE_SIZE: 30,                             // blokjes klein & strak
  ROUND: 8,                                   // afronding
  GAP: 10,                                    // afstand tussen blokjes
  NUM_PIECES: 36,                             // lengte van de slang
  // golf-parameters
  AMP_X: 60,          // links-rechts uitslag (groter = bredere zigzag)
  AMP_Y: 18,          // verticale micro-golf binnen de slang
  WAVE_FREQ: 0.9,     // hoe kronkelig (faseverschuiving per blokje)
  // scroll→fase mapping
  PHASE_SCROLL_RANGE: [0, 2200],           // scroll input (px)
  PHASE_OUTPUT_RANGE: [0, Math.PI * 8],    // aantal zig-zag cycli over de pagina
  // parallax van de hele slang
  PARALLAX_RANGE: [0, 2200],  // scroll input
  PARALLAX_SHIFT: [0, 280],   // langzamer dan de content naar beneden
  // wrapper
  ROTATE_DEG: -10,     // lichte diagonale hoek
  TOP_OFFSET_VH: 8,    // start iets onder de top (in vh)
  MAX_WIDTH: 1400,     // maximale visuele breedte van de slang
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

  // We willen de numerieke waarde van phase/parallax in JS kunnen gebruiken
  const [phase, setPhase] = React.useState(0);
  const [parallaxY, setParallaxY] = React.useState(0);
  useMotionValueEvent(phaseMV, "change", (v) => setPhase(v));
  useMotionValueEvent(parallaxYMV, "change", (v) => setParallaxY(v));

  // Vooraf posities uitrekenen
  const pieces = React.useMemo(() => {
    const arr = [];
    const S = SETTINGS.PIECE_SIZE;
    const G = SETTINGS.GAP;
    const step = S + G;

    for (let i = 0; i < SETTINGS.NUM_PIECES; i++) {
      // basis “ruggengraat” (y) + micro-golf (AMP_Y)
      const baseY = i * step;
      const localY = baseY + Math.cos(phase * 0.6 + i * SETTINGS.WAVE_FREQ * 0.85) * SETTINGS.AMP_Y;

      // zig-zag links↔rechts (AMP_X) — ECHTE richtingwissel bij scroll
      const localX = i * (S * 0.15) + Math.sin(phase + i * SETTINGS.WAVE_FREQ) * SETTINGS.AMP_X;

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
          height: `${(SETTINGS.PIECE_SIZE + SETTINGS.GAP) * (SETTINGS.NUM_PIECES / 2)}px`,
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
                boxShadow: "0 0 0 rgba(0,0,0,0)", // geen filter, max performance
              }}
            />
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
        ))}
      </div>
    </div>
  );
}
