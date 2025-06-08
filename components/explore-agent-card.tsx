"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import RatingStars from "@/components/ui/rating-stars"
import { CheckCircle, Download, Palette, Briefcase, ExternalLink } from "lucide-react"
import type { Agent } from "@/interfaces"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface ExploreAgentCardProps {
  agent: Agent
  onInstall: (agentId: string) => Promise<void> // "Install" now means activate/enable
  className?: string
  isInstallPending?: boolean
}

export default function ExploreAgentCard({
  agent,
  onInstall,
  className,
  isInstallPending = false,
}: ExploreAgentCardProps) {
  const handleCardAction = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInstallPending || agent.isInstalled || agent.billingType === "contact-sales") return

    // For free or pay-as-you-go agents, "install" means activate.
    await onInstall(agent.id)
  }

  let buttonText = "Details"
  let ButtonIcon: React.ElementType = CheckCircle
  let buttonVariant: "default" | "secondary" | "outline" = "default"
  let actionDisabled = false
  let titleAction = `View details for ${agent.name}`

  if (isInstallPending) {
    buttonText = "Processing..."
    ButtonIcon = Spinner
    actionDisabled = true
    titleAction = "Processing activation..."
  } else if (agent.isInstalled) {
    buttonText = "Active" // Changed from "Installed"
    ButtonIcon = CheckCircle
    buttonVariant = "secondary"
    actionDisabled = true
    titleAction = `${agent.name} is active`
  } else {
    switch (agent.billingType) {
      case "free":
        buttonText = "Activate" // Changed from "Get"
        ButtonIcon = Download
        buttonVariant = "default"
        titleAction = `Activate ${agent.name} for free`
        break
      case "pay-as-you-go":
        buttonText = "Activate"
        ButtonIcon = Briefcase // Or another icon representing usage
        buttonVariant = "default"
        titleAction = `Activate ${agent.name} (Pay-as-you-go)`
        break
      case "contact-sales":
        buttonText = "Contact Sales"
        ButtonIcon = ExternalLink
        buttonVariant = "outline"
        actionDisabled = true // Or link to a contact page
        titleAction = `Contact sales for ${agent.name}`
        break
      default:
        buttonText = "Details"
        actionDisabled = true
        break
    }
  }

  return (
    <Link href={`/explore/${agent.id}`} className="block group">
      <Card
        className={cn(
          "h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-xl dark:group-hover:shadow-primary/20",
          className,
        )}
      >
        <CardHeader className="p-0 relative">
          <div className="aspect-[16/9] w-full relative overflow-hidden rounded-t-lg">
            <Image
              src={agent.bannerImageUrl || `https://picsum.photos/seed/${agent.id}-banner/400/225`}
              alt={`${agent.name} banner`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            {agent.category && (
              <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-black/30 text-white">
                <Palette size={12} className="mr-1" />
                {agent.category}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4 flex-grow">
          <div className="flex items-start gap-3">
            <Image
              src={agent.avatarUrl || `https://picsum.photos/seed/${agent.id}-avatar/40/40`}
              alt={agent.name}
              width={40}
              height={40}
              className="rounded-md border"
            />
            <div className="flex-1">
              <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-primary">
                {agent.name}
              </CardTitle>
              {agent.developerName && <p className="text-xs text-muted-foreground mt-0.5">By {agent.developerName}</p>}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">{agent.description}</p>
          {agent.averageRating !== undefined && agent.ratingCount !== undefined && agent.ratingCount > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <RatingStars rating={agent.averageRating} size={14} />
              <span className="text-xs text-muted-foreground">({agent.ratingCount})</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-3 pb-4 flex-col items-center">
          <Button
            variant={buttonVariant}
            size="sm"
            className="w-full"
            onClick={handleCardAction}
            disabled={actionDisabled}
            aria-label={titleAction}
          >
            {isInstallPending ? (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ButtonIcon className="mr-2 h-4 w-4" />
            )}
            {buttonText}
          </Button>
          {agent.billingType === "pay-as-you-go" && (
            <p className="text-xs text-muted-foreground mt-1">Usage-based pricing</p>
          )}
          {agent.billingType === "contact-sales" && (
            <p className="text-xs text-muted-foreground mt-1">Enterprise pricing</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
