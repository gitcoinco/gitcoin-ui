import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "ui-relative ui-flex ui-w-full ui-touch-none ui-select-none ui-items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="ui-relative ui-h-2 ui-w-full ui-grow ui-overflow-hidden ui-rounded-full ui-bg-neutral-100 dark:ui-bg-neutral-800">
      <SliderPrimitive.Range className="ui-absolute ui-h-full ui-bg-neutral-900 dark:ui-bg-neutral-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ui-block ui-h-5 ui-w-5 ui-rounded-full ui-border-2 ui-border-neutral-900 ui-bg-white ui-ring-offset-white ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-neutral-950 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-border-neutral-50 dark:ui-bg-neutral-950 dark:ui-ring-offset-neutral-950 dark:focus-visible:ui-ring-neutral-300" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
