/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#004AAD",
          teal: "#0EA5A5",
          tealHover: "#0C8E8E",
          yellow: "#F9C513",
        },
        neutralInk: {
          DEFAULT: "#0B1220",  // primaire tekst op licht
          secondary: "#475569" // secundaire tekst op licht
        },
        surface: {
          light: "#FFFFFF",    // pagina-achtergrond licht
          soft:  "#F7F8FA",    // zachte secties/cards
          dark:  "#0F1115",    // pagina-achtergrond donker
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
