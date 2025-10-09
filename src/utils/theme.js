const MODE_KEY = "theme-mode";
const PALETTE_KEY = "theme-palette";

export const palettes = [
  {
    id: "aurora",
    name: "Aurora",
    description: "Elektrische blauwen en teals",
    preview: ["#0B5FFF", "#0FAF90", "#F9C513"],
    metaLight: "#f5f7fb",
    metaDark: "#040816",
  },
  {
    id: "nocturne",
    name: "Nocturne",
    description: "Diep paars met neonmagenta",
    preview: ["#6D28D9", "#EC4899", "#FBBF24"],
    metaLight: "#f8f4ff",
    metaDark: "#0a041a",
  },
  {
    id: "verdant",
    name: "Verdant",
    description: "Koele groentinten met citrus",
    preview: ["#0F766E", "#22C55E", "#A3E635"],
    metaLight: "#f3fbf7",
    metaDark: "#03180f",
  },
  {
    id: "solar",
    name: "Solar",
    description: "Warme sunset gradients",
    preview: ["#EA580C", "#EC4899", "#F97316"],
    metaLight: "#fff4ec",
    metaDark: "#1a0604",
  },
];

const paletteMap = new Map(palettes.map((palette) => [palette.id, palette]));
const DEFAULT_PALETTE = palettes[0].id;
let currentPalette = DEFAULT_PALETTE;
let currentMode = "light";

const getHtml = () => (typeof document !== "undefined" ? document.documentElement : null);

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // noop
  }
};

const safeGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

const updatePaletteClass = (html, paletteId) => {
  palettes.forEach((palette) => html.classList.remove(`theme-${palette.id}`));
  html.classList.add(`theme-${paletteId}`);
  html.dataset.theme = paletteId;
};

const updateMetaColor = (mode, paletteId) => {
  if (typeof document === "undefined") return;
  const palette = paletteMap.get(paletteId) ?? paletteMap.get(DEFAULT_PALETTE);
  if (!palette) return;
  const color = mode === "dark" ? palette.metaDark : palette.metaLight;
  if (!color) return;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", color);
};

const addTransitionFlash = (html) => {
  html.classList.add("theme-transition");
  window.setTimeout(() => html.classList.remove("theme-transition"), 240);
};

export const ensureTheme = () => {
  const html = getHtml();
  if (!html) return { palette: currentPalette, mode: currentMode };

  let storedPalette = safeGet(PALETTE_KEY);
  if (!storedPalette || !paletteMap.has(storedPalette)) {
    storedPalette = DEFAULT_PALETTE;
  }
  currentPalette = storedPalette;
  updatePaletteClass(html, currentPalette);

  let storedMode = safeGet(MODE_KEY);
  if (storedMode !== "dark" && storedMode !== "light") {
    if (typeof window !== "undefined" && window.matchMedia) {
      storedMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      storedMode = "light";
    }
  }
  currentMode = storedMode;
  html.classList.toggle("dark", currentMode === "dark");
  updateMetaColor(currentMode, currentPalette);

  return { palette: currentPalette, mode: currentMode };
};

export const setThemeMode = (mode) => {
  if (mode !== "light" && mode !== "dark") return;
  const html = getHtml();
  if (!html) return;

  currentMode = mode;
  html.classList.toggle("dark", mode === "dark");
  safeSet(MODE_KEY, mode);
  updateMetaColor(mode, currentPalette);
  addTransitionFlash(html);

  window.dispatchEvent(new CustomEvent("theme:mode", { detail: { mode } }));
};

export const toggleThemeMode = () => {
  setThemeMode(currentMode === "dark" ? "light" : "dark");
};

export const applyPalette = (paletteId) => {
  if (!paletteMap.has(paletteId)) return;
  const html = getHtml();
  if (!html) return;

  currentPalette = paletteId;
  updatePaletteClass(html, currentPalette);
  safeSet(PALETTE_KEY, currentPalette);
  updateMetaColor(currentMode, currentPalette);
  addTransitionFlash(html);

  const palette = paletteMap.get(currentPalette);
  if (palette) {
    html.style.setProperty("--theme-active-name", palette.name);
  }

  window.dispatchEvent(new CustomEvent("theme:palette", { detail: { palette: currentPalette } }));
};

export const getThemeSnapshot = () => ({ mode: currentMode, palette: currentPalette });

if (typeof window !== "undefined") {
  ensureTheme();
}
