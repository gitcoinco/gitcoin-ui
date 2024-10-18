import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "ui-inline-flex ui-items-center ui-rounded-full ui-border ui-border-neutral-200 ui-px-2.5 ui-py-0.5 ui-text-xs ui-font-semibold ui-transition-colors focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-neutral-950 focus:ui-ring-offset-2 dark:ui-border-neutral-800 dark:focus:ui-ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "ui-border-transparent ui-bg-neutral-900 ui-text-neutral-50 hover:ui-bg-neutral-900/80 dark:ui-bg-neutral-50 dark:ui-text-neutral-900 dark:hover:ui-bg-neutral-50/80",
        secondary:
          "ui-border-transparent ui-bg-neutral-100 ui-text-neutral-900 hover:ui-bg-neutral-100/80 dark:ui-bg-neutral-800 dark:ui-text-neutral-50 dark:hover:ui-bg-neutral-800/80",
        destructive:
          "ui-border-transparent ui-bg-red-500 ui-text-neutral-50 hover:ui-bg-red-500/80 dark:ui-bg-red-900 dark:ui-text-neutral-50 dark:hover:ui-bg-red-900/80",
        outline: "ui-text-neutral-950 dark:ui-text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
