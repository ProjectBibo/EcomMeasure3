import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COLORS = ["#004aad", "#0EA5A5", "#F9C513"]; // brand blue, teal, yellow

// Posities van de blokjes (slangpatroon, diagonaal)
const PIECES = [
  { x: 0,   y: 0,   r: 4,  c: 0 },
  { x: 90,  y: 20,  r: -4, c: 1 },
  { x: 180, y: -10, r: 5,  c: 2 },
  { x: 270, y: 10,  r: -5, c: 0 },
  { x: 360, y: -15, r: 4,  c: 1 },
  { x: 450, y: 15,  r: -4, c: 2 },
  { x: 540, y: -20, r: 6,  c: 0 },
  { x: 630, y: 10,  r: -6, c: 1 },
  { x: 720, y: -15, r: 5,  c: 2 },
  { x: 810, y: 20,  r: -5, c: 0 },
];

export default function SnakeBackground() {
  // Parallax: beweeg trager dan de pagina-scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 120]); // hoe lager de 2e waarde, hoe subtieler

  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-visible"
      aria-hidden="true"
    >
      {/* Het SVG canvas: groot, diagonaal geplaatst */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-50 -120 1000 400"
        className="absolute left-1/2 -translate-x-1/2 top-[-180px] rotate-[-8deg] w-[1800px] h-auto opacity-35"
      >
        {/* Subtiele ‘glow’ onderlaag voor luxe effect */}
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {PIECES.map((p, i) => (
          <motion.g
            key={i}
            transform={`translate(${p.x}, ${p.y})`}
            filter="url(#softGlow)"
            animate={{
              y: [p.y, p.y + (i % 2 === 0 ? 6 : -6), p.y],
              rotate: [0, p.r, -p.r, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 6 + i * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* ‘Puzzelblok’ – ronde rechthoek */}
            <rect width="76" height="76" rx="14" fill={COLORS[p.c]} />

            {/* Kleine ‘puzzle nubs’ voor het gevoel (optioneel, heel subtiel) */}
            <circle cx="38" cy="-8" r="8" fill={COLORS[p.c]} opacity="0.5" />
            <circle cx="38" cy="84" r="8" fill={COLORS[p.c]} opacity="0.5" />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
