import { mockAgents } from "@/features/agents/mock-agents" // Corrected import path
import AgentDetailPageClient from "@/app/explore/[agentId]/AgentDetailPageClient"

export function generateStaticParams() {
  return mockAgents.map((agent) => ({
    agentId: agent.id,
  }))
}

export default function AgentDetailPage({ params }: { params: { agentId: string } }) {
  return <AgentDetailPageClient params={params} />
}
