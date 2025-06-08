"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface InteractiveRatingStarsProps {
  maxRating?: number
  currentRating: number
  onRatingChange: (rating: number) => void
  size?: number
  className?: string
  starClassName?: string
  disabled?: boolean
}

export default function InteractiveRatingStars({
  maxRating = 5,
  currentRating,
  onRatingChange,
  size = 24,
  className,
  starClassName,
  disabled = false,
}: InteractiveRatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <Button
            key={ratingValue}
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "p-0 h-auto w-auto hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
              disabled && "cursor-not-allowed opacity-70",
            )}
            onClick={() => !disabled && onRatingChange(ratingValue)}
            onMouseEnter={() => !disabled && setHoverRating(ratingValue)}
            onMouseLeave={() => !disabled && setHoverRating(null)}
            disabled={disabled}
            aria-label={`Rate ${ratingValue} out of ${maxRating} stars`}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                ratingValue <= (hoverRating || currentRating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600",
                starClassName,
              )}
            />
          </Button>
        )
      })}
    </div>
  )
}
