/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#304D9B",
        "brand-teal": "#20376f",
        "brand-yellow": "#304D9B",
        "brand-yellow-dark": "#233a78",
        surface: {
          light: "#f7f8fb",
          soft: "#eef1f7",
          dark: "#0c1220"
        }
      }
    }
  },
  plugins: []
};
