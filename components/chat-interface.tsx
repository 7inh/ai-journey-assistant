"use client";

import { useChat, type Message as VercelAIMessage } from "@ai-sdk/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import ChatInputForm from "@/components/chat-input-form";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

interface ChatInterfaceProps {
  initialMessages?: VercelAIMessage[];
  journeyId?: string;
  agentId?: string;
  inputPlaceholder?: string;
  initialInput?: string;
}

export default function ChatInterface({
  initialMessages,
  journeyId,
  agentId,
  inputPlaceholder = "Ask anything",
  initialInput = "",
}: ChatInterfaceProps) {
  const { toast } = useToast(); // Initialize useToast
  const {
    messages,
    inputProps,
    handleSubmit,
    isLoading,
    error,
    setInput,
    input,
  } = useChat({
    api: "/api/chat",
    initialMessages,
    body: { journeyId, agentId },
  });

  const initialInputProcessed = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (
      initialInput &&
      (!initialInputProcessed.current || input !== initialInput)
    ) {
      setInput(initialInput);
      initialInputProcessed.current = true;
    }
    if (!initialInput && initialInputProcessed.current && input === "") {
      initialInputProcessed.current = false;
    }
  }, [initialInput, setInput, input]);

  useEffect(() => {
    if (hasMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, hasMessages]);

  const handleToolSelectionOnChatPage = (toolId: string) => {
    // Placeholder for tool functionality on the main chat page if ever needed
    toast({
      title: "Tool Selected (Chat Page)",
      description: `You selected: ${toolId}. This is a general chat, tools might behave differently.`,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full max-h-[calc(100vh-var(--header-height,4rem)-2rem)]",
        !hasMessages && "justify-center items-center"
      )}
    >
      {hasMessages && (
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-start gap-3",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg p-3 text-sm shadow-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted dark:bg-neutral-800"
                  )}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose dark:prose-invert prose-sm max-w-none"
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
                {m.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User avatar"
                    />
                    <AvatarFallback>
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[70%] rounded-lg p-3 text-sm shadow-sm bg-muted dark:bg-neutral-800 animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
      )}

      {error && (
        <div
          className={cn(
            "px-4 pb-2 text-red-500 text-sm",
            !hasMessages && "w-full max-w-3xl mx-auto text-center"
          )}
        >
          Error: {error.message}
        </div>
      )}

      <div
        className={cn(
          "sticky bottom-0 z-10 bg-background flex flex-col items-center",
          !hasMessages && "w-full max-w-3xl"
        )}
      >
        <ChatInputForm
          inputProps={inputProps}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          inputPlaceholder={inputPlaceholder}
          showAgentSelector={false} // Explicitly false
          showToolsPopover={false} // Explicitly false for the main chat interface
          onToolSelect={handleToolSelectionOnChatPage} // Pass a handler, though popover is disabled
        />
      </div>
    </div>
  );
}
