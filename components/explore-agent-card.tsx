"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RatingStars from "@/components/ui/rating-stars";
import {
  CheckCircle,
  Download,
  Palette,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import type { Agent } from "@/interfaces";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface ExploreAgentCardProps {
  agent: Agent;
  onInstall: (agentId: string) => Promise<void>;
  className?: string;
  isInstallPending?: boolean;
}

export default function ExploreAgentCard({
  agent,
  onInstall,
  className,
  isInstallPending = false,
}: ExploreAgentCardProps) {
  const handleCardAction = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      isInstallPending ||
      agent.isInstalled ||
      agent.billingType === "contact-sales"
    )
      return;

    await onInstall(agent.id);
  };

  // Determine button properties based on agent state
  const buttonConfig = (() => {
    if (isInstallPending) {
      return {
        text: "Processing...",
        icon: Spinner,
        variant: "default" as const,
        disabled: true,
        titleAction: "Processing activation...",
      };
    }

    if (agent.isInstalled) {
      return {
        text: "Active",
        icon: CheckCircle,
        variant: "secondary" as const,
        disabled: true,
        titleAction: `${agent.name} is active`,
      };
    }

    switch (agent.billingType) {
      case "free":
        return {
          text: "Activate",
          icon: Download,
          variant: "default" as const,
          disabled: false,
          titleAction: `Activate ${agent.name} for free`,
        };
      case "pay-as-you-go":
        return {
          text: "Activate",
          icon: Briefcase,
          variant: "default" as const,
          disabled: false,
          titleAction: `Activate ${agent.name} (Pay-as-you-go)`,
        };
      case "contact-sales":
        return {
          text: "Contact Sales",
          icon: ExternalLink,
          variant: "outline" as const,
          disabled: true,
          titleAction: `Contact sales for ${agent.name}`,
        };
      default:
        return {
          text: "Details",
          icon: ExternalLink,
          variant: "default" as const,
          disabled: true,
          titleAction: `View details for ${agent.name}`,
        };
    }
  })();

  return (
    <Link href={`/explore/${agent.id}`} className="block group h-full">
      <Card
        className={cn(
          "h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-xl dark:group-hover:shadow-primary/20",
          className
        )}
      >
        {/* Fixed-height banner area */}
        <CardHeader className="p-0 relative h-32 md:h-40">
          <div className="w-full h-full relative overflow-hidden rounded-t-lg">
            <Image
              src={
                agent.bannerImageUrl ||
                `https://picsum.photos/seed/${agent.id}-banner/400/225`
              }
              alt={`${agent.name} banner`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          {agent.category && (
            <div className="absolute bottom-0 left-0 p-3 sm:p-4">
              <Badge
                variant="secondary"
                className="text-xs backdrop-blur-sm bg-black/30 text-white"
              >
                <Palette size={12} className="mr-1" />
                {agent.category}
              </Badge>
            </div>
          )}
        </CardHeader>

        {/* Flexible content area with minimum height */}
        <CardContent className="pt-4 pb-0 flex-grow flex flex-col justify-between min-h-[140px]">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 relative">
                <Image
                  src={
                    agent.avatarUrl ||
                    `https://picsum.photos/seed/${agent.id}-avatar/40/40`
                  }
                  alt={agent.name}
                  fill
                  className="rounded-md border object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-primary truncate">
                  {agent.name}
                </CardTitle>
                {agent.developerName && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    By {agent.developerName}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {agent.description}
            </p>
          </div>

          {agent.averageRating !== undefined &&
            agent.ratingCount !== undefined &&
            agent.ratingCount > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <RatingStars rating={agent.averageRating} size={14} />
                <span className="text-xs text-muted-foreground">
                  ({agent.ratingCount})
                </span>
              </div>
            )}
        </CardContent>

        {/* Fixed-height footer */}
        <CardFooter className="pt-3 pb-4 mt-auto">
          <div className="w-full">
            <Button
              variant={buttonConfig.variant}
              size="sm"
              className="w-full"
              onClick={handleCardAction}
              disabled={buttonConfig.disabled}
              aria-label={buttonConfig.titleAction}
            >
              {isInstallPending ? (
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <buttonConfig.icon className="mr-2 h-4 w-4" />
              )}
              {buttonConfig.text}
            </Button>

            {/* Consistent pricing display */}
            <div className="h-5 mt-1">
              {agent.billingType === "pay-as-you-go" && (
                <p className="text-xs text-muted-foreground text-center">
                  Usage-based pricing
                </p>
              )}
              {agent.billingType === "contact-sales" && (
                <p className="text-xs text-muted-foreground text-center">
                  Enterprise pricing
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
