/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "414px",

      // => @media (min-width: 414px) { ... }

      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      med: "768px",

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        main: "#155263",
        secondary: "#FFC93C",
        third: "#FF9A3C",
      },
      keyframes: {
        appearFromTop: {
          "0%": {
            transform: "translateY(-50px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        appearScale: {
          "0%": {
            opacity: "0",
            scale: "0.8",
          },
          "100%": {
            opacity: "1",
            scale: "1",
          },
        },
        dissAppearScale: {
          "0%": {
            opacity: "1",
            scale: "1",
          },
          "100%": {
            opacity: "0",
            scale: "0.8",
          },
        },
        dissapearToTop: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-50px)",
          },
        },
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        dissAppear: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".animation-forwards": { "animation-fill-mode": "forwards" },
      });
    },
  ],
};
