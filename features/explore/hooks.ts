import { useState, useEffect, useTransition, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Agent } from "@/interfaces";
import {
  fetchAllAgents,
  installAgent as apiInstallAgent,
  searchAgents,
} from "@/features/agents/api";

export function useAgentManager() {
  const [allAgents, setAllAgents] = useState<Agent[]>([]);
  const [featuredAgent, setFeaturedAgent] = useState<Agent | undefined>(
    undefined
  );
  const [filteredAgentsForMainList, setFilteredAgentsForMainList] = useState<
    Agent[]
  >([]);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [installingAgentId, setInstallingAgentId] = useState<string | null>(
    null
  );
  const [isInstallPending, startInstallTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchTermFromUrl = searchParams.get("q") || "";
  const { toast } = useToast();

  useEffect(() => {
    async function loadAgents() {
      setIsFetchingInitialData(true);
      const agents = await fetchAllAgents();
      setAllAgents(agents);
      const potentialFeatured =
        agents.find((agent) => agent.bannerImageUrl) || agents[0];
      setFeaturedAgent(potentialFeatured);
      setIsFetchingInitialData(false);
    }
    loadAgents();
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (isFetchingInitialData) return;
      setIsSearching(true);
      const agents = await searchAgents(searchTermFromUrl);
      setFilteredAgentsForMainList(agents);
      setIsSearching(false);
    }
    if (searchTermFromUrl) {
      performSearch();
    } else {
      setFilteredAgentsForMainList([]);
    }
  }, [searchTermFromUrl, isFetchingInitialData]);

  const handleInstallAgent = async (agentId: string) => {
    const agent =
      allAgents.find((a) => a.id === agentId) ||
      filteredAgentsForMainList.find((a) => a.id === agentId);
    if (agent && !agent.isInstalled) {
      setInstallingAgentId(agentId);
      startInstallTransition(async () => {
        const success = await apiInstallAgent(agentId);
        if (success) {
          const updateAgentInstalledState = (prevAgents: Agent[]) =>
            prevAgents.map((a) =>
              a.id === agentId ? { ...a, isInstalled: true } : a
            );

          setAllAgents(updateAgentInstalledState);
          if (searchTermFromUrl) {
            setFilteredAgentsForMainList(updateAgentInstalledState);
          }
          if (featuredAgent && featuredAgent.id === agentId) {
            setFeaturedAgent((prev) =>
              prev ? { ...prev, isInstalled: true } : undefined
            );
          }

          toast({
            title: "Agent Activated",
            description: `${agent.name} has been successfully activated.`,
          });
        } else {
          toast({
            title: "Error",
            description: `Failed to activate ${agent.name}.`,
            variant: "destructive",
          });
        }
        setInstallingAgentId(null);
      });
    }
  };

  const topFreeAgents = useMemo(
    () => allAgents.filter((agent) => agent.billingType === "free"),
    [allAgents]
  );

  const recommendedAgents = useMemo(
    () =>
      allAgents.filter(
        (agent) => agent.averageRating && agent.averageRating >= 4
      ),
    [allAgents]
  );

  const agentsToDisplay = searchTermFromUrl
    ? filteredAgentsForMainList
    : allAgents;

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return {
    allAgents,
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
  };
}
