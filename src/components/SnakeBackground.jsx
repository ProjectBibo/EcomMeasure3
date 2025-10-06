import React from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Dunne puzzel-slang met brede zig-zag — EXTENDED + cijfers in elk stukje
 * - Veel stukjes (lange animatie)
 * - Elk stukje toont een random cijfer (0–9), stabiel per stukje
 * - Tekstkleur: donker in light mode, licht in dark mode
 */
const SETTINGS = {
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"],
  OPACITY_CLASS: "opacity-10",
  PIECE_SIZE: 28,
  ROUND: 8,
  GAP: 8,

  NUM_PIECES: 140,

  AMP_X: 140,
  AMP_Y: 18,
  WAVE_FREQ: 0.9,

  PHASE_SCROLL_RANGE: [0, 8000],
  PHASE_OUTPUT_RANGE: [0, Math.PI * 18],
  PARALLAX_RANGE: [0, 8000],
  PARALLAX_SHIFT: [0, 720],

  ROTATE_DEG: -10,
  TOP_OFFSET_VH: 8,
  MAX_WIDTH: 2400,
};

export default function SnakeBackground() {
  const { scrollY } = useScroll();

  const phaseMV = useTransform(
    scrollY,
    SETTINGS.PHASE_SCROLL_RANGE,
    SETTINGS.PHASE_OUTPUT_RANGE
  );
  const parallaxYMV = useTransform(
    scrollY,
    SETTINGS.PARALLAX_RANGE,
    SETTINGS.PARALLAX_SHIFT
  );

  const [phase, setPhase] = React.useState(0);
  const [parallaxY, setParallaxY] = React.useState(0);
  useMotionValueEvent(phaseMV, "change", (v) => setPhase(v));
  useMotionValueEvent(parallaxYMV, "change", (v) => setParallaxY(v));

  // Precompute stabiele random cijfers per stukje (0-9)
  const digits = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < SETTINGS.NUM_PIECES; i++) {
      arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
  }, []);

  // Posities
  const pieces = React.useMemo(() => {
    const arr = [];
    const S = SETTINGS.PIECE_SIZE;
    const G = SETTINGS.GAP;
    const step = S + G;

    for (let i = 0; i < SETTINGS.NUM_PIECES; i++) {
      const baseY = i * step;
      const localY =
        baseY +
        Math.cos(phase * 0.6 + i * SETTINGS.WAVE_FREQ * 0.85) * SETTINGS.AMP_Y;

      const localX =
        i * (S * 0.15) +
        Math.sin(phase + i * SETTINGS.WAVE_FREQ) * SETTINGS.AMP_X;

      arr.push({
        x: localX,
        y: localY,
        color: SETTINGS.COLORS[i % SETTINGS.COLORS.length],
        digit: digits[i],
      });
    }
    return arr;
  }, [phase, digits]);

  // Breedte voor centreren
  const totalWidth = Math.min(
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
            style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}
          >
            {/* puzzelblok */}
            <div
              style={{
                width: SETTINGS.PIECE_SIZE,
                height: SETTINGS.PIECE_SIZE,
                borderRadius: SETTINGS.ROUND,
                background: p.color,
                position: "relative",
              }}
            >
              {/* nummer in het midden; donker in light, licht in dark */}
              <span
                className="absolute inset-0 flex items-center justify-center text-[12px] md:text-[13px] font-semibold text-neutral-800/80 dark:text-gray-100/80"
                style={{ lineHeight: 1 }}
              >
                {p.digit}
              </span>
            </div>

            {/* kleine “knopjes” boven/onder voor puzzel-look */}
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
