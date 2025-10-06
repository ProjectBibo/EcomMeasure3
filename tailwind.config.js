/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <- heel belangrijk
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
          DEFAULT: "#0B1220",
          secondary: "#475569",
        },
        surface: {
          light: "#FFFFFF",   // lichte pagina-achtergrond
          soft:  "#F7F8FA",   // zachte sectie-achtergrond
          dark:  "#0F1115",   // donkere pagina-achtergrond
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
