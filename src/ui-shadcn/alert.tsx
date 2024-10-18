import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "ui-relative ui-w-full ui-rounded-lg ui-border ui-border-neutral-200 ui-p-4 [&>svg~*]:ui-pl-7 [&>svg+div]:ui-translate-y-[-3px] [&>svg]:ui-absolute [&>svg]:ui-left-4 [&>svg]:ui-top-4 [&>svg]:ui-text-neutral-950 dark:ui-border-neutral-800 dark:[&>svg]:ui-text-neutral-50",
  {
    variants: {
      variant: {
        default: "ui-bg-white ui-text-neutral-950 dark:ui-bg-neutral-950 dark:ui-text-neutral-50",
        destructive:
          "ui-border-red-500/50 ui-text-red-500 dark:ui-border-red-500 [&>svg]:ui-text-red-500 dark:ui-border-red-900/50 dark:ui-text-red-900 dark:dark:ui-border-red-900 dark:[&>svg]:ui-text-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("ui-mb-1 ui-font-medium ui-leading-none ui-tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ui-text-sm [&_p]:ui-leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
