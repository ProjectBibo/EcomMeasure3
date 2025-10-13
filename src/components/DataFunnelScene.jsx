// src/components/DataFunnelScene.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const lines = [
  {
    d: "M20 150 C120 90 180 130 300 60",
    delay: 0,
    opacity: 0.55,
  },
  {
    d: "M20 100 C100 120 180 60 300 110",
    delay: 0.4,
    opacity: 0.6,
  },
  {
    d: "M40 40 C120 20 200 90 300 80",
    delay: 0.8,
    opacity: 0.7,
  },
];

export default function DataFunnelScene({ className }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 320 200"
      className={className}
      role="presentation"
      aria-hidden
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="funnel-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#14b8a6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="funnel-core" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
      </defs>

      {lines.map((line, index) => (
        <motion.path
          key={line.d}
          d={line.d}
          fill="none"
          stroke="url(#funnel-line)"
          strokeWidth={5}
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: line.opacity } : { pathLength: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: line.opacity }
              : {
                  pathLength: 1,
                  opacity: [0.1, line.opacity, 0.1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 4.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: line.delay,
                }
          }
        />
      ))}

      <motion.circle
        cx={240}
        cy={110}
        r={28}
        fill="url(#funnel-core)"
        initial={shouldReduceMotion ? { scale: 1, opacity: 0.8 } : { scale: 0.8, opacity: 0.6 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.8 }
            : {
                scale: [0.8, 1, 0.9],
                opacity: [0.6, 0.9, 0.7],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <motion.circle
        cx={240}
        cy={110}
        r={48}
        stroke="url(#funnel-line)"
        strokeWidth={1.5}
        fill="none"
        initial={shouldReduceMotion ? { opacity: 0.2 } : { opacity: 0 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.2 }
            : {
                opacity: [0, 0.35, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 2.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6,
              }
        }
      />
    </motion.svg>
  );
}
