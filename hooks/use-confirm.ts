"use client"

import { useContext } from "react"
import { ConfirmationContext } from "@/contexts/confirmation-context"
import type { ConfirmationContextType } from "@/interfaces/confirmation"

export function useConfirm(): ConfirmationContextType["showConfirmation"] {
  const context = useContext(ConfirmationContext)
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmationProvider")
  }
  return context.showConfirmation
}
