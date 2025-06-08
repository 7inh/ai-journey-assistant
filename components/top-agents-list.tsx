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

  const columnCount = 3;
  const itemsPerColumn = Math.ceil(topAgents.length / columnCount);
  const columns: Agent[][] = Array.from({ length: columnCount }, () => []);

  topAgents.forEach((agent, index) => {
    columns[index % columnCount].push(agent);
  });

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
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            {column.map((agent, agentIndex) => (
              <React.Fragment key={agent.id}>
                <TopAgentListItem
                  agent={agent}
                  rank={colIndex * itemsPerColumn + agentIndex + 1}
                  onInstall={onInstall}
                  isInstallPending={
                    isInstallPending && installingAgentId === agent.id
                  }
                />
                {agentIndex < column.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
