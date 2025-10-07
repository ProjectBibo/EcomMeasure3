import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync lokale state met huidige DOM state (gezet door index.html script)
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  // Update <meta name="theme-color"> wanneer er geswitcht wordt
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#0f172a" : "#fafaf7");
  }, [isDark]);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);

    // Optioneel: schakel een kleine kleur-overgang in na de eerste render
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 250);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      title={isDark ? "Schakel licht thema in" : "Schakel donker thema in"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
