import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("ui-grid ui-gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "ui-aspect-square ui-h-4 ui-w-4 ui-rounded-full ui-border ui-border-neutral-200 ui-border-neutral-900 ui-text-neutral-900 ui-ring-offset-white focus:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-neutral-950 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 dark:ui-border-neutral-800 dark:ui-border-neutral-50 dark:ui-text-neutral-50 dark:ui-ring-offset-neutral-950 dark:focus-visible:ui-ring-neutral-300",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="ui-flex ui-items-center ui-justify-center">
        <Circle className="ui-h-2.5 ui-w-2.5 ui-fill-current ui-text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
