import React, { useEffect, useMemo, useRef, useState } from "react";
import { useExperience } from "../context/ExperienceContext";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [tabindex], input, textarea, select, summary, .magnetic-cta";

function hasFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function CustomCursor() {
  const { prefersReducedMotion } = useExperience();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const shouldRender = useMemo(() => !prefersReducedMotion && hasFinePointer(), [prefersReducedMotion]);

  useEffect(() => {
    if (!shouldRender) {
      document.body.removeAttribute("data-custom-cursor");
      setEnabled(false);
      return () => {};
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return () => {};

    document.body.setAttribute("data-custom-cursor", "premium");
    setEnabled(true);

    let rafId = null;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const applyPosition = () => {
      const { x, y } = pointer;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      rafId = null;
    };

    const schedule = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyPosition);
      }
    };

    const handlePointerMove = (event) => {
      schedule(event);
      if (!visible) {
        setVisible(true);
      }
    };

    const handlePointerEnter = (event) => {
      schedule(event);
      setVisible(true);
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    const handlePointerDown = () => {
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handleInteractive = (event) => {
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      setActive(Boolean(target));
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerover", handleInteractive);
    document.addEventListener("pointerout", handleInteractive);
    window.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerover", handleInteractive);
      document.removeEventListener("pointerout", handleInteractive);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [shouldRender]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="custom-cursor" aria-hidden>
      <span
        ref={ringRef}
        className={`cursor-ring${visible ? " cursor-ring--visible" : ""}${
          active ? " cursor-ring--active" : ""
        }${pressed ? " cursor-ring--pressed" : ""}`}
      />
      <span
        ref={dotRef}
        className={`cursor-dot${visible ? " cursor-dot--visible" : ""}${
          active ? " cursor-dot--active" : ""
        }${pressed ? " cursor-dot--pressed" : ""}`}
      />
    </div>
  );
}
