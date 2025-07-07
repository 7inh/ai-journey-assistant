import { usePathname, useSearchParams } from "next/navigation";
import { usePageTitle } from "@/hooks/use-page-title";
import { useAgents } from "@/hooks/use-agents";
import { ExploreSearch } from "@/components/header/explore-search";
import { AgentSelector } from "@/components/header/agent-selector";
import { SettingsTabs } from "@/components/header/settings-tabs";
import { useActiveAgent } from "@/hooks/use-active-agent";

export function HeaderTitle() {
  const { agentsData, installedAgents, isLoading } = useAgents();
  const { overrideTitle, basePageTitle, isAgentDetailPage, agentForTitle } =
    usePageTitle(agentsData);
  const pathname = usePathname();
  const { activeAgentId, isChatPath } = useActiveAgent(installedAgents);

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

  // Object map pattern for rendering components based on path
  const renderMap = {
    settings: () => <SettingsTabs />,

    chat: () => {
      const finalAgentForDisplay = agentsData.find(
        (agent) => agent.id === activeAgentId
      );
      const availableAgentsToSwitch = installedAgents.filter(
        (agent) => agent.id !== activeAgentId
      );

      return (
        <AgentSelector
          currentAgentId={activeAgentId}
          finalAgentForDisplay={finalAgentForDisplay}
          availableAgentsToSwitch={availableAgentsToSwitch}
          isLoading={isLoading}
        />
      );
    },

    explore: () => {
      return isAgentDetailPage ? (
        <h1
          className="text-lg font-semibold truncate px-1 sm:px-2"
          title={agentForTitle?.name}
        >
          {agentForTitle?.name}
        </h1>
      ) : (
        <ExploreSearch />
      );
    },

    default: () => (
      <h1
        className="text-lg font-semibold p-1 h-auto truncate"
        title={basePageTitle}
      >
        {basePageTitle}
      </h1>
    ),
  };

  // Determine which render function to use
  const getComponentToRender = () => {
    if (pathname === "/settings") {
      return renderMap.settings;
    }

    if (isChatPath(pathname)) {
      return renderMap.chat;
    }

    if (pathname === "/explore") {
      return renderMap.explore;
    }

    if (isAgentDetailPage && agentForTitle) {
      return () => (
        <h1
          className="text-lg font-semibold truncate px-1 sm:px-2"
          title={agentForTitle.name}
        >
          {agentForTitle.name}
        </h1>
      );
    }

    return renderMap.default;
  };

  // Execute the appropriate render function
  return getComponentToRender()();
}
