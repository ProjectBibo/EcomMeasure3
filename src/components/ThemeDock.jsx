import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Moon, Palette, Sparkles, Sun } from "lucide-react";
import { applyPalette, ensureTheme, palettes, setThemeMode } from "../utils/theme";

const paletteGradient = (palette) =>
  `linear-gradient(135deg, ${palette.preview[0]} 0%, ${palette.preview[1]} 45%, ${palette.preview[2]} 100%)`;

export default function ThemeDock() {
  const [open, setOpen] = useState(false);
  const [activePalette, setActivePalette] = useState(palettes[0].id);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const snapshot = ensureTheme();
    setActivePalette(snapshot.palette);
    setMode(snapshot.mode);

    const handlePaletteChange = (event) => {
      if (event?.detail?.palette) {
        setActivePalette(event.detail.palette);
      }
    };

    const handleModeChange = (event) => {
      if (event?.detail?.mode) {
        setMode(event.detail.mode);
      }
    };

    window.addEventListener("theme:palette", handlePaletteChange);
    window.addEventListener("theme:mode", handleModeChange);

    return () => {
      window.removeEventListener("theme:palette", handlePaletteChange);
      window.removeEventListener("theme:mode", handleModeChange);
    };
  }, []);

  const active = useMemo(
    () => palettes.find((entry) => entry.id === activePalette) ?? palettes[0],
    [activePalette]
  );

  const togglePanel = () => setOpen((prev) => !prev);

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    setThemeMode(next);
  };

  const selectPalette = (paletteId) => {
    if (paletteId === activePalette) return;
    setActivePalette(paletteId);
    applyPalette(paletteId);
  };

  return (
    <div className="fixed right-4 top-1/2 z-[70] hidden md:flex -translate-y-1/2 flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="dock"
            initial={{ opacity: 0, x: 80, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.94 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-panel relative w-[320px] overflow-hidden rounded-3xl px-6 py-7"
          >
            <div className="pointer-events-none absolute -top-28 -right-28 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent2/10 blur-3xl" aria-hidden />

            <div className="relative flex items-start justify-between gap-4">
              <div className="max-w-[70%]">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700 shadow-sm backdrop-blur-sm dark:bg-white/10 dark:text-white/80">
                  <Sparkles size={12} />
                  Thema
                </span>
                <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">{active.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-gray-300">
                  {active.description}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleMode}
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/20 dark:bg-white/10 dark:text-white"
                aria-label={mode === "dark" ? "Schakel licht thema in" : "Schakel donker thema in"}
              >
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, rotate: -12, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 12, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </button>
            </div>

            <div className="relative mt-6 grid gap-3">
              {palettes.map((palette) => {
                const isActive = palette.id === activePalette;
                return (
                  <motion.button
                    key={palette.id}
                    type="button"
                    onClick={() => selectPalette(palette.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`group relative flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-accent/60 ${
                      isActive
                        ? "border-white/70 bg-white/80 shadow-lg ring-2 ring-accent/50 dark:border-white/25 dark:bg-white/10"
                        : "border-white/40 bg-white/70 shadow-sm hover:border-white/70 dark:border-white/10 dark:bg-white/5"
                    }`}
                    style={{ backdropFilter: "blur(18px)" }}
                  >
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/40 shadow-inner"
                      style={{ background: paletteGradient(palette) }}
                      aria-hidden
                    />
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">{palette.name}</span>
                      <span className="text-[11px] text-neutral-600 transition group-hover:text-neutral-800 dark:text-gray-300 dark:group-hover:text-gray-100">
                        {palette.description}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          key="active-pill"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex items-center rounded-full bg-accent/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent"
                        >
                          Actief
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              type="button"
              onClick={togglePanel}
              whileHover={{ x: -3 }}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 transition hover:text-neutral-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ChevronLeft size={14} /> Sluit
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.div
          key="hint"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="glass-panel relative mb-2 flex max-w-[220px] items-center gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-700 shadow-lg dark:text-gray-200"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/60 bg-white/90 text-neutral-800 shadow-sm dark:border-white/20 dark:bg-white/10 dark:text-white">
            {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold uppercase tracking-[0.2em] text-[11px] text-neutral-500 dark:text-gray-400">Thema</span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">{active.name}</span>
          </div>
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={togglePanel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/60 bg-white/80 text-neutral-800 shadow-xl backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white"
        aria-label="Open themapalet"
      >
        <Palette size={24} />
        <motion.span
          key={open ? "open" : "closed"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pointer-events-none absolute -inset-1 rounded-[26px] bg-gradient-to-br from-accent/20 via-transparent to-accent2/20 opacity-0 blur-md transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
        />
      </motion.button>
    </div>
  );
}
