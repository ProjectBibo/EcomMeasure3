/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1F6F8B",
        "brand-teal": "#184E68",
        "brand-yellow": "#FFCC02",
        "brand-yellow-dark": "#E6B802",
        surface: {
          light: "#f4f7f9",
          dark: "#0d141f"
        }
      }
    }
  },
  plugins: []
};
