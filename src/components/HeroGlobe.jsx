import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import createGlobe from "cobe";
import useThemeMode from "../hooks/useThemeMode";

const MARKERS = [
  { location: [52.37, 4.89], size: 0.06 },
  { location: [40.71, -74.01], size: 0.065 },
  { location: [1.29, 103.85], size: 0.055 },
  { location: [48.85, 2.35], size: 0.055 },
  { location: [-33.86, 151.21], size: 0.055 },
  { location: [35.68, 139.69], size: 0.055 },
  { location: [19.43, -99.13], size: 0.055 },
];

const LIGHT_THEME = {
  baseColor: [0.76, 0.83, 0.92],
  markerColor: [1, 0.84, 0.15],
  glowColor: [0.6, 0.78, 1],
  dark: 0.75,
  diffuse: 1.4,
  mapBrightness: 5.2,
};

const DARK_THEME = {
  baseColor: [0.32, 0.54, 0.92],
  markerColor: [1, 0.8, 0.18],
  glowColor: [0.26, 0.5, 0.92],
  dark: 1.2,
  diffuse: 1.1,
  mapBrightness: 5.5,
};

const GLOBE_SCALE = 1.1;

export default function HeroGlobe() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef({ phi: 0 });
  const globeRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = useThemeMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return () => {};

    const palette = isDark ? DARK_THEME : LIGHT_THEME;
    const state = animationRef.current;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      globeRef.current?.setOptions?.({
        width: canvas.width,
        height: canvas.height,
        devicePixelRatio: pixelRatio,
      });
    };

    resize();

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      width: canvas.width,
      height: canvas.height,
      phi: state.phi,
      theta: 0.28,
      scale: GLOBE_SCALE,
      diffuse: palette.diffuse,
      dark: palette.dark,
      mapBrightness: palette.mapBrightness,
      baseColor: palette.baseColor,
      markerColor: palette.markerColor,
      glowColor: palette.glowColor,
      markers: MARKERS,
      onRender: (renderState) => {
        renderState.width = canvas.width;
        renderState.height = canvas.height;
        renderState.scale = GLOBE_SCALE;
        renderState.theta = 0.28;
        if (!shouldReduceMotion) {
          state.phi += 0.0025;
        }
        renderState.phi = state.phi;
      },
    });
    globeRef.current?.setOptions?.({
      width: canvas.width,
      height: canvas.height,
    });

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          resize();
        })
      : null;
    resizeObserver?.observe(container);

    const dprListener = () => {
      resize();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", dprListener);
    }

    return () => {
      resizeObserver?.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", dprListener);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [isDark, shouldReduceMotion]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const palette = isDark ? DARK_THEME : LIGHT_THEME;
    globe.setOptions?.({
      baseColor: palette.baseColor,
      markerColor: palette.markerColor,
      glowColor: palette.glowColor,
      diffuse: palette.diffuse,
      dark: palette.dark,
      mapBrightness: palette.mapBrightness,
    });
  }, [isDark]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !shouldReduceMotion) return;
    const state = animationRef.current;
    globe.setOptions?.({ phi: state.phi });
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative w-full max-w-md sm:max-w-lg lg:max-w-none"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(92, 154, 255, 0.25), rgba(92, 154, 255, 0) 65%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="block h-64 w-full sm:h-72 md:h-80 lg:h-[26rem]"
        aria-hidden="true"
        role="presentation"
        tabIndex={-1}
      />
    </div>
  );
}
