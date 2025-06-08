"use client"

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react"

interface HeaderContextType {
  overrideTitle: string | null
  setOverrideTitle: Dispatch<SetStateAction<string | null>>
  pageControls: ReactNode | null // Renamed from headerActions to match AppHeader's consumption
  setPageControls: Dispatch<SetStateAction<ReactNode | null>> // Renamed from setHeaderActions
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [currentOverrideTitle, setCurrentOverrideTitle] = useState<string | null>(null)
  const [currentPageControls, setCurrentPageControls] = useState<ReactNode | null>(null)

  return (
    <HeaderContext.Provider
      value={{
        overrideTitle: currentOverrideTitle,
        setOverrideTitle: setCurrentOverrideTitle,
        pageControls: currentPageControls,
        setPageControls: setCurrentPageControls,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider")
  }
  return context
}
