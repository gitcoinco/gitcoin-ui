import type { Config } from "tailwindcss";
import { colors } from "./lib/tokens/colors";

export default {
  prefix: "ui-",
  content: ["./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", "[data-mode='dark']"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "monospace"],
      },
      colors,
    },
  },
  plugins: [],
} satisfies Config;
