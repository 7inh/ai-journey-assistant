"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useTransition, useMemo } from "react"
import ExploreAgentCard from "@/components/explore-agent-card"
import ExploreBanner from "@/components/explore-banner"
import TrendingSection from "@/components/trending-section"
import TopAgentsList from "@/components/top-agents-list" // Import the new component
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import type { Agent } from "@/interfaces"
import { fetchAllAgents, installAgent as apiInstallAgent, searchAgents } from "@/features/agents/api"
import { Spinner } from "@/components/ui/spinner"

export default function ExplorePage() {
  const [allAgents, setAllAgents] = useState<Agent[]>([])
  const [featuredAgent, setFeaturedAgent] = useState<Agent | undefined>(undefined)
  const [filteredAgentsForMainList, setFilteredAgentsForMainList] = useState<Agent[]>([])
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [installingAgentId, setInstallingAgentId] = useState<string | null>(null)
  const [isInstallPending, startInstallTransition] = useTransition()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const searchTermFromUrl = searchParams.get("q") || ""
  const { toast } = useToast()

  useEffect(() => {
    async function loadAgents() {
      setIsFetchingInitialData(true)
      const agents = await fetchAllAgents()
      setAllAgents(agents)
      const potentialFeatured = agents.find((agent) => agent.bannerImageUrl) || agents[0]
      setFeaturedAgent(potentialFeatured)
      setIsFetchingInitialData(false)
    }
    loadAgents()
  }, [])

  useEffect(() => {
    async function performSearch() {
      if (isFetchingInitialData) return
      setIsSearching(true)
      const agents = await searchAgents(searchTermFromUrl)
      setFilteredAgentsForMainList(agents)
      setIsSearching(false)
    }
    if (searchTermFromUrl) {
      performSearch()
    } else {
      setFilteredAgentsForMainList([])
    }
  }, [searchTermFromUrl, isFetchingInitialData])

  const handleInstallAgent = async (agentId: string) => {
    const agent = allAgents.find((a) => a.id === agentId) || filteredAgentsForMainList.find((a) => a.id === agentId)
    if (agent && !agent.isInstalled) {
      setInstallingAgentId(agentId)
      startInstallTransition(async () => {
        const success = await apiInstallAgent(agentId)
        if (success) {
          const updateAgentInstalledState = (prevAgents: Agent[]) =>
            prevAgents.map((a) => (a.id === agentId ? { ...a, isInstalled: true } : a))

          setAllAgents(updateAgentInstalledState)
          if (searchTermFromUrl) {
            setFilteredAgentsForMainList(updateAgentInstalledState)
          }
          if (featuredAgent && featuredAgent.id === agentId) {
            setFeaturedAgent((prev) => (prev ? { ...prev, isInstalled: true } : undefined))
          }

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

  const topFreeAgents = useMemo(() => allAgents.filter((agent) => agent.billingType === "free"), [allAgents])

  if (isFetchingInitialData && allAgents.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
        <Spinner size="lg" />
      </div>
    )
  }

  const agentsToDisplay = searchTermFromUrl ? filteredAgentsForMainList : allAgents

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {!searchTermFromUrl && <ExploreBanner featuredAgent={featuredAgent} />}

      {!searchTermFromUrl && (
        <TrendingSection
          allAgents={allAgents.filter((agent) => agent.id !== featuredAgent?.id)}
          onInstall={handleInstallAgent}
          installingAgentId={installingAgentId}
          isInstallPending={isInstallPending}
        />
      )}

      {!searchTermFromUrl && topFreeAgents.length > 0 && (
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

      {(searchTermFromUrl || !searchTermFromUrl) && (
        <>
          <Separator className="my-10" />
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            {searchTermFromUrl ? `Results for "${searchTermFromUrl}"` : "All Agents"}
          </h2>
        </>
      )}

      {isSearching ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
          <p className="ml-3 text-muted-foreground">Searching agents...</p>
        </div>
      ) : agentsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-[25rem]">
          {agentsToDisplay.map((agent) => (
            <ExploreAgentCard
              key={agent.id}
              agent={agent}
              onInstall={handleInstallAgent}
              isInstallPending={isInstallPending && installingAgentId === agent.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            {searchTermFromUrl ? "No agents found matching your search." : "No agents available."}
          </p>
          {searchTermFromUrl && (
            <Button
              variant="link"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                params.delete("q")
                router.replace(`${pathname}?${params.toString()}`, { scroll: false })
              }}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
