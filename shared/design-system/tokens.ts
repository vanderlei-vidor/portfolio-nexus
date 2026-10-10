/**
 * Portfolio Nexus — Official Design Tokens & Visual Identity System
 * Centralized token registry aligned with Tailwind v4 in styles/globals.css
 * and specified in docs/PORTFOLIO_NEXUS_ROADMAP_PRODUCTION.md
 */

export const tokens = {
  colors: {
    background: "#0b0b0b",
    foreground: "#ededed",
    foregroundMuted: "#a1a1aa",
    focus: "#93c5fd",
    accent: {
      rgb: "124, 58, 237",
      hex: "#7c3aed",
      glow: "rgba(124, 58, 237, 0.5)",
    },
    surface: {
      card: "rgba(255, 255, 255, 0.035)",
      cardHover: "rgba(255, 255, 255, 0.055)",
      cardBorder: "rgba(255, 255, 255, 0.08)",
      buttonSecondary: "rgba(255, 255, 255, 0.045)",
      buttonBorder: "rgba(255, 255, 255, 0.14)",
      backdropBlur: "18px",
    },
    button: {
      primaryBg: "#ffffff",
      primaryText: "#020617",
      primaryBorder: "rgba(255, 255, 255, 0.72)",
      primaryShadow: "0 12px 34px rgba(255, 255, 255, 0.12)",
    },
  },
  typography: {
    fonts: {
      sans: "var(--font-geist-sans), system-ui, sans-serif",
      mono: "var(--font-geist-mono), monospace",
    },
    fluid: {
      hero: "clamp(3.5rem, 11vw, 8.5rem)",
      paragraph: "clamp(1.1rem, 2vw, 1.45rem)",
      button: "clamp(0.85rem, 1vw, 1rem)",
      xs: "clamp(0.75rem, 1vw, 0.85rem)",
    },
  },
  spacing: {
    fluid: {
      layout: "clamp(1.5rem, 6vw, 7.5rem)",
      gapSm: "clamp(1.5rem, 4vw, 3rem)",
      gapMd: "clamp(2.5rem, 6vw, 5.5rem)",
      btnX: "clamp(1.75rem, 3vw, 3.2rem)",
      btnY: "clamp(0.95rem, 2vw, 1.25rem)",
    },
  },
  motion: {
    fast: {
      duration: 0.18,
    },
    standard: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
    reduced: {
      duration: 0,
    },
  },
} as const;

export type DesignTokens = typeof tokens;
