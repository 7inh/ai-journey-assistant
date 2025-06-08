import { openai } from "@ai-sdk/openai"
import type { CoreMessage } from "ai"
import { streamText } from "ai"
import { mockAgents } from "@/features/agents/mock-agents"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, agentId }: { messages: CoreMessage[]; agentId?: string } = await req.json()

    let systemPromptContent = `You are an AI Journey Assistant. Help users manage their tasks and journeys.
    Users can issue commands like:
    - "new journey: [description]" to start a new journey.
    - "show tasks for [journey name]" to list tasks.
    - "help me decide on [decision point]" for guidance.
    Keep responses concise and helpful. If a user starts a new journey, acknowledge it and perhaps ask for the first task.
    If a user asks to show tasks, try to list them clearly.
    For decisions, provide balanced pros and cons or ask clarifying questions.
    The current date is ${new Date().toLocaleDateString()}.
    `

    if (agentId) {
      const selectedAgent = mockAgents.find((agent) => agent.id === agentId)
      if (selectedAgent && selectedAgent.systemPrompt) {
        systemPromptContent = selectedAgent.systemPrompt
      }
    }

    const allMessages: CoreMessage[] = [
      {
        role: "system",
        content: systemPromptContent,
      },
      ...messages,
    ]

    const result = await streamText({
      model: openai("gpt-4o"),
      messages: allMessages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response(JSON.stringify({ error: "An unknown error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
