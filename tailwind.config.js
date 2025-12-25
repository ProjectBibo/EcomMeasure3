/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#3A59FF",
        "brand-teal": "#344DBC",
        "brand-yellow": "#E9EDFA",
        "brand-yellow-dark": "#D8DEF3",
        surface: {
          light: "#f7f8fb",
          soft: "#eef1f7",
          dark: "#0f162a"
        }
      }
    }
  },
  plugins: []
};
