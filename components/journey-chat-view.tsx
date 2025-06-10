"use client";

import type React from "react";
import { useChat } from "@ai-sdk/react";
import type { JourneyLogItem, TaskData, Agent } from "@/interfaces"; // Added Agent
import { useEffect, useMemo, useRef, useState } from "react";
import JourneyMessageContent from "@/components/journey-message-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { JourneyLogIcons } from "@/constants"; // Corrected import for JourneyLogIcons
import ChatInputForm from "@/components/chat-input-form";
import { useHeader } from "@/contexts/header-context";
import { useToast } from "@/components/ui/use-toast";
import { API_ROUTES } from "@/constants/routes.constants";

interface JourneyChatViewProps {
  journeyId: string;
  journeyTitle: string;
  originalRequestText: string;
  initialLogItems: JourneyLogItem[];
  onUserRequestSubmit: (
    journeyId: string,
    content: string,
    currentLog: JourneyLogItem[]
  ) => Promise<JourneyLogItem[]>;
  onTaskUpdate: (
    journeyId: string,
    taskId: string,
    updateType: "toggleComplete" | "edit" | "decision",
    payload: any,
    currentLog: JourneyLogItem[]
  ) => Promise<JourneyLogItem[]>;
  initialSelectedAgentId: string;
  availableAgents: Agent[]; // This prop is crucial
}

function preprocessLogForDisplay(logItems: JourneyLogItem[]): JourneyLogItem[] {
  const processedItems: JourneyLogItem[] = [];
  let i = 0;
  while (i < logItems.length) {
    const currentItem = logItems[i];
    if (
      currentItem.type === "phase-header" &&
      !currentItem.isOutdated &&
      currentItem.phaseData
    ) {
      const phaseItemWithTasks: JourneyLogItem = {
        ...currentItem,
        tasksForPhase: [] as TaskData[],
      };
      let j = i + 1;
      while (j < logItems.length) {
        const nextItem = logItems[j];
        if (
          nextItem.type === "task-definition" &&
          !nextItem.isOutdated &&
          nextItem.taskData
        ) {
          phaseItemWithTasks.tasksForPhase!.push(nextItem.taskData);
          j++;
        } else if (
          nextItem.type === "phase-header" ||
          nextItem.type === "user-request" ||
          nextItem.type === "ai-response"
        ) {
          break;
        } else {
          // This break was originally here, ensure it's correct for the logic.
          // If it's not a task-definition, phase-header, user-request, or ai-response,
          // it implies we stop collecting tasks for the current phase.
          break;
        }
      }
      processedItems.push(phaseItemWithTasks);
      i = j;
    } else if (
      currentItem.type === "task-definition" &&
      currentItem.isOutdated
    ) {
      // Include outdated task definitions directly
      processedItems.push(currentItem);
      i++;
    } else if (
      currentItem.type === "task-definition" &&
      !currentItem.isOutdated
    ) {
      // Include non-outdated task definitions if they are not part of a phase already processed
      // This check ensures tasks aren't duplicated if they are both standalone and under a phase
      const isTaskInAlreadyProcessedPhase = processedItems.some(
        (pItem) =>
          pItem.type === "phase-header" &&
          !pItem.isOutdated &&
          pItem.tasksForPhase?.some((t) => t.id === currentItem.taskData!.id)
      );
      if (!isTaskInAlreadyProcessedPhase) {
        processedItems.push(currentItem);
      }
      i++;
    } else {
      processedItems.push(currentItem);
      i++;
    }
  }
  // Final filter to remove tasks that are now nested under phases
  return processedItems.filter(
    (item) =>
      !(
        item.type === "task-definition" &&
        !item.isOutdated &&
        item.taskData &&
        processedItems.some(
          (pItem) =>
            pItem.type === "phase-header" &&
            !pItem.isOutdated &&
            pItem.tasksForPhase?.some((t) => t.id === item.taskData!.id)
        )
      )
  );
}

export default function JourneyChatView({
  journeyId,
  journeyTitle,
  originalRequestText,
  initialLogItems,
  onUserRequestSubmit,
  onTaskUpdate,
  initialSelectedAgentId,
  availableAgents, // This prop is crucial
}: JourneyChatViewProps) {
  const { setOverrideTitle } = useHeader();
  const { toast } = useToast();
  const [currentLog, setCurrentLog] = useState<JourneyLogItem[]>([]);
  const [taskActionLoading, setTaskActionLoading] = useState(false);
  const [currentAgentId, setCurrentAgentId] = useState(initialSelectedAgentId);
  const [isSubmittingUserRequest, setIsSubmittingUserRequest] = useState(false);

  // Use availableAgents prop to derive installedAgents
  const installedAgents = useMemo(
    () => availableAgents.filter((agent) => agent.isInstalled),
    [availableAgents]
  );

  useEffect(() => {
    setOverrideTitle(journeyTitle);
    return () => {
      setOverrideTitle(null);
    };
  }, [journeyTitle, setOverrideTitle]);

  useEffect(() => {
    setCurrentAgentId(initialSelectedAgentId);
  }, [initialSelectedAgentId]);

  useEffect(() => {
    const itemsWithOriginalRequest = [...initialLogItems];
    if (originalRequestText) {
      const originalRequestItem: JourneyLogItem = {
        id: `jrney-orig-req-${journeyId}`,
        journeyId,
        type: "user-request",
        text: originalRequestText,
        timestamp:
          initialLogItems.find((item) => item.type === "journey-start")
            ?.timestamp || new Date(0).toISOString(),
        isCurrentSystemPlan: false,
      };
      if (
        !itemsWithOriginalRequest.find(
          (item) => item.id === originalRequestItem.id
        )
      ) {
        itemsWithOriginalRequest.unshift(originalRequestItem);
      }
    }
    setCurrentLog(itemsWithOriginalRequest);
  }, [initialLogItems, journeyId, originalRequestText]);

  const displayableLogItems = useMemo(
    () => preprocessLogForDisplay(currentLog),
    [currentLog]
  );

  const {
    messages: aiMessages,
    inputProps,
    handleSubmit: aiChatHandleSubmit,
    isLoading: aiChatIsLoading,
    error,
    setInput,
    setMessages,
  } = useChat({
    api: API_ROUTES.CHAT,
    initialMessages: [],
    body: {
      journeyId,
      agentId: currentAgentId,
    },
    onResponse: (response) => {
      if (!response.ok) {
        console.error("AI API Error:", response.status, response.statusText);
      }
    },
    onError: (error) => {
      console.error("AI Chat Hook Error:", error);
    },
  });

  const handleAgentChange = (newAgentId: string) => {
    setCurrentAgentId(newAgentId);
    setMessages([]);
  };

  const handleToolSelection = (toolId: string) => {
    toast({
      title: "Tool Selected",
      description: `You selected: ${toolId}. Functionality to be implemented.`,
    });
    if (toolId === "deep-think") {
      setInput(`Deep Think: ${inputProps.value}`);
    }
  };

  const handleTaskEdit = async (taskData: TaskData) => {
    setInput(`edit task "${taskData.name}": `);
    const textareaElement =
      typeof inputProps.ref === "object" && inputProps.ref?.current;
    textareaElement?.focus();
  };

  const handleToggleTaskComplete = async (
    taskId: string,
    completed: boolean
  ) => {
    setTaskActionLoading(true);
    try {
      const updatedLog = await onTaskUpdate(
        journeyId,
        taskId,
        "toggleComplete",
        { completed },
        currentLog
      );
      setCurrentLog(updatedLog);
    } catch (e) {
      console.error("Error toggling task:", e);
    } finally {
      setTaskActionLoading(false);
    }
  };

  const handleDecisionAction = async (
    taskId: string,
    decisionId: string,
    approved: boolean
  ) => {
    setTaskActionLoading(true);
    try {
      const updatedLog = await onTaskUpdate(
        journeyId,
        taskId,
        "decision",
        { decisionId, approved },
        currentLog
      );
      setCurrentLog(updatedLog);
    } catch (e) {
      console.error("Error handling decision:", e);
    } finally {
      setTaskActionLoading(false);
    }
  };

  const handleJourneyChatSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const currentInputText = inputProps.value;
    if (!currentInputText.trim()) return;

    const userLogItem: JourneyLogItem = {
      id: `user-log-${Date.now()}`,
      journeyId,
      type: "user-request",
      text: currentInputText,
      timestamp: new Date().toISOString(),
    };
    const newLogWithUserMessage = [...currentLog, userLogItem];
    setCurrentLog(newLogWithUserMessage);

    aiChatHandleSubmit(e);

    if (
      currentInputText.toLowerCase().startsWith("add task:") ||
      currentInputText.toLowerCase().startsWith("edit task:")
    ) {
      setIsSubmittingUserRequest(true);
      try {
        const updatedLogItems = await onUserRequestSubmit(
          journeyId,
          currentInputText,
          newLogWithUserMessage
        );
        setCurrentLog(updatedLogItems);
      } catch (err) {
        console.error(
          "Error submitting user request for journey modification:",
          err
        );
        setCurrentLog(currentLog.filter((item) => item.id !== userLogItem.id));
      } finally {
        setIsSubmittingUserRequest(false);
      }
    }
  };

  const handleMediaSubmit = (
    sourceType: "file" | "url",
    data: File | string,
    fileName?: string
  ) => {
    console.log("Media submitted:", { sourceType, data, fileName });
    let mediaText = "";
    if (sourceType === "file" && data instanceof File) {
      mediaText = `Attached file: ${fileName || data.name} (${(
        data.size / 1024
      ).toFixed(2)} KB)`;
      toast({
        title: "File Selected",
        description: `${
          fileName || data.name
        } ready to be sent with your message. (Upload simulation)`,
      });
    } else if (sourceType === "url" && typeof data === "string") {
      mediaText = `Embedded link: ${data}`;
      toast({
        title: "Link Ready",
        description: `URL ${data} ready to be embedded. (Validation simulation)`,
      });
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayableLogItems, aiMessages]);

  const isLoading =
    taskActionLoading || aiChatIsLoading || isSubmittingUserRequest;
  const currentAgentForPlaceholder = availableAgents.find(
    (a) => a.id === currentAgentId
  );

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {displayableLogItems.map((item) => {
            const IconComponent =
              JourneyLogIcons[item.type] || JourneyLogIcons["system-message"];
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3",
                  item.type === "user-request" ? "justify-end" : "justify-start"
                )}
              >
                {item.type !== "user-request" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback
                      className={cn(
                        item.isOutdated && "bg-gray-300 dark:bg-gray-700"
                      )}
                    >
                      <IconComponent size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg p-3 text-sm shadow-sm",
                    item.type === "user-request"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted dark:bg-neutral-800",
                    item.isOutdated &&
                      "border border-dashed border-gray-400 dark:border-gray-600 opacity-70"
                  )}
                >
                  <JourneyMessageContent
                    item={item}
                    allAgents={availableAgents} // Pass availableAgents down
                    onEditTask={handleTaskEdit}
                    onToggleTaskComplete={handleToggleTaskComplete}
                    onDecisionAction={handleDecisionAction}
                  />
                </div>
              </div>
            );
          })}
          {aiMessages
            .filter(
              (aiMsg) =>
                !currentLog.some(
                  (logItem) =>
                    logItem.id === aiMsg.id ||
                    (logItem.type ===
                      (aiMsg.role === "user"
                        ? "user-request"
                        : "ai-response") &&
                      logItem.text === aiMsg.content)
                )
            )
            .map((m) => (
              <div
                key={`ai-${m.id}`}
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
              </div>
            ))}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] rounded-lg p-3 text-sm shadow-sm bg-muted dark:bg-neutral-800 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      {error && (
        <div className="px-4 pb-2 text-red-500 text-sm">
          Error: {error.message}
        </div>
      )}

      <div className="sticky bottom-0 z-10 bg-background flex flex-col items-center">
        <ChatInputForm
          inputProps={inputProps}
          handleSubmit={handleJourneyChatSubmit}
          isLoading={isLoading}
          inputPlaceholder={`Chat with ${
            currentAgentForPlaceholder?.name || "agent"
          }...`}
          showAgentSelector={true}
          availableAgents={installedAgents} // Use derived installedAgents
          selectedAgentId={currentAgentId}
          onAgentSelect={handleAgentChange}
          showToolsPopover={true}
          onToolSelect={handleToolSelection}
          showMediaUploadOptions={true}
          onMediaSubmit={handleMediaSubmit}
        />
      </div>
    </div>
  );
}
