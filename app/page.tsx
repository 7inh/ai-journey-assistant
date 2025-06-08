"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "./loading" // Optional: show a loading indicator during redirect
import { DEFAULT_AGENT_ID } from "@/constants"

// Define the default agent ID and any initial input for the immediate chat
// You can set a default initial input if desired, e.g., "Hello!"
// const DEFAULT_INITIAL_INPUT = "Hello!"
// For now, let's not pre-fill an input unless it's a "new journey" context.

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Construct the target chat URL
    const targetUrl = `/chat?agentId=${DEFAULT_AGENT_ID}`
    // if (DEFAULT_INITIAL_INPUT) {
    //   targetUrl += `&initialInput=${encodeURIComponent(DEFAULT_INITIAL_INPUT)}`;
    // }
    router.replace(targetUrl)
  }, [router])

  // Render a loading state or null while redirecting
  // Using the existing Loading component or a simple div
  return <Loading />
  // Or: return <div className="flex h-screen items-center justify-center"><p>Loading chat...</p></div>;
}
