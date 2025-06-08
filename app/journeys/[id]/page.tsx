import { notFound } from "next/navigation"
import JourneyChatView from "@/components/journey-chat-view"
import type { Metadata, ResolvingMetadata } from "next"
import { fetchJourneyWithLog } from "@/features/journeys/api"
import { processUserJourneyRequest, updateJourneyTask } from "@/features/journeys/actions" // These are the correct server actions from features/journeys/actions.ts
import { fetchAllAgents } from "@/features/agents/api"
import { DEFAULT_AGENT_ID } from "@/constants" // For default agent selection
// Removed: import { mockAgents } from "@/lib/data" - CRITICAL
// Removed: import { mockJourneys } from "@/lib/data" - if it was still here for generateStaticParams

// generateStaticParams might need its own way to get journey IDs if not using mockJourneys directly
// For now, assuming it's handled or we focus on the runtime error.
// If mockJourneys was used by generateStaticParams, it should import from features/journeys/api or similar.
// For simplicity, let's assume generateStaticParams is okay or uses fetchAllJourneyIds() if available.

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id
  const journey = await fetchJourneyWithLog(id)
  if (!journey) return { title: "Journey Not Found" }
  return {
    title: `Journey: ${journey.title}`,
    description: journey.originalRequest?.substring(0, 160) || `Details for journey: ${journey.title}`,
  }
}

// If you need generateStaticParams, ensure it fetches journey IDs correctly, e.g.,
// import { fetchAllJourneyIds } from "@/features/journeys/api"; // Assuming this function exists
// export async function generateStaticParams() {
//   const journeyIds = await fetchAllJourneyIds();
//   return journeyIds.map((id) => ({ id }));
// }

// The findSuitableAgentForTask, handleUserJourneyRequest, handleTaskJourneyUpdate functions
// were previously defined in this file. They have been moved to "@/features/journeys/actions.ts"
// and "@/features/journeys/utils.ts" (or similar).
// The server actions (processUserJourneyRequest, updateJourneyTask) imported above
// should now correctly handle fetching agents if they need to assign them.

// If findSuitableAgentForTask was used by client-side logic (which is unlikely here),
// it would need to be imported from its new util location and passed the `allAgents` list.

export default async function JourneyDetailPageServer({ params, searchParams }: Props) {
  const journeyId = params.id
  const journey = await fetchJourneyWithLog(journeyId)

  if (!journey) {
    notFound()
  }

  const allAgents = await fetchAllAgents()

  const activeAgentForChatParam = searchParams?.activeAgentForJourneyChat as string | undefined

  const defaultAgent =
    allAgents.find((agent) => agent.isInstalled && agent.id === DEFAULT_AGENT_ID) ||
    allAgents.find((agent) => agent.isInstalled) || // Fallback to any installed agent
    (allAgents.length > 0 ? allAgents[0] : undefined) // Fallback to the first agent if none installed

  const initialSelectedAgentIdForChat =
    activeAgentForChatParam || (defaultAgent ? defaultAgent.id : allAgents.length > 0 ? allAgents[0].id : "")

  // The server actions `processUserJourneyRequest` and `updateJourneyTask` are now imported
  // from `features/journeys/actions.ts`. These actions are responsible for their own
  // data fetching, including fetching agents if needed for assignment.
  // The `JourneyChatView` will call these server actions.

  return (
    <div className="h-full flex flex-col">
      <JourneyChatView
        journeyId={journey.id}
        journeyTitle={journey.title}
        originalRequestText={journey.originalRequest || ""}
        initialLogItems={journey.log || []}
        onUserRequestSubmit={processUserJourneyRequest} // Uses the imported server action
        onTaskUpdate={updateJourneyTask} // Uses the imported server action
        initialSelectedAgentId={initialSelectedAgentIdForChat}
        availableAgents={allAgents} // Pass all agents to JourneyChatView if it needs to populate a selector
      />
    </div>
  )
}
