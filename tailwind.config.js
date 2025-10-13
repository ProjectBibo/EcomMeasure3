/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1F6AA5",
        "brand-blue-dark": "#174B73",
        "brand-teal": "#2A7C9F",
        "brand-yellow": "#FFCC02",
        "brand-yellow-dark": "#D3A300",
        surface: {
          light: "#F3F5F8",
          soft: "#E7EBF1",
          dark: "#0B121F"
        }
      }
    }
  },
  plugins: []
};
