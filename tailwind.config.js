/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark Cyber-Lounge palette
        ink: {
          950: "#07080B",
          900: "#0B0C10",
          800: "#11131A",
          700: "#1A1D26",
          600: "#1F2833",
          500: "#2A2F3D",
          400: "#3B4252",
        },
        malina: {
          50: "#FFE5F0",
          100: "#FFB3D1",
          200: "#FF80B3",
          300: "#FF4FA3",
          400: "#FF2790",
          500: "#FF007F", // primary neon
          600: "#E80072",
          700: "#D01C6A",
          800: "#A1145A",
          900: "#660A39",
        },
        violet: {
          400: "#A555F0",
          500: "#8A2BE2", // UV karaoke light
          600: "#6E1FB8",
        },
        // Day mode warm palette
        sun: {
          50: "#FFF7EC",
          100: "#FFEAC8",
          200: "#FFD394",
          300: "#FFB347",
          400: "#F08A2E",
        },
        platinum: "#A9A9A9",
      },
      fontFamily: {
        display: ["'Syne'", "'Clash Display'", "'Montserrat'", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["'Inter'", "'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "-0.03em",
        wider2: "0.18em",
        widest2: "0.32em",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
        snap: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        600: "600ms",
        900: "900ms",
        1200: "1200ms",
      },
      boxShadow: {
        neon: "0 0 24px rgba(255,0,127,0.55), 0 0 64px rgba(255,0,127,0.25)",
        "neon-soft": "0 0 16px rgba(255,0,127,0.35)",
        violet: "0 0 30px rgba(138,43,226,0.45)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -30px rgba(0,0,0,0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        flicker: {
          "0%,18%,22%,25%,53%,57%,100%": { opacity: "1" },
          "20%,24%,55%": { opacity: "0.55" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 18px rgba(255,0,127,0.35), 0 0 48px rgba(255,0,127,0.18)" },
          "50%": { boxShadow: "0 0 36px rgba(255,0,127,0.65), 0 0 96px rgba(255,0,127,0.35)" },
        },
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
