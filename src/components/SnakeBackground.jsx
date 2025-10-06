import React from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Dunne puzzel-slang met brede zig-zag — verlengde versie
 * - Meer stukjes (loopt langer door)
 * - Brede zigzag
 * - Parallax meescroll
 */
const SETTINGS = {
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"],
  OPACITY_CLASS: "opacity-10",
  PIECE_SIZE: 28,
  ROUND: 8,
  GAP: 8,
  NUM_PIECES: 84,                 // 🔹 was 52 → langer doorlopend

  AMP_X: 140,
  AMP_Y: 18,
  WAVE_FREQ: 0.9,

  PHASE_SCROLL_RANGE: [0, 4200],  // 🔹 groter scroll bereik
  PHASE_OUTPUT_RANGE: [0, Math.PI * 12],
  PARALLAX_RANGE: [0, 4200],      // 🔹 idem
  PARALLAX_SHIFT: [0, 420],       // iets sterker naar beneden

  ROTATE_DEG: -10,
  TOP_OFFSET_VH: 8,
  MAX_WIDTH: 2000,
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
      });
    }
    return arr;
  }, [phase]);

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
            <div
              style={{
                width: SETTINGS.PIECE_SIZE,
                height: SETTINGS.PIECE_SIZE,
                borderRadius: SETTINGS.ROUND,
                background: p.color,
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
