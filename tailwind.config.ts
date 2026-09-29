import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          900: "#141110",
          800: "#1C1817",
          700: "#252120",
        },
        gold: {
          DEFAULT: "#C9A45C",
          hl: "#EAC786",
          sh: "#B59654",
          50: "#FBF6EC",
          100: "#F4E9D1",
        },
        warm: {
          surface: "#FAF6EE",
          text: "#1C1817",
          muted: "#6B6158",
          paper: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "#C9A45C",
        "gold-gradient-vert":
          "#C9A45C",
      },
      boxShadow: {
        gold: "0 4px 14px 0 rgba(201, 164, 92, 0.25)",
        "gold-lg": "0 10px 30px -8px rgba(201, 164, 92, 0.35)",
      },
      maxWidth: {
        content: "1280px",
      },
      spacing: {
        section: "6rem",
        "section-lg": "10rem",
      },
      letterSpacing: {
        widgold: "0.12em",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
        shimmer: "shimmer 2s linear infinite",
        "typing-bounce": "typingBounce 1.1s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        typingBounce: {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
