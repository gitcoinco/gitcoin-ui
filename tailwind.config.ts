import type { Config } from "tailwindcss";

export default {
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "[data-mode='dark']"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
