import { Button } from "@/components/ui/button";
import ExploreAgentCard from "@/components/explore-agent-card";
import { Spinner } from "@/components/ui/spinner";
import type { Agent } from "@/interfaces";

interface ExploreSearchResultsProps {
  isSearching: boolean;
  agents: Agent[];
  searchTerm: string;
  onInstall: (agentId: string) => Promise<void>;
  isInstallPending: boolean;
  installingAgentId: string | null;
  onClearSearch: () => void;
}

export function ExploreSearchResults({
  isSearching,
  agents,
  searchTerm,
  onInstall,
  isInstallPending,
  installingAgentId,
  onClearSearch,
}: ExploreSearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
        <p className="ml-3 text-muted-foreground">Searching agents...</p>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">
          {searchTerm
            ? "No agents found matching your search."
            : "No agents available."}
        </p>
        {searchTerm && (
          <Button variant="link" onClick={onClearSearch} className="mt-2">
            Clear search
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {agents.map((agent) => (
        <ExploreAgentCard
          key={agent.id}
          agent={agent}
          onInstall={onInstall}
          isInstallPending={isInstallPending && installingAgentId === agent.id}
        />
      ))}
    </div>
  );
}
