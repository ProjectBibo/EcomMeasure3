/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#004AAD",      // primair (merk + CTA)
          teal: "#0EA5A5",      // actie/accent (secundair)
          tealHover: "#0C8E8E", // hover voor teal CTA
          yellow: "#F9C513"     // highlight/badges
        },
        neutralInk: {
          DEFAULT: "#0B1220",   // hoofdtekst op licht
          secondary: "#475569"  // secundaire tekst
        },
        surface: {
          light: "#FFFFFF",     // witte kaarten/achtergrond
          soft:  "#F7F8FA",     // lichtgrijze secties
          dark:  "#0F1115"      // (optioneel) donkere kaart
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
