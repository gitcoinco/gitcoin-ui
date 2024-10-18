import { cva, type VariantProps } from "class-variance-authority";

export type Variations = ["primary", "information", "success", "warning", "danger"];

export type CalloutVariants = VariantProps<typeof calloutVariants>;

const variant = {
  primary: [
    "ui-bg-primary-200",
    "ui-border-primary-500",
    "ui-text-primary-900",
    "dark:ui-bg-primary-800",
    "dark:ui-border-primary-900",
    "dark:ui-text-primary-50",
  ],
  information: [
    "ui-bg-information-200",
    "ui-border-information-500",
    "ui-text-information-900",
    "dark:ui-bg-information-800",
    "dark:ui-border-information-900",
    "dark:ui-text-information-50",
  ],
  success: [
    "ui-bg-success-200",
    "ui-border-success-500",
    "ui-text-success-900",
    "dark:ui-bg-success-800",
    "dark:ui-border-success-900",
    "dark:ui-text-success-50",
  ],
  warning: [
    "ui-bg-warning-200",
    "ui-border-warning-500",
    "ui-text-warning-900",
    "dark:ui-bg-warning-800",
    "dark:ui-border-warning-900",
    "dark:ui-text-warning-50",
  ],
  danger: [
    "ui-bg-danger-200",
    "ui-border-danger-500",
    "ui-text-danger-900",
    "dark:ui-bg-danger-800",
    "dark:ui-border-danger-900",
    "dark:ui-text-danger-50",
  ],
};

export const calloutVariants = cva(
  ["ui-p-4", "ui-rounded-lg", "ui-border", "ui-shadow-md", "ui-space-y-8"],
  {
    variants: {
      variant,
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
