"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useTheme as useNextTheme } from "next-themes"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark" | undefined
  systemTheme: "light" | "dark" | undefined
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for next-themes to hydrate
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const contextValue: ThemeContextType = {
    theme: (theme as Theme) || "system",
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    resolvedTheme: resolvedTheme as "light" | "dark" | undefined,
    systemTheme: systemTheme as "light" | "dark" | undefined,
    isLoading,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}

// Custom hook for theme-aware styling
export const useThemeAwareStyles = () => {
  const { resolvedTheme, isLoading } = useThemeContext()

  const getThemeClass = (lightClass: string, darkClass: string) => {
    if (isLoading) return lightClass // Default to light during loading
    return resolvedTheme === "dark" ? darkClass : lightClass
  }

  const getThemeValue = <T,>(lightValue: T, darkValue: T): T => {
    if (isLoading) return lightValue // Default to light during loading
    return resolvedTheme === "dark" ? darkValue : lightValue
  }

  return {
    getThemeClass,
    getThemeValue,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    isLoading,
  }
}
