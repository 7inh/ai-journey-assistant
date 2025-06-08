"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import TopAgentListItem from "@/components/top-agent-list-item"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import type { Agent } from "@/interfaces"
import { fetchAllAgents, installAgent as apiInstallAgent } from "@/features/agents/api"
import { useToast } from "@/components/ui/use-toast"

export default function TopFreeAgentsPage() {
  const [freeAgents, setFreeAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [installingAgentId, setInstallingAgentId] = useState<string | null>(null)
  const [isInstallPending, startInstallTransition] = useTransition()
  const { toast } = useToast()

  useEffect(() => {
    async function loadAgents() {
      setIsLoading(true)
      try {
        const allAgents = await fetchAllAgents()
        const filteredFreeAgents = allAgents.filter((agent) => agent.billingType === "free")
        setFreeAgents(filteredFreeAgents)
      } catch (error) {
        console.error("Failed to load agents:", error)
        toast({
          title: "Error",
          description: "Could not load agents. Please try again later.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }
    loadAgents()
  }, [toast])

  const handleInstallAgent = async (agentId: string) => {
    const agent = freeAgents.find((a) => a.id === agentId)
    if (agent && !agent.isInstalled) {
      setInstallingAgentId(agentId)
      startInstallTransition(async () => {
        const success = await apiInstallAgent(agentId)
        if (success) {
          setFreeAgents((prevAgents) => prevAgents.map((a) => (a.id === agentId ? { ...a, isInstalled: true } : a)))
          toast({
            title: "Agent Activated",
            description: `${agent.name} has been successfully activated.`,
          })
        } else {
          toast({
            title: "Error",
            description: `Failed to activate ${agent.name}.`,
            variant: "destructive",
          })
        }
        setInstallingAgentId(null)
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {freeAgents.length > 0 ? (
        <div className="space-y-0">
          {freeAgents.map((agent, index) => (
            <div key={agent.id}>
              <TopAgentListItem
                agent={agent}
                rank={index + 1}
                onInstall={handleInstallAgent}
                isInstallPending={isInstallPending && installingAgentId === agent.id}
              />
              {index < freeAgents.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">No free agents found.</p>
      )}
    </div>
  )
}
