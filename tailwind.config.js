/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          light: "#fafaf7", // zacht crème-wit
          dark: "#0f172a",  // donkerblauw-zwart (dark mode achtergrond)
        },
        brand: {
          blue: "#004aad",
          teal: "#009688",
          yellow: "#facc15",
        },
        neutralInk: "#1e293b",
      },
    },
  },
  plugins: [],
};
