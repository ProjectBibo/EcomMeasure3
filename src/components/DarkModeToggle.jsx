import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Veilige default: light, tenzij gebruiker eerder dark koos
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-md bg-surface-soft dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 text-neutralInk dark:text-gray-300 hover:opacity-80 transition"
      aria-label="Schakel dark mode"
      type="button"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
