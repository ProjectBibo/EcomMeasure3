import { useEffect, useState } from "react";

export default function useThemeMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const root = document.documentElement;

    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          update();
          break;
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    const media = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const handleMediaChange = () => update();
    media?.addEventListener("change", handleMediaChange);

    const handleStorage = (event) => {
      if (event.key === "theme") {
        update();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      observer.disconnect();
      media?.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return isDark;
}
