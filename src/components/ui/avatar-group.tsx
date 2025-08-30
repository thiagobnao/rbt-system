"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{
    src?: string
    alt?: string
    fallback: string
  }>
  max?: number
  size?: "sm" | "md" | "lg"
  spacing?: "tight" | "normal" | "loose"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 5, size = "md", spacing = "normal", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10", 
      lg: "h-12 w-12"
    }

    const spacingClasses = {
      tight: "-ml-1",
      normal: "-ml-2",
      loose: "-ml-3"
    }

    const displayedAvatars = avatars.slice(0, max)
    const remainingCount = avatars.length - max

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {displayedAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            className={cn(
              sizeClasses[size],
              spacingClasses[spacing],
              "ring-2 ring-background"
            )}
          >
            <AvatarImage src={avatar.src} alt={avatar.alt} />
            <AvatarFallback className="text-xs">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        ))}
        
        {remainingCount > 0 && (
          <Avatar
            className={cn(
              sizeClasses[size],
              spacingClasses[spacing],
              "ring-2 ring-background bg-muted"
            )}
          >
            <AvatarFallback className="text-xs font-medium">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
