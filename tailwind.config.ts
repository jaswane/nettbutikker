import type { Config } from "tailwindcss";

/**
 * Custom design system for Nettbutikker.no.
 * Tokens are intentionally distinct from Tailwind defaults so the UI does not
 * read as "generic Tailwind/SaaS". Colors are driven by CSS variables declared
 * in globals.css to keep a single source of truth.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Replace the default palette entirely with our nordic tokens.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      paper: "rgb(var(--paper) / <alpha-value>)",
      surface: "rgb(var(--surface) / <alpha-value>)",
      ink: {
        DEFAULT: "rgb(var(--ink) / <alpha-value>)",
        soft: "rgb(var(--ink-soft) / <alpha-value>)",
        muted: "rgb(var(--ink-muted) / <alpha-value>)",
        faint: "rgb(var(--ink-faint) / <alpha-value>)",
      },
      line: {
        DEFAULT: "rgb(var(--line) / <alpha-value>)",
        strong: "rgb(var(--line-strong) / <alpha-value>)",
      },
      accent: {
        DEFAULT: "rgb(var(--accent) / <alpha-value>)",
        soft: "rgb(var(--accent-soft) / <alpha-value>)",
        ink: "rgb(var(--accent-ink) / <alpha-value>)",
      },
      gold: "rgb(var(--gold) / <alpha-value>)",
      button: "rgb(var(--button) / <alpha-value>)",
      ok: "rgb(var(--ok) / <alpha-value>)",
      warn: "rgb(var(--warn) / <alpha-value>)",
      bad: "rgb(var(--bad) / <alpha-value>)",
    },
    // Flat editorial identity – sharp corners on all surfaces. `pill` is kept
    // only for genuine dots/markers, never for buttons, chips or panels.
    borderRadius: {
      none: "0",
      sm: "0",
      md: "0",
      lg: "0",
      xl: "0",
      pill: "999px",
    },
    // Soft, wide shadows so surfaces read as paper, not outlined cards.
    // Slightly lifted (~12%) so white panels separate cleanly from the sand bg.
    boxShadow: {
      none: "none",
      soft: "0 1px 2px rgba(17, 24, 39, 0.04), 0 12px 30px -8px rgba(17, 24, 39, 0.09)",
      lift: "0 2px 6px rgba(17, 24, 39, 0.05), 0 26px 58px -16px rgba(17, 24, 39, 0.14)",
      focus: "0 0 0 4px var(--accent-ring)",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      maxWidth: {
        prose: "62ch",
        page: "1120px",
        narrow: "720px",
      },
      letterSpacing: {
        tightish: "-0.02em",
        tighter2: "-0.035em",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "sheet-up": "sheet-up 0.28s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
