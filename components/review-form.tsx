"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import InteractiveRatingStars from "@/components/ui/interactive-rating-stars"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner" // Import Spinner

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>
  agentName: string
}

export default function ReviewForm({ onSubmit, agentName }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) // Renamed from isLoading for clarity
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError("Please select a rating.")
      return
    }
    if (!comment.trim()) {
      setError("Please enter a comment.")
      return
    }
    setError(null)
    setIsSubmitting(true)
    try {
      await onSubmit(rating, comment)
      setRating(0)
      setComment("")
    } catch (err) {
      setError("Failed to submit review. Please try again.")
      console.error("Review submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a review for {agentName}</CardTitle>
        <CardDescription>Share your experience with this agent.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rating" className="mb-2 block font-medium">
              Your Rating <span className="text-red-500">*</span>
            </Label>
            <InteractiveRatingStars
              currentRating={rating}
              onRatingChange={setRating}
              size={28}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="comment" className="font-medium">
              Your Review <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`What did you like or dislike about ${agentName}?`}
              rows={4}
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={isSubmitting || rating === 0 || !comment.trim()}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
