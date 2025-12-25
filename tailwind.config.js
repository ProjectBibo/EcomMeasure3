/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1F6FEB",
        "brand-teal": "#184F9E",
        "brand-yellow": "#FFCC02",
        "brand-yellow-dark": "#E6B700",
        surface: {
          light: "#f3f6fb",
          soft: "#e6ecf5",
          dark: "#0b1726"
        }
      }
    }
  },
  plugins: []
};
