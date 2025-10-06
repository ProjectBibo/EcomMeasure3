import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Instellingen die je eenvoudig kunt tweaken
 */
const SETTINGS = {
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"], // brand blue, teal, yellow
  OPACITY_CLASS: "opacity-20",               // zachter/doorzichtig
  ROTATE_DEG: -10,                           // lichte diagonale slag
  VIEWBOX: { x: -80, y: -200, w: 1200, h: 1600 }, // groot canvas (hoog!)
  PIECE: { size: 76, radius: 14, gap: 16 },  // blokje + tussenruimte
  ROWS: 14,                                   // meer rijen = langere slang
  SPEED_PX: 900,                              // parallax verplaatsing vs scroll
};

export default function SnakeBackground() {
  /**
   * Parallax: beweeg de hele slang mee met scroll (duidelijker dan eerst)
   * Hoe groter de 2e arraywaarde (hier 1800), hoe langer de pagina die we "afdekken".
   */
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1800], [0, SETTINGS.SPEED_PX]);

  /**
   * We bouwen een lange "zig-zag" slang door rijen blokjes diagonaal te verschuiven.
   * Elke rij heeft ~8 blokken, met een offset zodat het patroon golft.
   */
  const cols = 8;
  const { size, gap } = SETTINGS.PIECE;
  const stepX = size + gap; // horizontale stap
  const stepY = (size + gap) * 0.6; // verticale stap voor zig-zag

  // helper om kleur te pakken
  const colorAt = (i) => SETTINGS.COLORS[i % SETTINGS.COLORS.length];

  return (
    <motion.div
      style={{ y }}
      className={`pointer-events-none fixed inset-0 z-0 ${SETTINGS.OPACITY_CLASS}`}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${SETTINGS.VIEWBOX.x} ${SETTINGS.VIEWBOX.y} ${SETTINGS.VIEWBOX.w} ${SETTINGS.VIEWBOX.h}`}
        className="absolute left-1/2 -translate-x-1/2 top-[-10vh]"
        style={{ rotate: `${SETTINGS.ROTATE_DEG}deg`, width: "1600px", height: "auto" }}
      >
        {/* Subtiele soft glow */}
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lange zig-zag slang */}
        {Array.from({ length: SETTINGS.ROWS }).map((_, row) => {
          const rowYOffset = row * stepY * 1.2; // verticale verplaatsing per rij
          const rowXShift = (row % 2 === 0 ? 0 : stepX * 0.5) + (row * 6); // kleine extra drift
          return (
            <g key={row} transform={`translate(${rowXShift}, ${rowYOffset})`}>
              {Array.from({ length: cols }).map((__, col) => {
                const x = col * stepX;
                const yWobble = (col % 2 === 0 ? -10 : 10) + (row % 3 === 0 ? -6 : 6); // lichte golf
                const rotateMax = (col % 2 === 0 ? 5 : -5) + (row % 2 ? 2 : -2);
                const c = colorAt(row + col);

                return (
                  <motion.g
                    key={`${row}-${col}`}
                    transform={`translate(${x}, ${yWobble})`}
                    filter="url(#softGlow)"
                    animate={{
                      y: [yWobble, yWobble + (col % 2 === 0 ? 6 : -6), yWobble],
                      rotate: [0, rotateMax, -rotateMax, 0],
                      scale: [1, 1.015, 1],
                    }}
                    transition={{
                      duration: 6 + (row * 0.3) + (col * 0.15),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* puzzelblok */}
                    <rect
                      width={size}
                      height={size}
                      rx={SETTINGS.PIECE.radius}
                      fill={c}
                      fillOpacity="0.95"
                    />
                    {/* kleine "nubs" voor puzzelgevoel, subtiel */}
                    <circle cx={size / 2} cy={-8} r="8" fill={c} opacity="0.4" />
                    <circle cx={size / 2} cy={size + 8} r="8" fill={c} opacity="0.4" />
                  </motion.g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}
