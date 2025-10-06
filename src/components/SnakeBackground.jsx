import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Snelle, dunne, performante puzzel-slang
 * - Kleine blokjes
 * - Enkel 1 "ketting" (geen grid)
 * - Parallax + horizontale criss-cross sway op scroll
 * - Geen zware filters; alleen CSS transforms
 */
const SETTINGS = {
  COLORS: ["#004AAD", "#0EA5A5", "#F9C513"], // brandkleuren
  OPACITY_CLASS: "opacity-15",               // zachter/doorzichtig (pas aan: opacity-10/20)
  PIECE_SIZE: 34,                             // kleiner puzzelstukje
  ROUND: 8,                                   // afronding puzzelblok
  GAP: 10,                                    // afstand tussen blokken
  NUM_PIECES: 28,                             // aantal blokjes in de slang
  AMPLITUDE: 26,                              // verticale slinger in de slang zélf
  FREQ: 0.55,                                 // hoe kronkelig de slang is
  PARALLAX_RANGE: [0, 1800],                  // scrollY input
  PARALLAX_SHIFT: [0, 280],                   // Y-verschil (langzamer dan scroll)
  SWAY_X_SHIFT: [-26, 26],                    // lichte criss-cross (horizontaal) op scroll
  ROTATE_SWAY: [-2, 2],                       // mini-rotatie op scroll
};

export default function SnakeBackground() {
  const { scrollY } = useScroll();

  // Parallax omlaag bij scroll
  const parallaxY = useTransform(
    scrollY,
    SETTINGS.PARALLAX_RANGE,
    SETTINGS.PARALLAX_SHIFT
  );

  // Criss-cross: lichte X-sway op basis van scroll
  const swayX = useTransform(
    scrollY,
    SETTINGS.PARALLAX_RANGE,
    SETTINGS.SWAY_X_SHIFT
  );

  // Mini-rotatie voor organisch gevoel
  const rot = useTransform(
    scrollY,
    SETTINGS.PARALLAX_RANGE,
    SETTINGS.ROTATE_SWAY
  );

  // Bereken de posities van de puzzelblokjes 1x
  const pieces = useMemo(() => {
    const arr = [];
    const { PIECE_SIZE: S, GAP: G, AMPLITUDE: A, FREQ: F } = SETTINGS;
    const step = S + G;

    for (let i = 0; i < SETTINGS.NUM_PIECES; i++) {
      const t = i;                       // “tijd”/index
      const x = i * step;                // basis horizontale afstand
      const y = Math.sin(t * F) * A;     // zig-zag golf
      arr.push({ x, y, c: SETTINGS.COLORS[i % SETTINGS.COLORS.length] });
    }
    return arr;
  }, []);

  // Totale breedte van de slang → center in beeld
  const totalWidth = useMemo(() => {
    return (SETTINGS.PIECE_SIZE + SETTINGS.GAP) * SETTINGS.NUM_PIECES;
  }, []);

  return (
    <motion.div
      style={{ y: parallaxY }}
      className={`pointer-events-none fixed inset-0 z-0 ${SETTINGS.OPACITY_CLASS}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ x: swayX, rotate: rot }}
        className="absolute left-1/2 top-[10vh] -translate-x-1/2"
      >
        {/* Container met vaste breedte zodat we kunnen centreren */}
        <div
          className="relative"
          style={{ width: `${Math.min(totalWidth, 1600)}px`, height: "160px" }}
        >
          {/* Slang horizontaal, diagonaal maken we door rotatie op de wrapper (boven) */}
          {pieces.map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                transform: `translate(${p.x}px, ${p.y}px)`,
                willChange: "transform",
              }}
            >
              {/* puzzelblokje */}
              <div
                style={{
                  width: SETTINGS.PIECE_SIZE,
                  height: SETTINGS.PIECE_SIZE,
                  borderRadius: SETTINGS.ROUND,
                  background: p.c,
                }}
              />
              {/* kleine “nubs” (boven/onder) voor puzzel-look (heel subtiel, geen filters) */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  background: p.c,
                  opacity: 0.35,
                  position: "absolute",
                  left: SETTINGS.PIECE_SIZE / 2 - 5,
                  top: -8,
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  background: p.c,
                  opacity: 0.35,
                  position: "absolute",
                  left: SETTINGS.PIECE_SIZE / 2 - 5,
                  top: SETTINGS.PIECE_SIZE - 2,
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
