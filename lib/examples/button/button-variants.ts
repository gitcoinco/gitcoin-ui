import { cva, type VariantProps } from "class-variance-authority";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
  [
    "ui-font-semibold",
    "ui-border",
    "ui-rounded",
    "ui-shadow-sm",
    "ui-inline-flex",
    "ui-items-center",
    "ui-cursor-pointer",
    "ui-gap-1.5",
    "focus-visible:ui-outline",
    "focus-visible:ui-outline-2",
    "focus-visible:ui-outline-offset-2",
    "ui-transition-colors",
    "disabled:ui-opacity-50",
    "disabled:ui-cursor-not-allowed",
    "disabled:ui-pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "ui-bg-primary-600",
          "ui-text-white",
          "ui-border-transparent",
          "hover:ui-bg-primary-500",
          "active:ui-bg-primary-400",
        ],
        secondary: [
          "ui-bg-white",
          "ui-text-slate-900",
          "ui-border-slate-300",
          "hover:ui-bg-slate-50",
          "active:ui-bg-slate-100",
        ],
        destructive: [
          "ui-bg-danger-600",
          "ui-text-white",
          "ui-border-transparent",
          "hover:ui-bg-danger-500",
          "active:ui-bg-danger-400",
        ],
      },
      size: {
        small: ["ui-text-sm", "ui-px-2", "ui-py-1"],
        medium: ["ui-text-sm", "ui-px-2.5", "ui-py-1.5"],
        large: ["ui-text-sm", "ui-px-3", "ui-py-2"],
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "medium",
    },
  },
);
