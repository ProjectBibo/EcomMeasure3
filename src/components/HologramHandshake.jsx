// src/components/HologramHandshake.jsx
import React, { useEffect, useRef } from "react";

/**
 * Hologram Handshake (canvas-based)
 * - Teken twee "hand" silhouetten als point clouds uit SVG paths
 * - Particle glow + jitter + scanline/shimmer overlay
 * - Subtiele "shake" animatie: handen bewegen tegenfase horizontaal
 * - Light/Dark aware via CSS variabelen (zie CSS-blok onderaan)
 *
 * Props:
 *   height (px)  -> hoogte van de hologram area (default 420)
 *   density      -> punten per 1px path-lengte (default 0.26)
 *   shake        -> amplitude van hand-shake (default 10)
 */

const NS = "http://www.w3.org/2000/svg";

// Silhouet-paths (gestileerd, bewust simpel; glow+particles doen de rest)
const LEFT_HAND_PATH =
  "M 120 220 C 105 185, 120 145, 165 135 C 175 133, 190 138, 205 150 C 190 152, 185 165, 185 175 C 160 175, 150 185, 150 200 C 140 208, 130 214, 120 220 Z";
const RIGHT_HAND_PATH =
  "M 480 220 C 495 185, 480 145, 435 135 C 425 133, 410 138, 395 150 C 410 152, 415 165, 415 175 C 440 175, 450 185, 450 200 C 460 208, 470 214, 480 220 Z";

/** Sample punten langs een SVG path */
function samplePath(d, density = 0.26) {
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", d);
  // Tussenliggende, "zachtere" sampling voor mooier puntwolkje
  const len = path.getTotalLength();
  const step = Math.max(1, 1 / density); // lagere step = meer punten
  const points = [];
  for (let i = 0; i <= len; i += step) {
    const p = path.getPointAtLength(i);
    points.push({ x: p.x, y: p.y });
  }
  return points;
}

export default function HologramHandshake({ height = 420, density = 0.26, shake = 10 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const ptsRef = useRef({ left: [], right: [] });
  const baseRef = useRef({ w: 640, h: 360 }); // basis-tekenvlak voor schaal
  const tsRef = useRef(0);

  // Precompute punten bij mount
  useEffect(() => {
    ptsRef.current.left = samplePath(LEFT_HAND_PATH, density);
    ptsRef.current.right = samplePath(RIGHT_HAND_PATH, density);
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent.clientWidth;
      const h = height;
      canvas.style.width = width + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // parameters uit CSS variabelen (light/dark)
    const getTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        glow: styles.getPropertyValue("--holo-glow").trim() || "rgba(0, 214, 255, 0.85)",
        inner: styles.getPropertyValue("--holo-inner").trim() || "rgba(0, 214, 255, 0.45)",
        dot: styles.getPropertyValue("--holo-dot").trim() || "rgba(181, 255, 250, 0.95)",
        bgfade: styles.getPropertyValue("--holo-fade").trim() || "rgba(0,0,0,0.0)",
      };
    };

    const draw = (t) => {
      if (!running) return;
      tsRef.current = t / 1000; // sec
      const { glow, inner, dot } = getTheme();

      // clear zacht, laat beetje trail voor hologram-feel
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parentW = canvas.clientWidth;
      const parentH = canvas.clientHeight;

      // Scale/translate: basis 640x360 → center & schaal naar hoogte
      const scale = parentH / baseRef.current.h;
      const offsetX = (parentW - baseRef.current.w * scale) / 2;

      ctx.save();
      ctx.translate(offsetX, 0);
      ctx.scale(scale, scale);

      const time = tsRef.current;
      const amp = shake; // handshake amplitude
      const shakeX = Math.sin(time * 2.2) * amp;

      // Teken handgroepen
      const drawGroup = (points, side) => {
        const sideOffset = side === "left" ? -shakeX : shakeX;
        // glow laag (grotere blurcirkel)
        ctx.globalCompositeOperation = "lighter";

        // ‘scan’ jitter voor hologram
        const jitterFreq = side === "left" ? 6.5 : 7.5;

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const jx = Math.sin(time * jitterFreq + i * 0.15) * 0.8;
          const jy = Math.cos(time * (jitterFreq + 0.8) + i * 0.11) * 0.8;

          const x = p.x + sideOffset + jx;
          const y = p.y + jy;

          // buitenste glow
          ctx.beginPath();
          ctx.fillStyle = glow;
          ctx.shadowColor = glow;
          ctx.shadowBlur = 12;
          ctx.arc(x, y, 2.1, 0, Math.PI * 2);
          ctx.fill();

          // binnenvulling
          ctx.beginPath();
          ctx.shadowBlur = 0;
          ctx.fillStyle = inner;
          ctx.arc(x, y, 1.3, 0, Math.PI * 2);
          ctx.fill();

          // kern-dot (scherp)
          if (i % 5 === 0) {
            ctx.beginPath();
            ctx.fillStyle = dot;
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };

      drawGroup(ptsRef.current.left, "left");
      drawGroup(ptsRef.current.right, "right");

      // verbindings-“wire” in het midden (handen samen)
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = inner;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(250 + Math.sin(time) * 2, 170 + Math.cos(time * 1.5) * 2);
      ctx.quadraticCurveTo(320, 165 + Math.sin(time * 2) * 3, 350 - Math.sin(time) * 2, 170 - Math.cos(time * 1.5) * 2);
      ctx.stroke();

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [height, density, shake]);

  return (
    <div className="relative w-full holo">
      {/* Canvas hologram */}
      <canvas ref={canvasRef} className="block w-full" style={{ height }} />

      {/* Scanlines + glow via CSS pseudo (in .holo) */}
      <div className="absolute inset-0 pointer-events-none holo-overlay" />
    </div>
  );
}
