import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { tv } from "tailwind-variants";

export type ProgressVariants = "default" | "green";

const progressVariants = tv({
  slots: {
    root: "relative h-4 w-full overflow-hidden rounded-full",
    indicator: "size-full flex-1 transition-all",
  },
  variants: {
    variant: {
      default: {
        root: "bg-grey-100 dark:bg-black",
        indicator: "bg-black dark:bg-grey-50",
      },
      green: {
        root: "bg-grey-100",
        indicator: "bg-moss-700",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "green";
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  const { root, indicator } = progressVariants({ variant });

  return (
    <ProgressPrimitive.Root ref={ref} className={`${root()} ${className}`} {...props}>
      <ProgressPrimitive.Indicator
        className={indicator()}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
