"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadCloud, XCircle } from "lucide-react";
import type { Agent } from "@/interfaces";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { getAgentExploreRoute } from "@/constants/routes.constants";

interface AgentListItemProps {
  agent: Agent;
  rank?: number;
  onInstallToggle: (
    agentId: string,
    isCurrentlyInstalled: boolean
  ) => Promise<void>;
  isInstallPending?: boolean; // True if this specific agent's install/uninstall is pending
  className?: string;
  hideBottomBorder?: boolean;
}

export default function AgentListItem({
  agent,
  rank,
  onInstallToggle,
  isInstallPending = false,
  className,
  hideBottomBorder = false,
}: AgentListItemProps) {
  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInstallPending) {
      await onInstallToggle(agent.id, agent.isInstalled || false);
    }
  };

  const shortDescription = agent.category || agent.tags?.[0] || "AI Agent";

  return (
    <Link href={getAgentExploreRoute(agent.id)} className="block group w-full">
      <div
        className={cn(
          "flex items-center py-3 group-hover:bg-muted/50 dark:group-hover:bg-muted/20 transition-colors",
          !hideBottomBorder &&
            "border-b border-border/80 dark:border-border/50",
          className
        )}
      >
        {rank && (
          <span className="text-sm font-medium text-muted-foreground w-8 text-center">
            {rank}
          </span>
        )}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 relative",
            rank ? "ml-2" : "ml-0"
          )}
        >
          <Image
            src={
              agent.avatarUrl ||
              `/placeholder.svg?width=60&height=60&query=${agent.name.charAt(
                0
              )}`
            }
            alt={agent.name}
            fill
            sizes="60px"
            className="rounded-lg border object-cover"
          />
        </div>
        <div className="ml-3 sm:ml-4 flex-grow min-w-0">
          <h3 className="text-sm sm:text-base font-medium truncate group-hover:text-primary">
            {agent.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {shortDescription}
          </p>
          {agent.isPremium && (
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
              Premium
            </p>
          )}
        </div>
        <div className="ml-3 sm:ml-4 flex-shrink-0 flex flex-col items-center">
          <Button
            variant={agent.isInstalled ? "ghost" : "outline"}
            size="sm"
            className={cn(
              "rounded-full w-[70px] h-7 text-xs font-semibold",
              agent.isInstalled ? "text-primary" : "bg-muted/60 hover:bg-muted"
            )}
            onClick={handleInstallClick}
            disabled={isInstallPending}
            aria-label={
              agent.isInstalled
                ? `Uninstall ${agent.name}`
                : `Install ${agent.name}`
            }
          >
            {isInstallPending ? (
              <Spinner className="h-3.5 w-3.5" />
            ) : agent.isInstalled ? (
              // Using XCircle for uninstall, or CheckCircle if you prefer to show "Installed"
              // For "Get" vs "Cloud Download", we'll use "Get" or "Installed"
              // If you want a cloud icon for re-download, that's a different state.
              // For now, let's assume "Installed" means it's there.
              // To mimic "uninstall", we can show an X or a different text.
              // Let's use "Installed" for simplicity, or "Open" if applicable.
              // The App Store shows "Open" or a cloud icon.
              // Since we don't have an "Open" action defined, let's stick to "Installed" or allow uninstall.
              // For this example, let's make it an "Uninstall" button if installed.
              <XCircle className="h-4 w-4" /> // Or CheckCircle
            ) : (
              <DownloadCloud className="h-4 w-4" />
            )}
            <span className="ml-1">
              {isInstallPending ? "" : agent.isInstalled ? "Remove" : "Get"}
            </span>
          </Button>
          {/* Placeholder for "In-App Purchases" or similar meta text */}
          {/* <p className="text-[10px] text-muted-foreground mt-1">Meta text</p> */}
        </div>
      </div>
    </Link>
  );
}
