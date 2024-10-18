import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "ui-fixed ui-top-0 ui-z-[100] ui-flex ui-max-h-screen ui-w-full ui-flex-col-reverse ui-p-4 sm:ui-bottom-0 sm:ui-right-0 sm:ui-top-auto sm:ui-flex-col md:ui-max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "ui-group ui-pointer-events-auto ui-relative ui-flex ui-w-full ui-items-center ui-justify-between ui-space-x-4 ui-overflow-hidden ui-rounded-md ui-border ui-border-neutral-200 ui-p-6 ui-pr-8 ui-shadow-lg ui-transition-all data-[swipe=cancel]:ui-translate-x-0 data-[swipe=end]:ui-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ui-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ui-transition-none data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[swipe=end]:ui-animate-out data-[state=closed]:ui-fade-out-80 data-[state=closed]:ui-slide-out-to-right-full data-[state=open]:ui-slide-in-from-top-full data-[state=open]:sm:ui-slide-in-from-bottom-full dark:ui-border-neutral-800",
  {
    variants: {
      variant: {
        default: "ui-border ui-bg-white ui-text-neutral-950 dark:ui-bg-neutral-950 dark:ui-text-neutral-50",
        destructive:
          "ui-destructive ui-group ui-border-red-500 ui-bg-red-500 ui-text-neutral-50 dark:ui-border-red-900 dark:ui-bg-red-900 dark:ui-text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "ui-inline-flex ui-h-8 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-md ui-border ui-border-neutral-200 ui-bg-transparent ui-px-3 ui-text-sm ui-font-medium ui-ring-offset-white ui-transition-colors hover:ui-bg-neutral-100 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-neutral-950 focus:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 group-[.destructive]:ui-border-neutral-100/40 group-[.destructive]:hover:ui-border-red-500/30 group-[.destructive]:hover:ui-bg-red-500 group-[.destructive]:hover:ui-text-neutral-50 group-[.destructive]:focus:ui-ring-red-500 dark:ui-border-neutral-800 dark:ui-ring-offset-neutral-950 dark:hover:ui-bg-neutral-800 dark:focus:ui-ring-neutral-300 dark:group-[.destructive]:ui-border-neutral-800/40 dark:group-[.destructive]:hover:ui-border-red-900/30 dark:group-[.destructive]:hover:ui-bg-red-900 dark:group-[.destructive]:hover:ui-text-neutral-50 dark:group-[.destructive]:focus:ui-ring-red-900",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "ui-absolute ui-right-2 ui-top-2 ui-rounded-md ui-p-1 ui-text-neutral-950/50 ui-opacity-0 ui-transition-opacity hover:ui-text-neutral-950 focus:ui-opacity-100 focus:ui-outline-none focus:ui-ring-2 group-hover:ui-opacity-100 group-[.destructive]:ui-text-red-300 group-[.destructive]:hover:ui-text-red-50 group-[.destructive]:focus:ui-ring-red-400 group-[.destructive]:focus:ui-ring-offset-red-600 dark:ui-text-neutral-50/50 dark:hover:ui-text-neutral-50",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="ui-h-4 ui-w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("ui-text-sm ui-font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("ui-text-sm ui-opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
