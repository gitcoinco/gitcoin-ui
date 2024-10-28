import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "outlined-error"
  | "outlined-success"
  | "outlined-primary"
  | "outlined-disabled"
  | "disabled"
  | undefined;

export type ButtonSizes = "default" | undefined;

const buttonVariants = tv({
  base: "inline-flex h-[32px] items-center justify-center gap-6 whitespace-nowrap rounded-[8px] px-[12px] py-[8px] font-mono text-[14px] font-medium leading-[16px] ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950",
  variants: {
    variant: {
      primary: "border-brand bg-brand text-white",
      secondary: "border-neutral-100 bg-neutral-100 text-black",
      error: "border-orange-50 bg-orange-50 text-orange-600",
      success: "border-moss-50 bg-moss-50 text-moss-300",
      "outlined-error": "border-2 border-orange-600 bg-orange-50 text-orange-600", // Add border width
      "outlined-success": "border-2 border-moss-300 bg-moss-50 text-moss-300", // Add border width
      "outlined-primary": "border-2 border-brand bg-white text-brand", // Add border width
      disabled: "border-neutral-100 bg-neutral-100 text-neutral-600",
      "outlined-disabled": "border-2 border-neutral-600 bg-white text-neutral-600", // Add border width
    },
    size: {
      default: "h-[32px] px-[12px] py-[8px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const appliedVariant = disabled
      ? variant?.startsWith("outlined")
        ? "outlined-disabled"
        : "disabled"
      : variant;

    return (
      <Comp
        className={cn(buttonVariants({ variant: appliedVariant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
