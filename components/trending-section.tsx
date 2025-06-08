import type { Agent } from "@/interfaces"
import AgentSubSection from "@/components/agent-subsection" // Corrected import path

interface TrendingSectionProps {
  allAgents: Agent[]
  onInstall: (agentId: string) => Promise<void>
  className?: string
  installingAgentId: string | null
  isInstallPending: boolean
}

export default function TrendingSection({
  allAgents,
  onInstall,
  className,
  installingAgentId,
  isInstallPending,
}: TrendingSectionProps) {
  const trendingAgents = allAgents
    .filter((agent) => agent.tags?.includes("Trending"))
    .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0)) // Example sort
    .slice(0, 6)

  const newAgents = [...allAgents]
    .sort((a, b) => new Date(b.creationDate || 0).getTime() - new Date(a.creationDate || 0).getTime())
    .slice(0, 6)

  // Example: Popular could be based on ratingCount or a specific tag
  const popularAgents = allAgents
    .filter((agent) => (agent.averageRating || 0) >= 4.5 && (agent.ratingCount || 0) > 10)
    .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
    .slice(0, 6)

  return (
    <div className={className}>
      <AgentSubSection
        title="Trending Agents"
        agents={trendingAgents}
        onInstall={onInstall}
        installingAgentId={installingAgentId}
        isInstallPending={isInstallPending}
        cardClassName="min-w-[280px] sm:min-w-[300px]"
        scrollable
      />
      <AgentSubSection
        title="Popular Agents"
        agents={popularAgents}
        onInstall={onInstall}
        installingAgentId={installingAgentId}
        isInstallPending={isInstallPending}
        cardClassName="min-w-[280px] sm:min-w-[300px]"
        scrollable
        className="mt-8 sm:mt-12"
      />
      <AgentSubSection
        title="New Agents"
        agents={newAgents}
        onInstall={onInstall}
        installingAgentId={installingAgentId}
        isInstallPending={isInstallPending}
        cardClassName="min-w-[280px] sm:min-w-[300px]"
        scrollable
        className="mt-8 sm:mt-12"
      />
    </div>
  )
}
