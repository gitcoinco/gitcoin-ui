import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "ui-flex ui-min-h-[80px] ui-w-full ui-rounded-md ui-border ui-border-neutral-200 ui-bg-white ui-px-3 ui-py-2 ui-text-sm ui-ring-offset-white placeholder:ui-text-neutral-500 focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-neutral-950 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 dark:ui-border-neutral-800 dark:ui-bg-neutral-950 dark:ui-ring-offset-neutral-950 dark:placeholder:ui-text-neutral-400 dark:focus-visible:ui-ring-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
