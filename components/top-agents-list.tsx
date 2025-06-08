"use client";

import React from "react";
import Link from "next/link";
import type { Agent } from "@/interfaces";
import TopAgentListItem from "@/components/top-agent-list-item";
import { Separator } from "@/components/ui/separator";

interface TopAgentsListProps {
  agents: Agent[];
  onInstall: (agentId: string) => Promise<void>;
  installingAgentId: string | null;
  isInstallPending: boolean;
  maxItems?: number;
}

export default function TopAgentsList({
  agents,
  onInstall,
  installingAgentId,
  isInstallPending,
  maxItems = 12, // Default to 12 items
}: TopAgentsListProps) {
  if (!agents || agents.length === 0) {
    return null;
  }

  const topAgents = agents.slice(0, maxItems);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Top Free Agents</h2>
        <Link
          href="/explore/top-free"
          className="text-sm font-semibold text-primary hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topAgents.map((agent, index) => (
          <div key={agent.id} className="flex flex-col">
            <TopAgentListItem
              agent={agent}
              rank={index + 1}
              onInstall={onInstall}
              isInstallPending={
                isInstallPending && installingAgentId === agent.id
              }
            />
            {index < topAgents.length - 1 && (
              <Separator className="sm:hidden mt-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
