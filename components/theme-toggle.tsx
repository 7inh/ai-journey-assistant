"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useThemeContext } from "@/contexts/theme-context"

interface ThemeToggleProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  orientation?: "horizontal" | "vertical"
}

export function ThemeToggle({
  className,
  size = "md",
  showLabel = true,
  orientation = "horizontal",
}: ThemeToggleProps) {
  const { theme, setTheme, isLoading } = useThemeContext()

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const iconSizes = {
    sm: "h-2.5 w-2.5",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }

  const containerClasses = cn(
    "flex items-center rounded-md border border-border bg-muted/50 p-1",
    orientation === "vertical" && "flex-col",
    className,
  )

  if (isLoading) {
    return (
      <div className={cn("flex items-center", showLabel && "justify-between")}>
        {showLabel && <span className="text-sm font-medium">Theme</span>}
        <div className={cn(containerClasses, "animate-pulse")}>
          <div className={cn(sizeClasses[size], "rounded-sm bg-muted")} />
          <div className={cn(sizeClasses[size], "rounded-sm bg-muted")} />
          <div className={cn(sizeClasses[size], "rounded-sm bg-muted")} />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center", showLabel && "justify-between")}>
      {showLabel && <span className="text-sm font-medium">Theme</span>}
      <div className={containerClasses}>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            sizeClasses[size],
            "rounded-sm transition-all duration-200",
            theme === "system" && "bg-background shadow-sm",
          )}
          onClick={() => setTheme("system")}
          aria-label="System theme"
          title="System theme"
        >
          <Monitor className={iconSizes[size]} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            sizeClasses[size],
            "rounded-sm transition-all duration-200",
            theme === "light" && "bg-background shadow-sm",
          )}
          onClick={() => setTheme("light")}
          aria-label="Light theme"
          title="Light theme"
        >
          <Sun className={iconSizes[size]} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            sizeClasses[size],
            "rounded-sm transition-all duration-200",
            theme === "dark" && "bg-background shadow-sm",
          )}
          onClick={() => setTheme("dark")}
          aria-label="Dark theme"
          title="Dark theme"
        >
          <Moon className={iconSizes[size]} />
        </Button>
      </div>
    </div>
  )
}
