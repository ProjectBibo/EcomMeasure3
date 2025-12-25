/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#2F58FF",
        "brand-teal": "#2A48CC",
        "brand-yellow": "#2F58FF",
        "brand-yellow-dark": "#243FCC",
        surface: {
          light: "#f7f8fb",
          soft: "#eef1f6",
          dark: "#0b1726"
        }
      }
    }
  },
  plugins: []
};
