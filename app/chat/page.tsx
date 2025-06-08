import ChatInterface from "@/components/chat-interface"
import { DEFAULT_AGENT_ID } from "@/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat with AI",
  description: "Chat with an AI agent.",
}

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <ChatInterface agentId={DEFAULT_AGENT_ID} />
    </div>
  )
}
