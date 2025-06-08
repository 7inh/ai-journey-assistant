"use client"
import { createContext, useState, useCallback, type ReactNode } from "react"
import type { ConfirmationOptions, ConfirmationContextType } from "@/interfaces/confirmation"

const defaultConfirmationOptions: ConfirmationOptions = {
  title: "Are you sure?",
  message: "Please confirm this action.",
  confirmText: "Confirm",
  cancelText: "Cancel",
  variant: "default",
}

export const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined)

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmationOptions>(defaultConfirmationOptions)
  const [resolvePromise, setResolvePromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const showConfirmation = useCallback((opts?: ConfirmationOptions): Promise<boolean> => {
    setOptions({ ...defaultConfirmationOptions, ...opts })
    setIsOpen(true)
    return new Promise<boolean>((resolve) => {
      setResolvePromise({ resolve })
    })
  }, [])

  const handleConfirm = useCallback(() => {
    if (resolvePromise) {
      resolvePromise.resolve(true)
    }
    setIsOpen(false)
  }, [resolvePromise])

  const handleCancel = useCallback(() => {
    if (resolvePromise) {
      resolvePromise.resolve(false)
    }
    setIsOpen(false)
  }, [resolvePromise])

  return (
    <ConfirmationContext.Provider
      value={{
        isOpen,
        options,
        showConfirmation,
        handleConfirm,
        handleCancel,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  )
}
