import type { Review } from "@/interfaces"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RatingStars from "@/components/ui/rating-stars"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Using Card for structure

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={review.userAvatarUrl || `/placeholder.svg?height=40&width=40&query=${review.userName.charAt(0)}`}
            alt={review.userName}
          />
          <AvatarFallback>{review.userName.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">{review.userName}</CardTitle>
          <div className="flex items-center gap-2">
            <RatingStars rating={review.rating} size={14} />
            <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  )
}
