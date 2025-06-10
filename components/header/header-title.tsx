import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks/use-page-title";
import { useAgents } from "@/hooks/use-agents";
import { ExploreSearch } from "./explore-search";
import { AgentSelector } from "./agent-selector";
import { SettingsTabs } from "./settings-tabs";
import { DEFAULT_AGENT_ID } from "@/constants";

export function HeaderTitle() {
  const { agentsData, installedAgents, isLoading } = useAgents();
  const { overrideTitle, basePageTitle, isAgentDetailPage, agentForTitle } =
    usePageTitle(agentsData);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (overrideTitle) {
    return (
      <h1
        className="text-lg font-semibold truncate px-1 sm:px-2"
        title={overrideTitle}
      >
        {overrideTitle}
      </h1>
    );
  }

  // Settings page
  if (pathname === "/settings") {
    return <SettingsTabs />;
  }

  // Chat page
  if (pathname.startsWith("/chat") || pathname === "/") {
    let currentActiveAgentId: string | null = searchParams.get("agentId");

    if (
      !currentActiveAgentId ||
      (currentActiveAgentId &&
        !installedAgents.find((agent) => agent.id === currentActiveAgentId))
    ) {
      const defaultJourneyMaster = installedAgents.find(
        (agent) => agent.id === DEFAULT_AGENT_ID
      );
      const firstInstalledAgent =
        installedAgents.length > 0 ? installedAgents[0] : undefined;

      if (defaultJourneyMaster) {
        currentActiveAgentId = defaultJourneyMaster.id;
      } else if (firstInstalledAgent) {
        currentActiveAgentId = firstInstalledAgent.id;
      } else {
        currentActiveAgentId = null;
      }

      if (
        currentActiveAgentId &&
        currentActiveAgentId !== searchParams.get("agentId")
      ) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("agentId", currentActiveAgentId);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }

    const finalAgentForDisplay = agentsData.find(
      (agent) => agent.id === currentActiveAgentId
    );
    const availableAgentsToSwitch = installedAgents.filter(
      (agent) => agent.id !== currentActiveAgentId
    );

    return (
      <AgentSelector
        currentAgentId={currentActiveAgentId}
        finalAgentForDisplay={finalAgentForDisplay}
        availableAgentsToSwitch={availableAgentsToSwitch}
        isLoading={isLoading}
      />
    );
  }

  // Agent detail page
  if (isAgentDetailPage && agentForTitle) {
    return (
      <h1
        className="text-lg font-semibold truncate px-1 sm:px-2"
        title={agentForTitle.name}
      >
        {agentForTitle.name}
      </h1>
    );
  }

  // Explore page
  if (pathname === "/explore" && !isAgentDetailPage) {
    return <ExploreSearch />;
  }

  // Default page title
  return (
    <h1
      className="text-lg font-semibold p-1 h-auto truncate"
      title={basePageTitle}
    >
      {basePageTitle}
    </h1>
  );
}
