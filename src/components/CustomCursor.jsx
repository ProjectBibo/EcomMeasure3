import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailingX = useSpring(cursorX, {
    stiffness: 160,
    damping: 18,
    mass: 0.6,
  });
  const trailingY = useSpring(cursorY, {
    stiffness: 160,
    damping: 18,
    mass: 0.6,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isAccent, setIsAccent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updatePosition = (event) => {
      cursorX.set(event.clientX - 8);
      cursorY.set(event.clientY - 8);
      const isInteractive = Boolean(
        event.target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='accent']"
        )
      );
      setIsAccent(isInteractive);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerenter", handleEnter);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerenter", handleEnter);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999] hidden md:block"
    >
      <motion.div
        className={`custom-cursor-dot ${isAccent ? "custom-cursor-dot--accent" : ""}`}
        style={{ x: cursorX, y: cursorY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isPressed ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.div
        className={`custom-cursor-ring ${isAccent ? "custom-cursor-ring--accent" : ""}`}
        style={{ x: trailingX, y: trailingY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isPressed ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </div>
  );
}
