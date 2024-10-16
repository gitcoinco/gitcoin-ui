import type { Config } from "tailwindcss";

export default {
  prefix: "ui-",
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "[data-mode='dark']"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
