// src/features/agents/api.ts
import type { Agent, Review } from "@/interfaces";
import { mockAgents } from "@/features/agents/mock-agents"; // Changed from relative path

// Simulate API delay
const apiDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAllAgents(): Promise<Agent[]> {
  await apiDelay(100); // Simulate network latency
  return JSON.parse(JSON.stringify(mockAgents)); // Return a deep copy to prevent direct mutation outside API
}

export async function fetchAgentDetails(
  agentId: string
): Promise<Agent | undefined> {
  await apiDelay(100);
  const agent = mockAgents.find((agent) => agent.id === agentId);
  return agent ? JSON.parse(JSON.stringify(agent)) : undefined;
}

export async function fetchRelatedAgents(
  currentAgent: Agent
): Promise<Agent[]> {
  await apiDelay(100);
  if (
    !currentAgent.relatedAgentIds ||
    currentAgent.relatedAgentIds.length === 0
  ) {
    return [];
  }
  const related = mockAgents.filter(
    (a) =>
      currentAgent.relatedAgentIds!.includes(a.id) && a.id !== currentAgent.id
  );
  return JSON.parse(JSON.stringify(related));
}

export async function installAgent(agentId: string): Promise<boolean> {
  await apiDelay(200);
  const agentIndex = mockAgents.findIndex((a) => a.id === agentId);
  if (agentIndex !== -1) {
    mockAgents[agentIndex].isInstalled = true;
    return true;
  }
  return false;
}

export async function uninstallAgent(agentId: string): Promise<boolean> {
  await apiDelay(200);
  const agentIndex = mockAgents.findIndex((a) => a.id === agentId);
  if (agentIndex !== -1) {
    mockAgents[agentIndex].isInstalled = false;
    return true;
  }
  return false;
}

export async function submitAgentReview(
  agentId: string,
  rating: number,
  comment: string,
  userName = "Current User", // Placeholder for actual user
  userAvatarUrl = "/placeholder.svg?height=40&width=40" // Placeholder
): Promise<Agent | null> {
  await apiDelay(300);
  const agentIndex = mockAgents.findIndex((a) => a.id === agentId);
  if (agentIndex === -1) {
    return null;
  }

  const agent = mockAgents[agentIndex];
  const newReview: Review = {
    id: `review-${Date.now()}`,
    userName,
    userAvatarUrl,
    rating,
    comment,
    date: new Date().toISOString(),
  };

  const updatedReviews = [...(agent.reviews || []), newReview];
  const newRatingCount = (agent.ratingCount || 0) + 1;
  const newAverageRating =
    ((agent.averageRating || 0) * (agent.ratingCount || 0) + rating) /
    newRatingCount;

  const updatedAgent: Agent = {
    ...agent,
    reviews: updatedReviews,
    averageRating: Number.parseFloat(newAverageRating.toFixed(1)), // Ensure 1 decimal place
    ratingCount: newRatingCount,
  };

  mockAgents[agentIndex] = updatedAgent;
  return JSON.parse(JSON.stringify(updatedAgent));
}

export async function searchAgents(searchTerm: string): Promise<Agent[]> {
  await apiDelay(100);
  if (!searchTerm) {
    return JSON.parse(JSON.stringify(mockAgents));
  }
  const lowerSearchTerm = searchTerm.toLowerCase();
  return JSON.parse(
    JSON.stringify(
      mockAgents.filter(
        (agent) =>
          agent.name.toLowerCase().includes(lowerSearchTerm) ||
          agent.description.toLowerCase().includes(lowerSearchTerm) ||
          agent.tags?.some((tag) => tag.toLowerCase().includes(lowerSearchTerm))
      )
    )
  );
}
