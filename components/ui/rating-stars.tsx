import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: number
  className?: string
  starClassName?: string
  showEmptyStars?: boolean
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = 16,
  className,
  starClassName,
  showEmptyStars = true,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = showEmptyStars ? maxRating - fullStars - halfStar : 0

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} fill="currentColor" size={size} className={cn("text-yellow-400", starClassName)} />
        ))}
      {halfStar === 1 && (
        <StarHalf key="half" fill="currentColor" size={size} className={cn("text-yellow-400", starClassName)} />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          // Using StarOff or a styled Star for empty
          <Star key={`empty-${i}`} size={size} className={cn("text-gray-300 dark:text-gray-600", starClassName)} />
        ))}
    </div>
  )
}
