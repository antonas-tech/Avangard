/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Quiet luxury — beige & green palette
        sand: {
          50: "#FBFAF7",
          100: "#F9F8F6", // primary background
          200: "#F2EFE9", // section accent background
          300: "#E8E3D8",
          400: "#D6CFBF",
        },
        forest: {
          50: "#5C6E60",
          100: "#435246", // soft accent
          200: "#36473B",
          300: "#2C3D30", // primary accent
          400: "#243227",
          500: "#1B251D",
        },
        graphite: {
          DEFAULT: "#1C1C1C",
          soft: "#2B2B2B",
          mute: "#5A5853",
        },
      },
      fontFamily: {
        // Editorial-style serif for headings; geometric soft grotesk for body
        serif: [
          "'Cormorant Garamond'",
          "'Playfair Display'",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "'Manrope'",
          "'Inter'",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "-0.03em",
      },
      transitionTimingFunction: {
        // Apple-like smoothness
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        600: "600ms",
        900: "900ms",
        1200: "1200ms",
      },
      boxShadow: {
        soft: "0 30px 60px -30px rgba(28, 28, 28, 0.18)",
        whisper: "0 20px 50px -25px rgba(28, 28, 28, 0.12)",
      },
    },
  },
  plugins: [],
};
