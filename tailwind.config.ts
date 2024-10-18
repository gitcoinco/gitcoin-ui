import type { Config } from "tailwindcss";
import { colors } from "./src/tokens/colors";

export default {
  prefix: "ui-",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", "[data-mode='dark']"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
