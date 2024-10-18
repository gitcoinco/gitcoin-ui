import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:ui-cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ui-flex ui-items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "ui-relative ui-flex ui-h-10 ui-w-10 ui-items-center ui-justify-center ui-border-y ui-border-r ui-border-neutral-200 ui-text-sm ui-transition-all first:ui-rounded-l-md first:ui-border-l last:ui-rounded-r-md dark:ui-border-neutral-800",
        isActive && "ui-z-10 ui-ring-2 ui-ring-neutral-950 ui-ring-offset-white dark:ui-ring-neutral-300 dark:ui-ring-offset-neutral-950",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="ui-pointer-events-none ui-absolute ui-inset-0 ui-flex ui-items-center ui-justify-center">
          <div className="ui-h-4 ui-w-px ui-animate-caret-blink ui-bg-neutral-950 ui-duration-1000 dark:ui-bg-neutral-50" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
