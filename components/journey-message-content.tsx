"use client"

import type React from "react"
import type { JourneyLogItem, TaskData, Agent } from "@/interfaces"
// Removed: import { mockAgents } from "@/lib/data" // CRITICAL: Ensure this is gone
import { JourneyLogIcons } from "@/constants" // Corrected import for JourneyLogIcons
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Edit3, CheckCircle2, Hourglass } from "lucide-react"

interface JourneyMessageContentProps {
  item: JourneyLogItem
  allAgents: Agent[] // Expect allAgents to be passed as a prop
  onEditTask?: (taskData: TaskData) => void
  onToggleTaskComplete?: (taskId: string, completed: boolean) => void
  onDecisionAction?: (taskId: string, decisionId: string, approved: boolean) => void
}

const TaskDisplay: React.FC<{
  taskData: TaskData
  allAgents: Agent[] // Expect allAgents to be passed as a prop
  isOutdated?: boolean
  onEditTask?: (taskData: TaskData) => void
  onToggleTaskComplete?: (taskId: string, completed: boolean) => void
  onDecisionAction?: (taskId: string, decisionId: string, approved: boolean) => void
}> = ({ taskData, allAgents, isOutdated, onEditTask, onToggleTaskComplete, onDecisionAction }) => {
  const assignedAgent: Agent | undefined = allAgents.find((agent) => agent.id === taskData.assignedAgentId)

  return (
    <div className={cn("space-y-2 mt-1 py-2", !isOutdated && "border-t border-dashed first:border-t-0 first:pt-0")}>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <Checkbox
            id={`task-msg-${taskData.id}`}
            checked={taskData.completed}
            disabled={isOutdated}
            onCheckedChange={(checked) => onToggleTaskComplete?.(taskData.id, !!checked)}
            className="flex-shrink-0 mt-0.5"
          />
          <div className="flex-grow">
            <label
              htmlFor={`task-msg-${taskData.id}`}
              className={cn("font-medium", taskData.completed && "line-through")}
            >
              {taskData.name}
            </label>
            {assignedAgent && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={assignedAgent.avatarUrl || "/placeholder.svg"} alt={assignedAgent.name} />
                  <AvatarFallback className="text-xs">
                    {assignedAgent.name.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Assigned to: {assignedAgent.name}</span>
              </div>
            )}
          </div>
        </div>
        {onEditTask && !isOutdated && (
          <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => onEditTask(taskData)}>
            <Edit3 size={14} />
          </Button>
        )}
      </div>
      {taskData.description && <p className="text-xs text-muted-foreground pl-6">{taskData.description}</p>}
      {taskData.taskType && (
        <Badge variant="outline" className="text-xs ml-6">
          Type: {taskData.taskType}
        </Badge>
      )}
      {taskData.actionLabel && !isOutdated && !taskData.isMultiDecision && (
        <Button
          size="xs"
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
            {JourneyLogIcons.Decision && <JourneyLogIcons.Decision size={14} />} Decisions:
          </p>
          {taskData.decisions.map((d) => (
            <div
              key={d.id}
              className={cn(
                "flex items-center justify-between text-xs p-1.5 rounded-md my-1",
                d.isQuickApprove && "bg-amber-50 dark:bg-amber-900/20",
                isOutdated && "opacity-70",
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
                      size="xs"
                      variant="outline"
                      className="border-amber-500 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800/40"
                      onClick={() => onDecisionAction?.(taskData.id, d.id, true)}
                    >
                      Approve
                    </Button>
                  ) : (
                    <>
                      <Button size="xs" variant="outline" onClick={() => onDecisionAction?.(taskData.id, d.id, false)}>
                        No
                      </Button>
                      <Button size="xs" variant="default" onClick={() => onDecisionAction?.(taskData.id, d.id, true)}>
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
      {taskData.actionButtons && taskData.actionButtons.length > 0 && !isOutdated && (
        <div className="flex gap-2 mt-2 ml-6">
          {taskData.actionButtons.map((button) => (
            <Button
              key={button.actionId}
              variant={button.variant}
              size="xs"
              onClick={() => console.log(`Button ${button.actionId} clicked for task ${taskData.id}`)}
            >
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

const PhaseDisplayWithTasks: React.FC<{
  item: JourneyLogItem
  allAgents: Agent[] // Expect allAgents to be passed as a prop
  onEditTask?: (taskData: TaskData) => void
  onToggleTaskComplete?: (taskId: string, completed: boolean) => void
  onDecisionAction?: (taskId: string, decisionId: string, approved: boolean) => void
}> = ({ item, allAgents, onEditTask, onToggleTaskComplete, onDecisionAction }) => {
  if (!item.phaseData) return null
  return (
    <div>
      <div className="font-semibold text-base pb-1 mb-1 border-b border-foreground/20">
        {item.phaseData.name}
        {item.phaseData.description && (
          <p className="text-xs text-muted-foreground font-normal mt-0.5">{item.phaseData.description}</p>
        )}
      </div>
      {item.tasksForPhase && item.tasksForPhase.length > 0 ? (
        item.tasksForPhase.map((task) => (
          <TaskDisplay
            key={task.id}
            taskData={task}
            allAgents={allAgents} // Pass down
            isOutdated={item.isOutdated}
            onEditTask={onEditTask}
            onToggleTaskComplete={onToggleTaskComplete}
            onDecisionAction={onDecisionAction}
          />
        ))
      ) : (
        <p className="text-xs text-muted-foreground italic py-1">No tasks defined for this phase yet.</p>
      )}
    </div>
  )
}

export default function JourneyMessageContent({
  item,
  allAgents,
  onEditTask,
  onToggleTaskComplete,
  onDecisionAction,
}: JourneyMessageContentProps) {
  let content = null
  let outdatedText = null

  if (item.isOutdated) {
    switch (item.type) {
      case "message":
        outdatedText = `Message (outdated): ${item.message}`
        break
      case "phase-definition":
        outdatedText = `Phase (outdated): ${item.phaseData?.name}`
        break
      case "task-definition":
        if (item.type === "task-definition" && item.taskData) {
          outdatedText = `Task (outdated): ${item.taskData.name}`
          // const assignedAgent = mockAgents.find((agent) => agent.id === item.taskData?.assignedAgentId) // OLD
          const assignedAgent = allAgents.find((agent) => agent.id === item.taskData?.assignedAgentId) // NEW
          if (assignedAgent) {
            outdatedText += ` (was assigned to ${assignedAgent.name})`
          }
        }
        break
      default:
        outdatedText = "Item (outdated)"
        break
    }
  }

  if (outdatedText) {
    content = <div className="italic text-muted-foreground text-sm">{outdatedText}</div>
  } else {
    switch (item.type) {
      case "message":
        content = <p>{item.message}</p>
        break
      case "phase-definition":
        content = (
          <PhaseDisplayWithTasks
            item={item}
            allAgents={allAgents}
            onEditTask={onEditTask}
            onToggleTaskComplete={onToggleTaskComplete}
            onDecisionAction={onDecisionAction}
          />
        )
        break
      default:
        content = <p className="italic text-muted-foreground">Unknown message type.</p>
        break
    }
  }

  return <div className="py-2">{content}</div>
}
