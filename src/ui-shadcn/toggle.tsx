import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-text-sm ui-font-medium ui-ring-offset-white ui-transition-colors hover:ui-bg-neutral-100 hover:ui-text-neutral-500 focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-neutral-950 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 data-[state=on]:ui-bg-neutral-100 data-[state=on]:ui-text-neutral-900 dark:ui-ring-offset-neutral-950 dark:hover:ui-bg-neutral-800 dark:hover:ui-text-neutral-400 dark:focus-visible:ui-ring-neutral-300 dark:data-[state=on]:ui-bg-neutral-800 dark:data-[state=on]:ui-text-neutral-50",
  {
    variants: {
      variant: {
        default: "ui-bg-transparent",
        outline:
          "ui-border ui-border-neutral-200 ui-bg-transparent hover:ui-bg-neutral-100 hover:ui-text-neutral-900 dark:ui-border-neutral-800 dark:hover:ui-bg-neutral-800 dark:hover:ui-text-neutral-50",
      },
      size: {
        default: "ui-h-10 ui-px-3",
        sm: "ui-h-9 ui-px-2.5",
        lg: "ui-h-11 ui-px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
