"use client";

import type React from "react";
import type { TaskData, Agent } from "@/interfaces";
import { JourneyLogIcons } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Edit3, CheckCircle2, Hourglass } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

interface TaskDisplayProps {
  taskData: TaskData;
  allAgents: Agent[];
  isOutdated?: boolean;
  onEditTask?: (taskData: TaskData) => void;
  onToggleTaskComplete?: (taskId: string, completed: boolean) => void;
  onDecisionAction?: (
    taskId: string,
    decisionId: string,
    approved: boolean
  ) => void;
  onActionButtonClick?: (taskId: string, actionId: string) => void;
}

export default function TaskDisplay({
  taskData,
  allAgents,
  isOutdated,
  onEditTask,
  onToggleTaskComplete,
  onDecisionAction,
  onActionButtonClick,
}: TaskDisplayProps) {
  const assignedAgent: Agent | undefined = allAgents.find(
    (agent) => agent.id === taskData.assignedAgentId
  );
  const confirm = useConfirm();

  return (
    <div
      className={cn(
        "space-y-2 mt-1 py-2",
        !isOutdated && "border-t border-dashed first:border-t-0 first:pt-0"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <Checkbox
            id={`task-msg-${taskData.id}`}
            checked={taskData.completed}
            disabled={isOutdated}
            onCheckedChange={(checked) =>
              onToggleTaskComplete?.(taskData.id, !!checked)
            }
            className="flex-shrink-0 mt-0.5"
          />
          <div className="flex-grow">
            <label
              htmlFor={`task-msg-${taskData.id}`}
              className={cn(
                "font-medium",
                taskData.completed && "line-through"
              )}
            >
              {taskData.name}
            </label>
            {assignedAgent && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <Avatar className="h-4 w-4">
                  <AvatarImage
                    src={assignedAgent.avatarUrl || "/placeholder.svg"}
                    alt={assignedAgent.name}
                  />
                  <AvatarFallback className="text-xs">
                    {assignedAgent.name.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  Assigned to: {assignedAgent.name}
                </span>
              </div>
            )}
          </div>
        </div>
        {onEditTask && !isOutdated && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 flex-shrink-0"
            onClick={() => onEditTask(taskData)}
          >
            <Edit3 size={14} />
          </Button>
        )}
      </div>
      {taskData.description && (
        <p className="text-xs text-muted-foreground pl-6">
          {taskData.description}
        </p>
      )}
      {taskData.taskType && (
        <Badge variant="outline" className="text-xs ml-6">
          Type: {taskData.taskType}
        </Badge>
      )}
      {taskData.actionLabel && !isOutdated && !taskData.isMultiDecision && (
        <Button
          size="sm"
          variant="outline"
          className="ml-6"
          onClick={() => console.log("Action for task:", taskData.id)}
        >
          {taskData.actionLabel}
        </Button>
      )}
      {taskData.isMultiDecision && taskData.decisions && (
        <div className="mt-2 pt-2 border-t border-dashed pl-6">
          <p className="text-xs font-medium mb-1 text-muted-foreground flex items-center gap-1">
            {JourneyLogIcons.Decision && <JourneyLogIcons.Decision size={14} />}{" "}
            Decisions:
          </p>
          {taskData.decisions.map((d) => (
            <div
              key={d.id}
              className={cn(
                "flex items-center justify-between text-xs p-1.5 rounded-md my-1",
                d.isQuickApprove && "bg-amber-50 dark:bg-amber-900/20",
                isOutdated && "opacity-70"
              )}
            >
              <div className="flex items-center gap-1.5">
                {d.approved ? (
                  <CheckCircle2 size={14} className="text-green-600" />
                ) : (
                  <Hourglass size={14} className="text-amber-600" />
                )}
                <span>{d.text}</span>
              </div>
              {!d.approved && !isOutdated && (
                <div className="flex gap-1">
                  {d.isQuickApprove ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800/40"
                      onClick={async () => {
                        const confirmed = await confirm({
                          title: "Confirm Approval",
                          message: `Are you sure you want to approve: "${d.text}"? This action may trigger automated processes.`,
                          confirmText: "Yes, Approve",
                          cancelText: "Cancel",
                          variant: "default",
                        });

                        if (confirmed) {
                          onDecisionAction?.(taskData.id, d.id, true);
                        }
                      }}
                    >
                      Approve
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onDecisionAction?.(taskData.id, d.id, false)
                        }
                      >
                        No
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={async () => {
                          const confirmed = await confirm({
                            title: "Confirm Decision",
                            message: `Are you sure you want to approve: "${d.text}"?`,
                            confirmText: "Yes, Approve",
                            cancelText: "Cancel",
                            variant: "default",
                          });

                          if (confirmed) {
                            onDecisionAction?.(taskData.id, d.id, true);
                          }
                        }}
                      >
                        Yes
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {taskData.actionButtons &&
        taskData.actionButtons.length > 0 &&
        !isOutdated && (
          <div className="flex gap-2 mt-2 ml-6">
            {taskData.actionButtons.map((button) => (
              <Button
                key={button.actionId}
                variant={button.variant}
                size="sm"
                onClick={() =>
                  onActionButtonClick?.(taskData.id, button.actionId)
                }
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
    </div>
  );
}
