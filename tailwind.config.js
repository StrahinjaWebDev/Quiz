/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main":"#155263",
        "secondary":"#FFC93C",
      }
    },
  },
  plugins: [],
};
