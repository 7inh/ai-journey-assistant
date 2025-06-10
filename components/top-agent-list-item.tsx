"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import type { Agent } from "@/interfaces";
import { Spinner } from "@/components/ui/spinner";
import { getAgentExploreRoute } from "@/constants/routes.constants";

interface TopAgentListItemProps {
  agent: Agent;
  rank: number;
  onInstall: (agentId: string) => Promise<void>;
  isInstallPending?: boolean;
}

export default function TopAgentListItem({
  agent,
  rank,
  onInstall,
  isInstallPending = false,
}: TopAgentListItemProps) {
  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInstallPending || agent.isInstalled) return;
    onInstall(agent.id);
  };

  const renderActionButton = () => {
    if (isInstallPending) {
      return <Spinner className="h-5 w-5 text-muted-foreground" />;
    }
    if (agent.isInstalled) {
      return (
        <Button variant="ghost" size="icon" disabled>
          <DownloadCloud className="h-6 w-6 text-primary" />
        </Button>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full font-bold px-5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleActionClick}
        >
          Get
        </Button>
        {/* In-App Purchases text can be added here if needed */}
      </div>
    );
  };

  return (
    <Link
      href={getAgentExploreRoute(agent.id)}
      className="block group py-3 h-full"
    >
      <div className="flex items-center gap-3">
        <div className="text-lg font-medium text-muted-foreground w-6 text-center shrink-0">
          {rank}
        </div>
        <Image
          src={
            agent.avatarUrl ||
            `https://picsum.photos/seed/${encodeURIComponent(agent.name)}/60/60`
          }
          alt={agent.name}
          width={60}
          height={60}
          className="rounded-xl border shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm group-hover:underline truncate">
            {agent.name}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {agent.description}
          </p>
        </div>
        <div className="ml-auto shrink-0 pl-2">{renderActionButton()}</div>
      </div>
    </Link>
  );
}
