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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  disabled?: boolean;
  asChild?: boolean;
  value?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export type ButtonSizes = "default" | "sm" | "md" | "lg" | "icon" | undefined;

const buttonVariants = tv({
  base: "inline-flex h-[32px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-[12px] py-[8px] font-mono text-[14px] font-medium leading-[16px] ring-offset-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-neutral-950",
  variants: {
    variant: {
      primary: "border-brand bg-brand text-white",
      secondary: "border-neutral-100 bg-neutral-100 text-black",
      error: "border-red-50 bg-red-50 text-red-700",
      success: "border-moss-50 bg-moss-50 text-moss-700",
      "outlined-error": "border-2 border-red-700 text-red-900",
      "outlined-success": "border-2 border-moss-500 text-moss-700",
      "outlined-primary": "border-2 border-brand bg-white text-brand",
      "outlined-secondary": "border-2 border-neutral-600 bg-white text-black",
      disabled: "border-neutral-100 bg-neutral-100 text-neutral-600",
      "outlined-disabled": "border-2 border-neutral-600 bg-white text-neutral-600",
      "outlined-error-filled": "border-2 border-red-700 bg-red-50 text-red-900",
      "outlined-success-filled": "border-2 border-moss-500 bg-moss-50 text-moss-700",
    },
    size: {
      sm: "h-[24px] px-[8px] py-[6px]",
      md: "h-[32px] px-[12px] py-[8px]",
      lg: "h-[40px] px-[16px] py-[10px]",
      icon: "size-32 p-0",
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
      size = "default",
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
        className={cn(
          buttonVariants({
            variant: appliedVariant as ButtonVariants,
            size: size as ButtonSizes,
            className,
          }),
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === "left" && <span>{icon}</span>}
        {value && <span className={cn(icon ? "" : "mt-0.5", "font-mono")}>{value}</span>}
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
