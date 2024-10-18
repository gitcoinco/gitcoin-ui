import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ui-peer ui-h-4 ui-w-4 ui-shrink-0 ui-rounded-sm ui-border ui-border-neutral-200 ui-border-neutral-900 ui-ring-offset-white focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-neutral-950 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-bg-neutral-900 data-[state=checked]:ui-text-neutral-50 dark:ui-border-neutral-800 dark:ui-border-neutral-50 dark:ui-ring-offset-neutral-950 dark:focus-visible:ui-ring-neutral-300 dark:data-[state=checked]:ui-bg-neutral-50 dark:data-[state=checked]:ui-text-neutral-900",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("ui-flex ui-items-center ui-justify-center ui-text-current")}
    >
      <Check className="ui-h-4 ui-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
