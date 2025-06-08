import type { Agent } from "@/interfaces"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function RelatedAgentMiniCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/explore/${agent.id}`} className="block hover:no-underline">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center gap-3 p-3">
          <Avatar className="h-10 w-10 rounded-md">
            <AvatarImage
              src={agent.avatarUrl || `/placeholder.svg?height=40&width=40&query=${agent.name.charAt(0)}`}
              alt={agent.name}
            />
            <AvatarFallback>{agent.name.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">{agent.name}</CardTitle>
            <CardDescription className="text-xs line-clamp-2">{agent.description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
