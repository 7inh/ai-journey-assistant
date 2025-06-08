import { mockJourneys as initialMockJourneys } from "@/lib/data" // Import the fully processed mockJourneys
import type { Journey, JourneyLogItemType } from "@/interfaces"

// Simulate API delay
const apiDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Initialize an in-memory store for journeys with a deep copy of the initial data
const journeysDB: Journey[] = JSON.parse(JSON.stringify(initialMockJourneys))

export async function fetchJourneyWithLog(journeyId: string): Promise<Journey | undefined> {
  await apiDelay(100)
  const journey = journeysDB.find((j) => j.id === journeyId)
  return journey ? JSON.parse(JSON.stringify(journey)) : undefined // Return a copy
}

export async function getJourneyById(journeyId: string): Promise<Journey | undefined> {
  await apiDelay(50)
  const journey = journeysDB.find((j) => j.id === journeyId)
  return journey ? JSON.parse(JSON.stringify(journey)) : undefined // Return a copy
}

export async function saveJourney(journeyToSave: Journey): Promise<Journey> {
  await apiDelay(100)
  const journeyIndex = journeysDB.findIndex((j) => j.id === journeyToSave.id)
  // Work with a deep copy to prevent unintended mutations of journeyToSave affecting other parts of the app
  const journeyCopy = JSON.parse(JSON.stringify(journeyToSave))

  if (journeyIndex !== -1) {
    journeysDB[journeyIndex] = journeyCopy // Update existing journey
  } else {
    // This case handles creating a new journey if it wasn't found.
    // The `createJourney` action in `actions.ts` prepares the new journey object.
    journeysDB.push(journeyCopy)
  }

  // Find and return a fresh copy of the saved/added journey from the DB
  // This ensures the returned object is the one actually in the "database"
  const resultJourney = journeysDB.find((j) => j.id === journeyToSave.id)
  if (!resultJourney) {
    console.error("Critical error: Journey not found in DB after save operation for ID:", journeyToSave.id)
    throw new Error("Failed to save or find journey after operation.")
  }
  return JSON.parse(JSON.stringify(resultJourney))
}

// If generateStaticParams needs all journey IDs:
export async function fetchAllJourneyIds(): Promise<string[]> {
  await apiDelay(10)
  return journeysDB.map((j) => j.id)
}

// Export types that might be used by actions
export type { JourneyLogItemType }
