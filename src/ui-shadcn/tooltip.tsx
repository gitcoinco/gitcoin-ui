import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "ui-z-50 ui-overflow-hidden ui-rounded-md ui-border ui-border-neutral-200 ui-bg-white ui-px-3 ui-py-1.5 ui-text-sm ui-text-neutral-950 ui-shadow-md ui-animate-in ui-fade-in-0 ui-zoom-in-95 data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out-0 data-[state=closed]:ui-zoom-out-95 data-[side=bottom]:ui-slide-in-from-top-2 data-[side=left]:ui-slide-in-from-right-2 data-[side=right]:ui-slide-in-from-left-2 data-[side=top]:ui-slide-in-from-bottom-2 dark:ui-border-neutral-800 dark:ui-bg-neutral-950 dark:ui-text-neutral-50",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
