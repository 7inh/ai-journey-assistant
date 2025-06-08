"use client";

import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import ExploreBanner from "@/components/explore-banner";
import TrendingSection from "@/components/trending-section";
import TopAgentsList from "@/components/top-agents-list";
import { ExploreRecommendedSection } from "@/components/explore-recommended-section";
import { ExploreSearchResults } from "@/components/explore-search-results";
import { useAgentManager } from "@/features/explore/hooks";

export default function ExplorePage() {
  const {
    featuredAgent,
    topFreeAgents,
    recommendedAgents,
    agentsToDisplay,
    isFetchingInitialData,
    isSearching,
    isInstallPending,
    installingAgentId,
    searchTermFromUrl,
    handleInstallAgent,
    clearSearch,
  } = useAgentManager();

  if (isFetchingInitialData && agentsToDisplay.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {!searchTermFromUrl && <ExploreBanner featuredAgent={featuredAgent} />}

      <div className="container mx-auto py-8 px-4 md:px-6">
        {!searchTermFromUrl && (
          <>
            <TrendingSection
              allAgents={agentsToDisplay.filter(
                (agent) => agent.id !== featuredAgent?.id
              )}
              onInstall={handleInstallAgent}
              installingAgentId={installingAgentId}
              isInstallPending={isInstallPending}
            />

            <ExploreRecommendedSection
              agents={recommendedAgents}
              onInstall={handleInstallAgent}
              installingAgentId={installingAgentId}
              isInstallPending={isInstallPending}
            />

            {topFreeAgents.length > 0 && (
              <>
                <Separator className="my-10" />
                <TopAgentsList
                  agents={topFreeAgents}
                  onInstall={handleInstallAgent}
                  installingAgentId={installingAgentId}
                  isInstallPending={isInstallPending}
                />
              </>
            )}
          </>
        )}

        {searchTermFromUrl && (
          <>
            <Separator className="my-10" />
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Results for "{searchTermFromUrl}"
            </h2>
            <ExploreSearchResults
              isSearching={isSearching}
              agents={agentsToDisplay}
              searchTerm={searchTermFromUrl}
              onInstall={handleInstallAgent}
              isInstallPending={isInstallPending}
              installingAgentId={installingAgentId}
              onClearSearch={clearSearch}
            />
          </>
        )}

        {!searchTermFromUrl && (
          <>
            <Separator className="my-10" />
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              All Agents
            </h2>
            <ExploreSearchResults
              isSearching={false}
              agents={agentsToDisplay}
              searchTerm=""
              onInstall={handleInstallAgent}
              isInstallPending={isInstallPending}
              installingAgentId={installingAgentId}
              onClearSearch={clearSearch}
            />
          </>
        )}
      </div>
    </>
  );
}
