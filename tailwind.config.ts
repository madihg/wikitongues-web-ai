import type { Config } from "tailwindcss";
import { wtThemeExtend } from "./styles/tailwind.site";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: { extend: wtThemeExtend },
  plugins: [],
};

export default config;
