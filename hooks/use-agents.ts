import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchAllAgents } from "@/features/agents/api";
import type { Agent } from "@/interfaces";

export function useAgents() {
  const [agentsData, setAgentsData] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadAgents() {
      try {
        const agents = await fetchAllAgents();
        setAgentsData(agents.map((agent) => ({ ...agent })));
      } catch (error) {
        console.error("Failed to fetch agents for header:", error);
        toast({
          title: "Error",
          description: "Could not load agent data for header.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadAgents();
  }, [toast]);

  const handleUpdateAgent = (agentId: string) => {
    setAgentsData((prevAgents) =>
      prevAgents.map((agent) => {
        if (agent.id === agentId && agent.version < agent.latestVersion) {
          toast({
            title: `${agent.name} Updated`,
            description: agent.releaseNotes
              ? `Successfully updated to v${agent.latestVersion}. Changes: ${agent.releaseNotes}`
              : `Successfully updated to v${agent.latestVersion}.`,
          });
          return { ...agent, version: agent.latestVersion };
        }
        return agent;
      })
    );
  };

  const installedAgents = agentsData.filter((agent) => agent.isInstalled);

  return {
    agentsData,
    installedAgents,
    isLoading,
    handleUpdateAgent,
  };
}
