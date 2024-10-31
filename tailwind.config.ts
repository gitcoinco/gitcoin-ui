import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

import { colors } from "./src/tokens/colors";

export default withTV({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", "[data-mode='dark']"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: colors,
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      aspectRatio: {
        "3/1": "3 / 1",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}) satisfies Config;
