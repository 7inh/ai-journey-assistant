"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  // DialogHeader, DialogTitle, DialogDescription are not used here as Command has its own structure
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import type { Journey } from "@/interfaces"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchModalProps {
  journeys: Journey[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ journeys, open, onOpenChange }: SearchModalProps) {
  const router = useRouter()
  const [inputValue, setInputValue] = React.useState("")

  const handleSelectJourney = (journeyId: string) => {
    router.push(`/journeys/${journeyId}`)
    onOpenChange(false) // Close modal on selection
  }

  React.useEffect(() => {
    if (open) {
      setInputValue("") // Reset input when modal opens
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-transparent backdrop-blur-none" />
        <DialogContent
          className={cn(
            // Default shadcn/ui DialogContent positioning and animations are kept,
            // but we override specific styles for this search modal.
            // top-[50%] is default, we want it higher for a command palette feel.
            "top-[20%] translate-y-[-20%]", // Adjust vertical position
            "p-0 sm:max-w-[625px] overflow-hidden", // Remove padding for Command, set width
            // Ensure other necessary styles from default DialogContent are maintained if needed,
            // or rely on its base styles and only override what's necessary.
            // The base DialogContent already includes:
            // "fixed left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
            // We are overriding `p-6` with `p-0` and `top-[50%]` with `top-[20%]` effectively.
          )}
          onOpenAutoFocus={(e) => e.preventDefault()} // Prevent DialogContent from stealing focus from CommandInput
        >
          <Command
            shouldFilter={true}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <CommandInput placeholder="Search journeys..." value={inputValue} onValueChange={setInputValue} autoFocus />
            <CommandList className="max-h-[calc(100vh-200px)] sm:max-h-[400px]">
              <CommandEmpty>No journeys found.</CommandEmpty>
              <CommandGroup heading="Journeys">
                {journeys.map((journey) => (
                  <CommandItem
                    key={journey.id}
                    value={`${journey.title} ${journey.originalRequest || ""}`} // Value to search against
                    onSelect={() => handleSelectJourney(journey.id)}
                    className="cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{journey.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
