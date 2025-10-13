import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomCursor from "../components/CustomCursor";
import ConfettiLayer from "../components/ConfettiLayer";

const defaultValue = {
  prefersReducedMotion: false,
  soundEnabled: false,
  soundToggleDisabled: false,
  toggleSound: () => {},
  playSound: () => {},
  celebrate: () => {},
};

const ExperienceContext = createContext(defaultValue);

function supportsHover() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function ExperienceProvider({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [bursts, setBursts] = useState([]);
  const soundEnabledRef = useRef(false);
  const audioContextRef = useRef(null);
  const destroyTimersRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("experience:sound-enabled");
      if (stored === "on") {
        setSoundEnabled(true);
        soundEnabledRef.current = true;
      }
    } catch (error) {
      console.error("Reading sound preference failed", error);
    }
  }, []);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => () => {
    destroyTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    destroyTimersRef.current = [];
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("experience:sound-enabled", next ? "on" : "off");
      } catch (error) {
        console.error("Persisting sound preference failed", error);
      }
      return next;
    });
  }, []);

  const ensureAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback(
    async (type = "confirm") => {
      if (!soundEnabledRef.current) return;
      if (prefersReducedMotion) return;
      const ctx = ensureAudioContext();
      if (!ctx) return;
      try {
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
      } catch (error) {
        console.warn("Resuming audio context failed", error);
      }
      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const base = type === "click" ? 420 : 540;
      oscillator.type = type === "click" ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(base, now);
      oscillator.frequency.linearRampToValueAtTime(base + 120, now + 0.16);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.34);
    },
    [ensureAudioContext, prefersReducedMotion]
  );

  const triggerConfetti = useCallback(
    ({ x, y, duration = 720 }) => {
      if (prefersReducedMotion) return;
      if (typeof window === "undefined") return;
      const safeDuration = clamp(duration, 600, 900);
      const key = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
      const pieces = Array.from({ length: 16 }, (_, index) => ({
        id: `${key}-${index}`,
        rotation: Math.random() * 180,
        hue: 42 + Math.random() * 18,
        offsetX: clamp((Math.random() - 0.5) * 70, -60, 60),
        offsetY: clamp((Math.random() - 0.5) * 80, -50, 65),
        delay: Math.random() * 120,
        scale: 0.9 + Math.random() * 0.5,
      }));
      setBursts((current) => [...current, { key, x, y, duration: safeDuration, pieces }]);
      const timer = window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.key !== key));
      }, safeDuration + 160);
      destroyTimersRef.current.push(timer);
    },
    [prefersReducedMotion]
  );

  const celebrate = useCallback(
    ({ id, source, point, sound = "confirm" }) => {
      if (typeof window === "undefined") return;
      if (prefersReducedMotion) return;
      if (id) {
        const cacheKey = `experience:confetti:${id}`;
        const stored = window.sessionStorage.getItem(cacheKey);
        if (stored) return;
        window.sessionStorage.setItem(cacheKey, "done");
      }
      let coords = point;
      if (!coords && source instanceof Element) {
        const rect = source.getBoundingClientRect();
        coords = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
      if (!coords) return;
      triggerConfetti({ x: coords.x, y: coords.y, duration: 700 + Math.random() * 140 });
      if (soundEnabledRef.current) {
        playSound(sound);
      }
    },
    [playSound, prefersReducedMotion, triggerConfetti]
  );

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    if (prefersReducedMotion) {
      document.querySelectorAll(".magnetic-cta").forEach((node) => {
        node.style.removeProperty("--magnet-x");
        node.style.removeProperty("--magnet-y");
        node.style.removeProperty("--magnet-scale");
      });
      return undefined;
    }
    if (!supportsHover()) return undefined;

    let rafId = null;
    let currentTarget = null;
    let pending = null;

    const applyTransform = () => {
      if (!pending) {
        rafId = null;
        return;
      }
      const { target, clientX, clientY } = pending;
      if (!target.isConnected) {
        pending = null;
        rafId = null;
        return;
      }
      const rect = target.getBoundingClientRect();
      const relativeX = clientX - (rect.left + rect.width / 2);
      const relativeY = clientY - (rect.top + rect.height / 2);
      const limit = Math.min(14, Math.max(rect.width, rect.height) * 0.16);
      const offsetX = clamp(relativeX * 0.18, -limit, limit);
      const offsetY = clamp(relativeY * 0.18, -limit, limit);
      target.style.setProperty("--magnet-x", `${offsetX}px`);
      target.style.setProperty("--magnet-y", `${offsetY}px`);
      target.style.setProperty("--magnet-scale", "1.02");
      pending = null;
      rafId = null;
    };

    const schedule = (target, event) => {
      pending = { target, clientX: event.clientX, clientY: event.clientY };
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyTransform);
      }
    };

    const clearTarget = (target) => {
      target.style.removeProperty("--magnet-x");
      target.style.removeProperty("--magnet-y");
      target.style.removeProperty("--magnet-scale");
    };

    const handlePointerMove = (event) => {
      if (!currentTarget) return;
      schedule(currentTarget, event);
    };

    const handlePointerLeave = (event) => {
      if (!event.currentTarget) return;
      const target = event.currentTarget;
      target.removeEventListener("pointermove", handlePointerMove);
      target.removeEventListener("pointerleave", handlePointerLeave);
      clearTarget(target);
      target.dataset.magnetActive = "false";
      if (currentTarget === target) {
        currentTarget = null;
      }
    };

    const handlePointerOver = (event) => {
      const target = event.target.closest(".magnetic-cta");
      if (!target) return;
      if (target.dataset.magnetActive === "true") return;
      target.dataset.magnetActive = "true";
      currentTarget = target;
      target.addEventListener("pointermove", handlePointerMove);
      target.addEventListener("pointerleave", handlePointerLeave);
    };

    const handleFocus = (event) => {
      const target = event.target.closest(".magnetic-cta");
      if (!target) return;
      target.style.setProperty("--magnet-scale", "1.02");
      target.style.setProperty("--magnet-x", "0px");
      target.style.setProperty("--magnet-y", "0px");
    };

    const handleBlur = (event) => {
      const target = event.target.closest(".magnetic-cta");
      if (!target) return;
      clearTarget(target);
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (currentTarget) {
        clearTarget(currentTarget);
      }
    };
  }, [prefersReducedMotion]);

  const value = useMemo(
    () => ({
      prefersReducedMotion,
      soundEnabled,
      soundToggleDisabled: prefersReducedMotion,
      toggleSound,
      playSound,
      celebrate,
    }),
    [celebrate, playSound, prefersReducedMotion, soundEnabled, toggleSound]
  );

  return (
    <ExperienceContext.Provider value={value}>
      <CustomCursor />
      <ConfettiLayer bursts={bursts} />
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  return useContext(ExperienceContext);
}

export default ExperienceContext;
