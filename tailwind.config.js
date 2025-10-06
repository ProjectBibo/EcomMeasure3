export default {
  darkMode: "class", // <- BELANGRIJK
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
          light: "#FFFFFF",
          soft: "#F7F8FA",
          dark: "#0F1115",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
