import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "ui-peer ui-inline-flex ui-h-6 ui-w-11 ui-shrink-0 ui-cursor-pointer ui-items-center ui-rounded-full ui-border-2 ui-border-transparent ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-neutral-950 focus-visible:ui-ring-offset-2 focus-visible:ui-ring-offset-white disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-bg-neutral-900 data-[state=unchecked]:ui-bg-neutral-200 dark:focus-visible:ui-ring-neutral-300 dark:focus-visible:ui-ring-offset-neutral-950 dark:data-[state=checked]:ui-bg-neutral-50 dark:data-[state=unchecked]:ui-bg-neutral-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "ui-pointer-events-none ui-block ui-h-5 ui-w-5 ui-rounded-full ui-bg-white ui-shadow-lg ui-ring-0 ui-transition-transform data-[state=checked]:ui-translate-x-5 data-[state=unchecked]:ui-translate-x-0 dark:ui-bg-neutral-950"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
