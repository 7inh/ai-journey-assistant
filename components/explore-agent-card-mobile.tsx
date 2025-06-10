"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Agent } from "@/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { getAgentExploreRoute } from "@/constants/routes.constants";

interface ExploreAgentCardMobileProps {
  agent: Agent;
  onInstall: (agentId: string) => Promise<void>;
  className?: string;
  isInstallPending?: boolean;
  featuredText?: string;
  portrait?: boolean; // New parameter to control card orientation
  minWidth?: string | number; // New parameter for minimum width
  maxHeight?: string | number; // Add maxHeight parameter
}

export default function ExploreAgentCardMobile({
  agent,
  onInstall,
  className,
  isInstallPending = false,
  featuredText = "FEATURED TODAY",
  portrait = true, // Default to portrait mode
  minWidth = "280px",
  maxHeight,
}: ExploreAgentCardMobileProps) {
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

  let buttonText = "GET";
  let ButtonIcon: React.ElementType | null = null;
  let buttonVariant: "default" | "secondary" | "outline" = "default";
  let actionDisabled = false;
  let titleAction = `Activate ${agent.name}`;

  if (isInstallPending) {
    buttonText = "...";
    ButtonIcon = Spinner;
    actionDisabled = true;
    titleAction = "Processing activation...";
  } else if (agent.isInstalled) {
    // Change button text based on billing type for installed agents
    if (agent.billingType === "free" || agent.billingType === "pay-as-you-go") {
      buttonText = "GET";
    } else {
      buttonText = "ACTIVE";
    }
    actionDisabled = true;
    titleAction = `${agent.name} is active`;
  } else {
    switch (agent.billingType) {
      case "free":
        buttonText = "GET";
        buttonVariant = "default";
        titleAction = `Activate ${agent.name} for free`;
        break;
      case "pay-as-you-go":
        buttonText = "GET";
        buttonVariant = "default";
        titleAction = `Activate ${agent.name} (Pay-as-you-go)`;
        break;
      case "subscription":
        buttonText = "SUB";
        buttonVariant = "default";
        titleAction = `Subscribe to ${agent.name}`;
        break;
      case "contact-sales":
        buttonText = "CONTACT";
        buttonVariant = "outline";
        actionDisabled = true;
        titleAction = `Contact sales for ${agent.name}`;
        break;
    }
  }

  return (
    <Link href={getAgentExploreRoute(agent.id)} className="block group h-full">
      <div
        className={cn(
          "relative rounded-lg overflow-hidden",
          // Force portrait aspect ratio regardless of container constraints
          "aspect-[3/4]",
          "w-full",
          "transition-all duration-300 ease-in-out",
          "transform group-hover:scale-[1.03] group-hover:shadow-lg",
          className
        )}
        style={{
          minWidth: minWidth,
          ...(maxHeight ? { maxHeight, height: "100%" } : {}),
        }}
      >
        {/* Background Image */}
        <Image
          src={
            agent.bannerImageUrl ||
            `https://picsum.photos/seed/${agent.id}-mobile/${
              portrait ? "640/800" : "640/320"
            }`
          }
          alt={`${agent.name} banner`}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0",
            portrait
              ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10" // Stronger gradient for portrait
              : "bg-gradient-to-t from-black/70 to-black/10"
          )}
        />

        {/* Featured Text Overlay */}
        <div
          className={cn(
            "absolute w-full",
            portrait ? "bottom-20 left-0 p-4" : "bottom-16 left-0 p-4"
          )}
        >
          <h3
            className={cn(
              "text-white font-bold tracking-wide leading-tight text-balance max-w-full break-words",
              portrait ? "text-2xl" : "text-3xl"
            )}
          >
            {featuredText}
          </h3>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          {/* App Icon & Info */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-white/10 backdrop-blur-sm relative">
              <Image
                src={
                  agent.avatarUrl ||
                  `https://picsum.photos/seed/${agent.id}-avatar/48/48`
                }
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{agent.name}</p>
              <p className="text-white/70 text-xs truncate max-w-[150px]">
                {agent.billingType === "subscription" &&
                agent.usagePricingTiers &&
                agent.usagePricingTiers.length > 0
                  ? `${agent.usagePricingTiers[0].rate} ${
                      agent.usagePricingTiers[0].currency
                    }/${agent.usagePricingTiers[0].unit.replace(
                      "subscription",
                      ""
                    )}`
                  : agent.developerName || agent.category || "AI Assistant"}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant={buttonVariant}
            size="sm"
            className="rounded-full px-6 font-medium"
            onClick={handleCardAction}
            disabled={actionDisabled}
            aria-label={titleAction}
          >
            {isInstallPending ? (
              <Spinner className="h-4 w-4 animate-spin" />
            ) : (
              buttonText
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
