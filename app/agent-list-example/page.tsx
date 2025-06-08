"use client"

import { useState, useEffect } from "react"
import AgentListItem from "@/components/agent-list-item"
import type { Agent } from "@/interfaces"
import { fetchAllAgents, installAgent, uninstallAgent } from "@/features/agents/api"
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentListExamplePage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [installingAgentId, setInstallingAgentId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadAgents() {
      setIsLoading(true)
      try {
        const fetchedAgents = await fetchAllAgents()
        // For demo, let's sort them by rating or name
        fetchedAgents.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0) || a.name.localeCompare(b.name))
        setAgents(fetchedAgents)
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load agents.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadAgents()
  }, [toast])

  const handleInstallToggle = async (agentId: string, isCurrentlyInstalled: boolean) => {
    setInstallingAgentId(agentId)
    const agentToUpdate = agents.find((a) => a.id === agentId)
    if (!agentToUpdate) return

    try {
      let success = false
      if (isCurrentlyInstalled) {
        success = await uninstallAgent(agentId)
      } else {
        success = await installAgent(agentId)
      }

      if (success) {
        setAgents((prevAgents) =>
          prevAgents.map((agent) => (agent.id === agentId ? { ...agent, isInstalled: !isCurrentlyInstalled } : agent)),
        )
        toast({
          title: `Agent ${isCurrentlyInstalled ? "Uninstalled" : "Installed"}`,
          description: `${agentToUpdate.name} has been ${isCurrentlyInstalled ? "uninstalled" : "installed"}.`,
        })
      } else {
        throw new Error("API call failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isCurrentlyInstalled ? "uninstall" : "install"} ${agentToUpdate.name}.`,
        variant: "destructive",
      })
    } finally {
      setInstallingAgentId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-0 sm:px-4 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Top Agents</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-1">
          {agents.length > 0 ? (
            <div className="divide-y-0">
              {" "}
              {/* Border is handled by AgentListItem now */}
              {agents.slice(0, 10).map((agent, index) => (
                <AgentListItem
                  key={agent.id}
                  agent={agent}
                  rank={index + 1}
                  onInstallToggle={handleInstallToggle}
                  isInstallPending={installingAgentId === agent.id}
                  className="px-3 sm:px-4"
                  hideBottomBorder={index === agents.slice(0, 10).length - 1} // Hide border for last item
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No agents available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
