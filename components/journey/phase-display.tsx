"use client";

import type React from "react";
import type { JourneyLogItem, TaskData, Agent } from "@/interfaces";
import TaskDisplay from "@/components/journey/task-display";

interface PhaseDisplayProps {
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

export default function PhaseDisplayWithTasks({
  item,
  allAgents,
  onEditTask,
  onToggleTaskComplete,
  onDecisionAction,
  onActionButtonClick,
}: PhaseDisplayProps) {
  if (!item.phaseData) return null;

  return (
    <div>
      <div className="font-semibold text-base pb-1 mb-1 border-b border-foreground/20">
        {item.phaseData.name}
        {item.phaseData.description && (
          <p className="text-xs text-muted-foreground font-normal mt-0.5">
            {item.phaseData.description}
          </p>
        )}
      </div>
      {item.tasksForPhase && item.tasksForPhase.length > 0 ? (
        item.tasksForPhase.map((task) => (
          <TaskDisplay
            key={task.id}
            taskData={task}
            allAgents={allAgents}
            isOutdated={item.isOutdated}
            onEditTask={onEditTask}
            onToggleTaskComplete={onToggleTaskComplete}
            onDecisionAction={onDecisionAction}
            onActionButtonClick={onActionButtonClick}
          />
        ))
      ) : (
        <p className="text-xs text-muted-foreground italic py-1">
          No tasks defined for this phase yet.
        </p>
      )}
    </div>
  );
}
