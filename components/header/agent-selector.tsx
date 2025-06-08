"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Agent } from "@/interfaces";

interface AgentSelectorProps {
  currentAgentId: string | null;
  finalAgentForDisplay: Agent | undefined;
  availableAgentsToSwitch: Agent[];
  isLoading: boolean;
}

export function AgentSelector({
  currentAgentId,
  finalAgentForDisplay,
  availableAgentsToSwitch,
  isLoading,
}: AgentSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleAgentSelect = (selectedAgentId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (pathname.startsWith("/chat")) {
      params.set("agentId", selectedAgentId);
      params.delete("activeAgentForJourneyChat");
    } else if (pathname.startsWith("/journeys/")) {
      params.set("activeAgentForJourneyChat", selectedAgentId);
      params.delete("agentId");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group flex items-center gap-1.5 md:gap-2 px-2 md:px-3 h-auto py-1.5 text-lg font-semibold focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          disabled={
            availableAgentsToSwitch.length === 0 && !finalAgentForDisplay
          }
        >
          <span className="truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]">
            {finalAgentForDisplay?.name ||
              (!isLoading ? "Select Agent" : "Loading Agents...")}
          </span>
          {availableAgentsToSwitch.length > 0 && (
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
          )}
        </Button>
      </DropdownMenuTrigger>
      {availableAgentsToSwitch.length > 0 && (
        <DropdownMenuContent align="start" className="w-64 sm:w-72">
          {availableAgentsToSwitch.map((agent) => (
            <DropdownMenuItem
              key={agent.id}
              onClick={() => handleAgentSelect(agent.id)}
              className="cursor-pointer pl-3 pr-2 py-1.5"
            >
              <span className="flex-grow truncate text-sm">{agent.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
