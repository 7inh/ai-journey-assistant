import type { Agent } from "@/interfaces"
import RelatedAgentMiniCard from "@/components/related-agent-mini-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

interface AgentRelatedSidebarProps {
  relatedAgents: Agent[]
}

export default function AgentRelatedSidebar({ relatedAgents }: AgentRelatedSidebarProps) {
  if (!relatedAgents || relatedAgents.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="related-agents-heading">
      <Card>
        <CardHeader>
          <CardTitle id="related-agents-heading" className="text-lg font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Related Agents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {relatedAgents.map((agent) => (
            <RelatedAgentMiniCard key={agent.id} agent={agent} />
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
