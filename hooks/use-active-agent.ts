import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { DEFAULT_AGENT_ID } from "@/constants";
import { Agent } from "@/interfaces";

export function useActiveAgent(installedAgents: Agent[]) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Helper function to check if current path is a chat path
  const isChatPath = (path: string) => path.startsWith("/chat") || path === "/";

  // Determine the current active agent ID
  const currentParamAgentId = searchParams.get("agentId");

  // Find a suitable agent ID if the current one is invalid
  let activeAgentId = currentParamAgentId;

  if (isChatPath(pathname)) {
    if (
      !activeAgentId ||
      !installedAgents.find((agent) => agent.id === activeAgentId)
    ) {
      const defaultJourneyMaster = installedAgents.find(
        (agent) => agent.id === DEFAULT_AGENT_ID
      );
      const firstInstalledAgent =
        installedAgents.length > 0 ? installedAgents[0] : undefined;

      if (defaultJourneyMaster) {
        activeAgentId = defaultJourneyMaster.id;
      } else if (firstInstalledAgent) {
        activeAgentId = firstInstalledAgent.id;
      } else {
        activeAgentId = null;
      }
    }
  }

  // Handle URL navigation when agent changes
  useEffect(() => {
    if (
      isChatPath(pathname) &&
      activeAgentId &&
      activeAgentId !== currentParamAgentId
    ) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("agentId", activeAgentId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, activeAgentId, currentParamAgentId, searchParams, router]);

  return {
    activeAgentId,
    isChatPath,
  };
}
