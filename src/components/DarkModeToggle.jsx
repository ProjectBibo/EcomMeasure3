// src/components/DarkModeToggle.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    setIsDark(root?.classList?.contains("dark") ?? false);
  }, []);

  const toggle = useCallback(() => {
    if (typeof document === "undefined") return;

    try {
      const root = document.documentElement;
      const next = !(root?.classList?.contains("dark"));

      if (root?.classList) {
        root.classList.toggle("dark", next);
        root.classList.add("theme-transition");
        setTimeout(() => root.classList.remove("theme-transition"), 250);
      } else {
        // fallback
        root.setAttribute(
          "class",
          (root.getAttribute("class") || "").replace(/\bdark\b/g, "") + (next ? " dark" : "")
        );
      }

      localStorage.setItem("theme", next ? "dark" : "light");
      setIsDark(next);

      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next ? "#0f172a" : "#fafaf7");
    } catch (e) {
      console.error("Theme toggle failed:", e);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      title={isDark ? "Schakel licht thema in" : "Schakel donker thema in"}
    >
      {isDark ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
