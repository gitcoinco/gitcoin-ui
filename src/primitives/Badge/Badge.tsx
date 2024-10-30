import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

export type BadgeVariants =
  | "info"
  | "success"
  | "warning"
  | "success-strong"
  | "warning-strong"
  | "info-strong"
  | "outlined-info"
  | "outlined-success"
  | "outlined-warning"
  | "outlined-success-strong"
  | "outlined-warning-strong"
  | "outlined-info-strong"
  | undefined;

const badgeVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[20px] px-[12px] py-[2px] font-mono text-[12px] font-normal leading-[18px] text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-neutral-950",
  variants: {
    variant: {
      info: "border-transparent bg-yellow-100",
      success: "border-transparent bg-green-100",
      warning: "border-transparent bg-orange-100",
      // error: "border-transparent bg-orange-300",
      "success-strong": "border-transparent bg-green-300",
      "warning-strong": "border-transparent bg-orange-300",
      "info-strong": "border-transparent bg-yellow-300",
      "outlined-info": "border-2 border-yellow-100 bg-white",
      "outlined-success": "border-2 border-green-100 bg-white",
      "outlined-warning": "border-2 border-orange-100 bg-white",
      // "outlined-error": "border-2 border-orange-300 bg-white",
      "outlined-success-strong": "border-2 border-green-300 bg-white",
      "outlined-warning-strong": "border-2 border-orange-300 bg-white",
      "outlined-info-strong": "border-2 border-yellow-300 bg-white",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export enum BadgeSizes {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  size?: BadgeSizes | string; // Custom size can be a string (like '300px')
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "info", size = "sm", ...props }, ref) => {
    const getSize = (size: string) => {
      switch (size) {
        case "xs":
          return "min-w-[68px]";
        case "sm":
          return "min-w-[82px]";
        case "md":
          return "min-w-[112px]";
        case "lg":
          return "min-w-[142px]";
        default:
          return `min-w-[${size}]`;
      }
    };

    const sizeClass = getSize(size);

    return (
      <div className={cn(badgeVariants({ variant }), sizeClass, className)} ref={ref} {...props} />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
