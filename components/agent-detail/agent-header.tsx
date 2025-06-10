"use client";

import type React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/ui/rating-stars";
import {
  Download,
  CheckCircle,
  Palette,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import type { Agent } from "@/interfaces";
import { Spinner } from "@/components/ui/spinner";

interface AgentHeaderProps {
  agent: Agent;
  isInstalled: boolean; // "isInstalled" means active/available for use
  onInstallToggle: () => void; // Renamed from onInstallToggle to onActivateToggle or similar if preferred
  isInstallPending: boolean;
}

export default function AgentHeader({
  agent,
  isInstalled,
  onInstallToggle,
  isInstallPending,
}: AgentHeaderProps) {
  let buttonText = "Activate Agent";
  let ButtonIcon: React.ElementType = Download;
  let finalActionDisabled = isInstallPending;
  let titleAction = `Activate ${agent.name}`;

  if (isInstallPending) {
    buttonText = isInstalled ? "Deactivating..." : "Activating...";
    ButtonIcon = Spinner;
  } else if (isInstalled) {
    buttonText = "Active";
    ButtonIcon = CheckCircle;
    finalActionDisabled = true; // Or allow deactivation
    titleAction = `${agent.name} is active`;
  } else {
    switch (agent.billingType) {
      case "free":
        buttonText = "Activate Agent";
        ButtonIcon = Download;
        titleAction = `Activate ${agent.name} for free`;
        break;
      case "pay-as-you-go":
        buttonText = "Activate Agent";
        ButtonIcon = Briefcase;
        titleAction = `Activate ${agent.name} (Pay-as-you-go)`;
        break;
      case "subscription":
        buttonText = "Subscribe";
        ButtonIcon = Briefcase;
        titleAction = `Subscribe to ${agent.name}`;
        break;
      case "contact-sales":
        buttonText = "Contact Sales";
        ButtonIcon = ExternalLink;
        finalActionDisabled = true; // Or link to contact page/modal
        titleAction = `Contact sales for ${agent.name}`;
        break;
      default:
        buttonText = "Details";
        finalActionDisabled = true;
        break;
    }
  }

  const handleHeaderAction = () => {
    if (finalActionDisabled) return;
    // For free or pay-as-you-go agents, onInstallToggle means activate.
    // If it's "Contact Sales", this button is disabled or would link out.
    if (
      agent.billingType === "free" ||
      agent.billingType === "pay-as-you-go" ||
      agent.billingType === "subscription"
    ) {
      onInstallToggle();
    }
  };

  return (
    <header className="mb-8 md:mb-12 pt-4">
      {agent.bannerImageUrl && (
        <div className="relative w-full h-40 sm:h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden mb-4 sm:mb-6 shadow-lg">
          <Image
            src={
              agent.bannerImageUrl ||
              `/placeholder.svg?width=1200&height=400&query=${agent.name}+Banner`
            }
            alt={`${agent.name} banner`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 md:gap-6">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-lg border-4 border-background shadow-md sm:-mt-12 md:-mt-16 ml-2 sm:ml-0 flex-shrink-0">
          <AvatarImage
            src={
              agent.avatarUrl ||
              `/placeholder.svg?height=128&width=128&query=${agent.name.charAt(
                0
              )}`
            }
            alt={agent.name}
          />
          <AvatarFallback className="text-3xl sm:text-4xl">
            {agent.name.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="mt-3 sm:mt-0 flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {agent.name}
          </h1>
          <div className="text-xs sm:text-sm text-muted-foreground mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              By{" "}
              <span className="font-medium text-primary hover:underline cursor-pointer">
                {agent.developerName || "Unknown Developer"}
              </span>
            </span>
            {agent.category && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center">
                  <Palette className="mr-1 h-3 w-3" />
                  {agent.category}
                </span>
              </>
            )}
          </div>
          {agent.averageRating !== undefined &&
            agent.ratingCount !== undefined && (
              <div className="flex items-center gap-2 mt-2">
                <RatingStars rating={agent.averageRating} size={18} />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {agent.averageRating.toFixed(1)} ({agent.ratingCount} ratings)
                </span>
              </div>
            )}
        </div>
        <Button
          size="lg"
          onClick={handleHeaderAction}
          disabled={finalActionDisabled}
          className="mt-4 sm:mt-0 w-full sm:w-auto flex-shrink-0"
          aria-label={titleAction}
        >
          {isInstallPending ? (
            <Spinner className="mr-2 h-5 w-5" />
          ) : (
            <ButtonIcon className="mr-2 h-5 w-5" />
          )}
          {buttonText}
        </Button>
      </div>
    </header>
  );
}
