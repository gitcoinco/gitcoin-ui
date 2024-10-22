import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ui-animate-pulse ui-bg-neutral-200 dark:ui-bg-neutral-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
