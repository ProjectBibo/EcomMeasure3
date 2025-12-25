/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#3046c5",
        "brand-teal": "#3046c5",
        "brand-yellow": "#e6eefc",
        "brand-yellow-dark": "#cdd9f6",
        surface: {
          light: "#f6f8fb",
          soft: "#edf1f7",
          dark: "#0f172a"
        }
      }
    }
  },
  plugins: []
};
