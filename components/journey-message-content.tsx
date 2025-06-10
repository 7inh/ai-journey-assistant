"use client";

import type React from "react";
import type { JourneyLogItem, TaskData, Agent } from "@/interfaces";
import { JourneyLogIcons } from "@/constants";
import { cn } from "@/lib/utils";
import TaskDisplay from "@/components/journey/task-display";
import PhaseDisplayWithTasks from "@/components/journey/phase-display";

interface JourneyMessageContentProps {
  item: JourneyLogItem;
  allAgents: Agent[];
  onEditTask?: (taskData: TaskData) => void;
  onToggleTaskComplete?: (taskId: string, completed: boolean) => void;
  onDecisionAction?: (
    taskId: string,
    decisionId: string,
    approved: boolean
  ) => void;
  onActionButtonClick?: (taskId: string, actionId: string) => void;
}

export default function JourneyMessageContent({
  item,
  allAgents,
  onEditTask,
  onToggleTaskComplete,
  onDecisionAction,
  onActionButtonClick,
}: JourneyMessageContentProps) {
  let content = null;
  let outdatedText = null;

  if (item.isOutdated) {
    switch (item.type) {
      case "system-message":
        outdatedText = `Message (outdated): ${item.text}`;
        break;
      case "phase-header":
        outdatedText = `Phase (outdated): ${item.phaseData?.name}`;
        break;
      case "task-definition":
        if (item.type === "task-definition" && item.taskData) {
          outdatedText = `Task (outdated): ${item.taskData.name}`;
          const assignedAgent = allAgents.find(
            (agent) => agent.id === item.taskData?.assignedAgentId
          );
          if (assignedAgent) {
            outdatedText += ` (was assigned to ${assignedAgent.name})`;
          }
        }
        break;
      case "user-request":
        outdatedText = `User request (outdated): ${item.text}`;
        break;
      case "ai-response":
        outdatedText = `AI response (outdated): ${item.text}`;
        break;
      case "journey-start":
        outdatedText = `Journey start (outdated): ${
          item.journeyTitle || "Unknown journey"
        }`;
        break;
      default:
        outdatedText = "Item (outdated)";
        break;
    }
  }

  if (outdatedText) {
    content = (
      <div className="italic text-muted-foreground text-sm">{outdatedText}</div>
    );
  } else {
    switch (item.type) {
      case "system-message":
        content = <p>{item.text}</p>;
        break;
      case "phase-header":
        content = (
          <PhaseDisplayWithTasks
            item={item}
            allAgents={allAgents}
            onEditTask={onEditTask}
            onToggleTaskComplete={onToggleTaskComplete}
            onDecisionAction={onDecisionAction}
            onActionButtonClick={onActionButtonClick}
          />
        );
        break;
      case "user-request":
        content = <p>{item.text}</p>;
        break;
      case "ai-response":
        content = <p>{item.text}</p>;
        break;
      case "journey-start":
        content = (
          <div>
            <p className="font-medium">
              Journey Started: {item.journeyTitle || "New Journey"}
            </p>
            {item.originalRequestText && (
              <p className="text-sm text-muted-foreground">
                {item.originalRequestText}
              </p>
            )}
          </div>
        );
        break;
      case "task-definition":
        if (item.taskData) {
          content = (
            <TaskDisplay
              taskData={item.taskData}
              allAgents={allAgents}
              isOutdated={item.isOutdated}
              onEditTask={onEditTask}
              onToggleTaskComplete={onToggleTaskComplete}
              onDecisionAction={onDecisionAction}
              onActionButtonClick={onActionButtonClick}
            />
          );
        } else {
          content = (
            <p className="italic text-muted-foreground">Task data missing.</p>
          );
        }
        break;
      default:
        content = (
          <p className="italic text-muted-foreground">
            Unknown message type: {item.type}
          </p>
        );
        break;
    }
  }

  return <div className="py-2">{content}</div>;
}
