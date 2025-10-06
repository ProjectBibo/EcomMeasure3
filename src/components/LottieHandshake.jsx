// src/components/LottieHandshake.jsx
import React, { useEffect, useRef } from "react";

/**
 * LottieHandshake
 * - Speelt een Lottie (SVG) handshake-animatie af
 * - Kleur-tint wisselt mee met dark mode (via MutationObserver)
 * - Zet je Lottie JSON in /public/handshake.json of geef jsonUrl prop mee
 *
 * Props:
 *  - jsonUrl?: string (default: "/handshake.json")
 *  - height?: number (px) default 420
 *  - tintLight?: string (CSS color) default "#0B5FFF"
 *  - tintDark?: string (CSS color) default "#60A5FA"
 *  - speed?: number default 1
 */
export default function LottieHandshake({
  jsonUrl = "/handshake.json",
  height = 420,
  tintLight = "#0B5FFF",
  tintDark = "#60A5FA",
  speed = 1,
}) {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  // helper: re-tint alle SVG shapes (generic)
  const retintSvg = (rootEl, color) => {
    if (!rootEl) return;
    const svg = rootEl.querySelector("svg");
    if (!svg) return;
    const nodes = svg.querySelectorAll("[fill], [stroke]");
    nodes.forEach((el) => {
      const fill = el.getAttribute("fill");
      const stroke = el.getAttribute("stroke");
      // negeer "none" & transparant
      if (fill && fill !== "none" && !fill.startsWith("url(")) {
        el.setAttribute("fill", color);
      }
      if (stroke && stroke !== "none" && !stroke.startsWith("url(")) {
        el.setAttribute("stroke", color);
      }
    });
  };

  // bepaal huidige theme
  const isDark = () => document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (!window.lottie) return;

    // initialiseer animatie
    animRef.current = window.lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: jsonUrl,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    animRef.current.setSpeed(speed);

    // als animatie gerenderd is: tint toepassen
    const onDOMLoaded = () => {
      retintSvg(containerRef.current, isDark() ? tintDark : tintLight);
    };
    animRef.current.addEventListener("DOMLoaded", onDOMLoaded);

    // dark-mode live volgen
    const mo = new MutationObserver(() => {
      retintSvg(containerRef.current, isDark() ? tintDark : tintLight);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mo.disconnect();
      if (animRef.current) {
        animRef.current.removeEventListener("DOMLoaded", onDOMLoaded);
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [jsonUrl, speed, tintLight, tintDark]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="block w-full"
        style={{ height: `${height}px` }}
        aria-label="Handshake animatie"
      />
      {/* subtiele scanlines voor hologram-gevoel; optioneel */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 4px)",
        mixBlendMode: "screen",
        opacity: 0.25
      }} />
    </div>
  );
}
