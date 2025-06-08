// src/features/journeys/utils.ts
import { mockAgents } from "@/features/agents/mock-agents"
import type { Agent } from "@/interfaces"

export function findSuitableAgentForTask(taskName: string, taskDescription?: string): Agent | undefined {
  const installedAgents = mockAgents.filter((agent) => agent.isInstalled)
  if (installedAgents.length === 0) return undefined

  const lowerTaskName = taskName.toLowerCase()
  // const lowerTaskDesc = taskDescription?.toLowerCase() || ""; // Not used in current logic

  for (const agent of installedAgents) {
    const agentKeywords = [
      agent.name.toLowerCase(),
      ...(agent.tags?.map((tag) => tag.toLowerCase()) || []),
      agent.description.toLowerCase(),
    ].join(" ")

    if (
      (lowerTaskName.includes("code") || lowerTaskName.includes("develop") || lowerTaskName.includes("debug")) &&
      (agentKeywords.includes("code") || agentKeywords.includes("develop"))
    )
      return agent
    if (
      (lowerTaskName.includes("design") ||
        lowerTaskName.includes("logo") ||
        lowerTaskName.includes("ui") ||
        lowerTaskName.includes("image") ||
        lowerTaskName.includes("banner")) &&
      (agentKeywords.includes("creative") || agentKeywords.includes("design"))
    )
      return agent
    if (
      (lowerTaskName.includes("write") ||
        lowerTaskName.includes("article") ||
        lowerTaskName.includes("content") ||
        lowerTaskName.includes("script")) &&
      (agentKeywords.includes("writer") || agentKeywords.includes("creative"))
    )
      return agent
    if (
      (lowerTaskName.includes("plan") ||
        lowerTaskName.includes("organize") ||
        lowerTaskName.includes("strategy") ||
        lowerTaskName.includes("journey")) &&
      (agentKeywords.includes("journey") || agentKeywords.includes("plan"))
    )
      return agent
    if (
      (lowerTaskName.includes("research") ||
        lowerTaskName.includes("find") ||
        lowerTaskName.includes("analyze") ||
        lowerTaskName.includes("data")) &&
      (agentKeywords.includes("general") || agentKeywords.includes("data") || agentKeywords.includes("analyst"))
    )
      return agent
  }
  return installedAgents.find((agent) => agent.id === "general-chat") || installedAgents[0]
}
