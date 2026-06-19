import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-sunken": "var(--color-surface-sunken)",
        ink: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        line: "var(--color-border)",
        "line-strong": "var(--color-border-strong)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          pressed: "var(--color-accent-pressed)",
          subtle: "var(--color-accent-subtle)",
          on: "var(--color-accent-on)",
        },
        footer: {
          bg: "var(--color-footer-bg)",
          text: "var(--color-footer-text)",
          muted: "var(--color-footer-muted)",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          "Iowan Old Style",
          "Palatino",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        measure: "68ch",
        container: "46rem",
        "container-wide": "65rem",
        "container-bleed": "80rem",
      },
      letterSpacing: {
        tightish: "-0.015em",
        overline: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
