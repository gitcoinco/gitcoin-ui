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
  | "outlined-secondary"
  | "outlined-disabled"
  | "disabled"
  | undefined;

export type ButtonSizes = "default" | undefined;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  asChild?: boolean;
  value?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const buttonVariants = tv({
  base: "inline-flex h-[32px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-[12px] py-[8px] font-mono text-[14px] font-medium leading-[16px] ring-offset-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950",
  variants: {
    variant: {
      primary: "border-brand bg-brand text-white",
      secondary: "border-neutral-100 bg-neutral-100 text-black",
      error: "border-orange-50 bg-orange-50 text-orange-600",
      success: "border-moss-50 bg-moss-50 text-moss-300",
      "outlined-error": "border-2 border-orange-600 bg-orange-50 text-orange-600",
      "outlined-success": "border-2 border-moss-300 bg-moss-50 text-moss-300",
      "outlined-primary": "border-2 border-brand bg-white text-brand",
      "outlined-secondary": "border-2 border-neutral-600 bg-white text-neutral-600",
      disabled: "border-neutral-100 bg-neutral-100 text-neutral-600",
      "outlined-disabled": "border-2 border-neutral-600 bg-white text-neutral-600",
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
  (
    {
      className,
      variant,
      size,
      disabled,
      asChild = false,
      value,
      icon,
      iconPosition = "left",
      ...props
    },
    ref,
  ) => {
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
      >
        {icon && iconPosition === "left" && <span>{icon}</span>}
        {value && <span className={icon ? "" : "mt-0.5"}>{value}</span>}
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };