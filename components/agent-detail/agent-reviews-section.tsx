"use client"

import type { Agent } from "@/interfaces"
import ReviewCard from "@/components/review-card"
import ReviewForm from "@/components/review-form"
import RatingStars from "@/components/ui/rating-stars"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress" // For rating distribution

interface AgentReviewsSectionProps {
  agent: Agent
  onSubmitReview: (rating: number, comment: string) => Promise<void>
}

export default function AgentReviewsSection({ agent, onSubmitReview }: AgentReviewsSectionProps) {
  const reviews = agent.reviews || []
  const averageRating = agent.averageRating || 0
  const ratingCount = agent.ratingCount || 0

  // Calculate rating distribution (example)
  const ratingDistribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((review) => {
    if (ratingDistribution[review.rating] !== undefined) {
      ratingDistribution[review.rating]++
    }
  })

  return (
    <section aria-labelledby="agent-reviews-heading">
      <Card>
        <CardHeader>
          <CardTitle id="agent-reviews-heading" className="text-xl sm:text-2xl font-semibold">
            Ratings & Reviews
          </CardTitle>
          {ratingCount > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
              <div className="flex flex-col">
                <RatingStars rating={averageRating} size={18} />
                <span className="text-xs text-muted-foreground">{ratingCount} Ratings</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {ratingCount > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm font-medium mb-2">Rating Distribution</h3>
              <div className="space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-8 text-muted-foreground">{star} star</span>
                    <Progress
                      value={ratingCount > 0 ? (ratingDistribution[star] / ratingCount) * 100 : 0}
                      className="h-2 flex-1"
                      aria-label={`${ratingDistribution[star]} ratings for ${star} stars`}
                    />
                    <span className="w-10 text-right text-muted-foreground">{ratingDistribution[star]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reviews.length > 0 ? (
            <div className="space-y-4 mb-6 sm:mb-8">
              {reviews.slice(0, 3).map(
                (
                  review, // Show first 3 reviews, add pagination/load more later
                ) => (
                  <ReviewCard key={review.id} review={review} />
                ),
              )}
              {reviews.length > 3 && (
                <p className="text-sm text-center text-primary hover:underline cursor-pointer">
                  Show all {reviews.length} reviews
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-6">No reviews yet for this agent.</p>
          )}
          <ReviewForm onSubmit={onSubmitReview} agentName={agent.name} />
        </CardContent>
      </Card>
    </section>
  )
}
