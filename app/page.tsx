"use client";

import ChatInterface from "@/components/chat-interface";
import { DEFAULT_AGENT_ID } from "@/constants";

// Define the default agent ID and any initial input for the immediate chat
// You can set a default initial input if desired, e.g., "Hello!"
// const DEFAULT_INITIAL_INPUT = "Hello!"
// For now, let's not pre-fill an input unless it's a "new journey" context.

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <ChatInterface agentId={DEFAULT_AGENT_ID} />
    </div>
  );
}
