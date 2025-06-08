"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DownloadCloud } from "lucide-react"
import type { Agent } from "@/interfaces"
import { Spinner } from "@/components/ui/spinner"

interface TopAgentListItemProps {
  agent: Agent
  rank: number
  onInstall: (agentId: string) => Promise<void>
  isInstallPending?: boolean
}

export default function TopAgentListItem({ agent, rank, onInstall, isInstallPending = false }: TopAgentListItemProps) {
  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInstallPending || agent.isInstalled) return
    onInstall(agent.id)
  }

  const renderActionButton = () => {
    if (isInstallPending) {
      return <Spinner className="h-5 w-5 text-muted-foreground" />
    }
    if (agent.isInstalled) {
      return (
        <Button variant="ghost" size="icon" disabled>
          <DownloadCloud className="h-6 w-6 text-primary" />
        </Button>
      )
    }
    return (
      <div className="flex flex-col items-center">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full font-bold px-5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleActionClick}
        >
          Get
        </Button>
        {/* In-App Purchases text can be added here if needed */}
      </div>
    )
  }

  return (
    <Link href={`/explore/${agent.id}`} className="block group py-3">
      <div className="flex items-center gap-4">
        <div className="text-lg font-medium text-muted-foreground w-6 text-center">{rank}</div>
        <Image
          src={agent.avatarUrl || `/placeholder.svg?width=60&height=60&query=${agent.name.charAt(0)}`}
          alt={agent.name}
          width={60}
          height={60}
          className="rounded-xl border"
        />
        <div className="flex-1">
          <p className="font-medium text-sm group-hover:underline">{agent.name}</p>
          <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
        </div>
        <div className="ml-auto shrink-0">{renderActionButton()}</div>
      </div>
    </Link>
  )
}
