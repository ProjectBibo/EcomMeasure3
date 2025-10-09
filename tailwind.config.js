/** @type {import('tailwindcss').Config} */
const withOpacityValue = (variable) => ({ opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgb(var(${variable}) / ${opacityValue})`;
  }
  return `rgb(var(${variable}))`;
};

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: withOpacityValue("--accent-1"),
        accent2: withOpacityValue("--accent-2"),
        accent3: withOpacityValue("--accent-3"),
        surface: {
          light: withOpacityValue("--surface-light"),
          dark: withOpacityValue("--surface-dark"),
        },
      },
    },
  },
  plugins: [],
};
