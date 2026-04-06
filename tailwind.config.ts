import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3f9",
          100: "#d9e0f0",
          200: "#b3c1e0",
          300: "#8da2d1",
          400: "#6683c1",
          500: "#4064b2",
          600: "#33508e",
          700: "#1A2D5A",
          800: "#0F1B3D",
          900: "#0a1228",
          950: "#050914",
        },
        gold: {
          50: "#fefcf5",
          100: "#fdf5e0",
          200: "#faeab8",
          300: "#F0C75E",
          400: "#D4A843",
          500: "#b8922f",
          600: "#967625",
          700: "#745a1c",
          800: "#523f13",
          900: "#30250b",
        },
        cream: "#FAFAF8",
        charcoal: "#1E1E2E",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-lg": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "heading": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "subheading": ["1.25rem", { lineHeight: "1.4", letterSpacing: "0" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "slow-zoom": "slowZoom 20s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        counter: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
