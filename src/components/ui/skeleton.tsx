import { cn } from "@/lib/utils"

const skeletonVariants = {
  size: {
    sm: "h-4",
    default: "h-6",
    lg: "h-8",
    xl: "h-12",
    "2xl": "h-16",
  },
  variant: {
    default: "bg-muted/50",
    subtle: "bg-muted/30",
  },
}

function Skeleton({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof skeletonVariants.size
  variant?: keyof typeof skeletonVariants.variant
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md",
        skeletonVariants.size[size],
        skeletonVariants.variant[variant],
        className
      )}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
