"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea, type TextareaProps } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // Import Popover components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Mic,
  SlidersHorizontal,
  Send,
  ChevronsUpDown,
  Bot,
  Brain,
  Paperclip,
  UploadCloud,
  Link2,
  HardDrive,
  ImageUp,
} from "lucide-react" // Added Brain icon
import { cn } from "@/lib/utils"
import type { Agent } from "@/interfaces"
import { Input } from "@/components/ui/input"

interface UseChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  ref: React.RefObject<HTMLTextAreaElement>
  name?: string
  id?: string
}

interface ChatInputFormProps {
  inputProps?: UseChatInputProps
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  inputPlaceholder?: string
  // Agent selector props
  showAgentSelector?: boolean
  availableAgents?: Agent[]
  selectedAgentId?: string
  onAgentSelect?: (agentId: string) => void
  // Tools popover props
  showToolsPopover?: boolean
  onToolSelect?: (toolId: string) => void // Callback for when a tool is selected
  showMediaUploadOptions?: boolean
  onMediaSubmit?: (sourceType: "file" | "url", data: File | string, fileName?: string) => void
}

export default function ChatInputForm({
  inputProps,
  handleSubmit,
  isLoading,
  inputPlaceholder = "Ask anything...",
  showAgentSelector = false,
  availableAgents = [],
  selectedAgentId,
  onAgentSelect,
  showToolsPopover = false,
  onToolSelect,
  showMediaUploadOptions = false,
  onMediaSubmit,
}: ChatInputFormProps) {
  const internalFallbackRef = useRef<HTMLTextAreaElement>(null)
  const [isToolsPopoverOpen, setIsToolsPopoverOpen] = useState(false)
  const [mediaPopoverOpen, setMediaPopoverOpen] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentValue = inputProps?.value || ""
  const currentOnChange = inputProps?.onChange || (() => {})
  const currentOnKeyDown = inputProps?.onKeyDown || (() => {})
  const currentRef = inputProps?.ref || internalFallbackRef

  useEffect(() => {
    const textareaElement = currentRef.current
    if (textareaElement) {
      textareaElement.style.height = "auto"
      const scrollHeight = textareaElement.scrollHeight
      textareaElement.style.height = `${Math.min(scrollHeight, 120)}px`
    }
  }, [currentValue, currentRef])

  const textareaFinalProps: TextareaProps = {
    ...(inputProps ? { name: inputProps.name, id: inputProps.id } : {}),
    value: currentValue,
    onChange: currentOnChange,
    onKeyDown: currentOnKeyDown,
    ref: currentRef,
    placeholder: inputPlaceholder,
    className:
      "flex-1 border-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none bg-transparent shadow-none p-2 h-auto text-base resize-none min-h-[40px] max-h-[120px] overflow-y-auto",
    rows: 1,
    disabled: isLoading,
  }

  const currentSelectedAgent = useMemo(() => {
    return availableAgents.find((agent) => agent.id === selectedAgentId)
  }, [availableAgents, selectedAgentId])

  const handleToolClick = (toolId: string) => {
    onToolSelect?.(toolId)
    setIsToolsPopoverOpen(false) // Close popover on selection
    // Example: console.log(`${toolId} selected`);
  }

  const ToolsButtonContent = (
    <>
      <SlidersHorizontal className="h-4 w-4" />
      Tools
    </>
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-3xl mx-auto p-3 space-y-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg"
    >
      <Textarea {...textareaFinalProps} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {showAgentSelector && availableAgents.length > 0 && onAgentSelect ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" type="button" className="text-muted-foreground gap-1.5 px-2">
                  {currentSelectedAgent ? (
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src={currentSelectedAgent.avatarUrl || "/placeholder.svg"}
                        alt={currentSelectedAgent.name}
                      />
                      <AvatarFallback>{currentSelectedAgent.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline truncate max-w-[80px] text-xs">
                    {currentSelectedAgent?.name || "Agent"}
                  </span>
                  <ChevronsUpDown className="h-3 w-3 opacity-50 ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
                {availableAgents.map((agent) => (
                  <DropdownMenuItem
                    key={agent.id}
                    onClick={() => onAgentSelect(agent.id)}
                    className={cn("cursor-pointer", agent.id === selectedAgentId && "bg-muted")}
                  >
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarImage src={agent.avatarUrl || "/placeholder.svg"} alt={agent.name} />
                      <AvatarFallback>{agent.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {agent.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {showMediaUploadOptions ? (
                <Popover open={mediaPopoverOpen} onOpenChange={setMediaPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" type="button" className="text-muted-foreground">
                      <Paperclip className="h-5 w-5" />
                      <span className="sr-only">Attach media</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-2" align="start">
                    <div className="grid gap-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm px-2 py-1.5"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload from Computer
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file && onMediaSubmit) {
                            // Basic file type/size validation (example)
                            if (file.size > 10 * 1024 * 1024) {
                              // 10MB limit
                              alert("File is too large (max 10MB).") // Replace with toast
                              return
                            }
                            onMediaSubmit("file", file, file.name)
                            setMediaPopoverOpen(false)
                          }
                          // Reset file input value to allow selecting the same file again
                          if (e.target) e.target.value = ""
                        }}
                        // Example: accept="image/*,application/pdf,.doc,.docx"
                        accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx"
                      />
                      <div className="space-y-1 px-2 py-1.5">
                        <p className="text-sm font-medium leading-none">Embed Link</p>
                        <div className="flex items-center gap-1">
                          <Input
                            type="url"
                            placeholder="https://example.com"
                            className="h-8 text-xs flex-grow"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 flex-shrink-0"
                            onClick={() => {
                              if (urlInput.trim() && onMediaSubmit) {
                                try {
                                  new URL(urlInput.trim()) // Validate URL format
                                  onMediaSubmit("url", urlInput.trim())
                                  setUrlInput("")
                                  setMediaPopoverOpen(false)
                                } catch (error) {
                                  alert("Invalid URL format.") // Replace with toast
                                }
                              }
                            }}
                            disabled={!urlInput.trim()}
                          >
                            <Link2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm px-2 py-1.5"
                        onClick={() => alert("Google Drive integration coming soon!")}
                      >
                        <HardDrive className="mr-2 h-4 w-4" />
                        Google Drive
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm px-2 py-1.5"
                        onClick={() => alert("Google Photos integration coming soon!")}
                      >
                        <ImageUp className="mr-2 h-4 w-4" />
                        Google Photos
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button variant="ghost" size="icon" type="button" className="text-muted-foreground">
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file (disabled)</span>
                </Button>
              )}
            </>
          )}

          {showToolsPopover ? (
            <Popover open={isToolsPopoverOpen} onOpenChange={setIsToolsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" type="button" className="text-muted-foreground gap-1.5">
                  {ToolsButtonContent}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="grid gap-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm px-2 py-1.5"
                    onClick={() => handleToolClick("deep-think")}
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Deep Think
                  </Button>
                  {/* Add more tools here as needed */}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button variant="ghost" size="sm" type="button" className="text-muted-foreground gap-1.5">
              {ToolsButtonContent}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground">
            <Mic className="h-5 w-5" />
            <span className="sr-only">Use microphone</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !currentValue.trim()}
            className={cn(
              "bg-black dark:bg-white text-white dark:text-black rounded-full w-8 h-8 flex-shrink-0 transition-opacity",
              (isLoading || !currentValue.trim()) && "opacity-50",
            )}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
