/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#0B5FFF",
        "brand-teal": "#0FAF90",
        surface: {
          light: "#fafaf7",
          dark: "#0f172a"
        }
      }
    }
  },
  plugins: []
};
