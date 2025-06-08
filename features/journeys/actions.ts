"use server"; // Ensure server actions are marked

import {
  getJourneyById,
  saveJourney,
  type JourneyLogItemType,
} from "@/features/journeys/api"; // Changed from relative path
import { findSuitableAgentForTask } from "@/features/journeys/utils"; // Changed from relative path
import type {
  Journey,
  JourneyLogItem,
  TaskData,
  PhaseData,
} from "@/interfaces";
import { DEFAULT_AGENT_ID } from "@/constants";

// Helper to add log entry immutably
const addLogEntryToJourney = (
  journey: Journey,
  type: JourneyLogItemType,
  details: Partial<
    Omit<JourneyLogItem, "id" | "journeyId" | "type" | "timestamp">
  > = {}
): Journey => {
  const newLogItem: JourneyLogItem = {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // More unique ID
    journeyId: journey.id,
    type,
    timestamp: new Date().toISOString(),
    ...details,
  };
  return {
    ...journey,
    log: [...(journey.log || []), newLogItem],
  };
};

export async function createJourney(originalRequest: string): Promise<Journey> {
  try {
    const agent = findSuitableAgentForTask(originalRequest);
    const agentId = agent?.id || DEFAULT_AGENT_ID; // Fallback to default agent

    const now = new Date().toISOString();
    const newJourneyData: Omit<Journey, "log"> = {
      id: `journey-${Date.now()}`,
      title:
        originalRequest.substring(0, 50) +
        (originalRequest.length > 50 ? "..." : ""),
      originalRequest: originalRequest,
      phases: [], // Start with no phases, user/AI can add them
      createdAt: now,
      // Default agentId for the journey itself, tasks can have different agents
      // This field isn't standard on Journey, but if it were, it'd be:
      // agentId: agentId,
    };

    // Create initial log items
    let journeyWithLog = addLogEntryToJourney(
      { ...newJourneyData, log: [] },
      "journey-start",
      {
        journeyTitle: newJourneyData.title,
        originalRequestText: newJourneyData.originalRequest,
        isCurrentSystemPlan: true,
      }
    );

    // Example: Add a default first phase and task based on the request
    const firstPhase: PhaseData = {
      id: `phase-${Date.now()}`,
      name: "Initial Planning",
      description: "Define initial tasks based on request.",
    };
    journeyWithLog.phases.push({ ...firstPhase, tasks: [] });
    journeyWithLog = addLogEntryToJourney(journeyWithLog, "phase-header", {
      phaseData: firstPhase,
      isCurrentSystemPlan: true,
    });

    const firstTask: TaskData = {
      id: `task-${Date.now()}`,
      name: `Understand and outline: ${originalRequest.substring(0, 30)}...`,
      completed: false,
      assignedAgentId: agentId,
    };
    journeyWithLog.phases[0].tasks.push(firstTask);
    journeyWithLog = addLogEntryToJourney(journeyWithLog, "task-definition", {
      taskData: firstTask,
      isCurrentSystemPlan: true,
    });

    const savedJourney = await saveJourney(journeyWithLog);
    return savedJourney;
  } catch (error) {
    console.error("Error creating journey:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

export async function updateJourneyStatus(
  journeyId: string,
  status: string
): Promise<Journey> {
  try {
    const journey = await getJourneyById(journeyId);
    if (!journey) {
      throw new Error(`Journey with ID ${journeyId} not found.`);
    }
    // This 'status' field is not standard on Journey interface, if it were, it'd be:
    // journey.status = status;
    // For now, let's log this action
    const journeyWithLog = addLogEntryToJourney(journey, "system-message", {
      text: `Journey status updated to: ${status}`,
    });
    const updatedJourney = await saveJourney(journeyWithLog);
    return updatedJourney;
  } catch (error) {
    console.error(
      `Error updating journey ${journeyId} status to ${status}:`,
      error
    );
    throw error instanceof Error ? error : new Error(String(error));
  }
}

export async function addStepToJourney(
  journeyId: string,
  stepDescription: string
): Promise<Journey> {
  try {
    let journey = await getJourneyById(journeyId);
    if (!journey) {
      throw new Error(`Journey with ID ${journeyId} not found.`);
    }
    // 'steps' is not standard on Journey. Assuming this means adding a task to the first phase.
    const newTask: TaskData = {
      id: `task-${Date.now()}`,
      name: stepDescription,
      completed: false,
      assignedAgentId:
        findSuitableAgentForTask(stepDescription)?.id || DEFAULT_AGENT_ID,
    };

    if (!journey.phases || journey.phases.length === 0) {
      const newPhase: PhaseData = {
        id: `phase-${Date.now()}`,
        name: "General Tasks",
      };
      journey.phases = [{ ...newPhase, tasks: [newTask] }];
      journey = addLogEntryToJourney(journey, "phase-header", {
        phaseData: newPhase,
        isCurrentSystemPlan: true,
      });
    } else {
      journey.phases[0].tasks.push(newTask);
    }
    journey = addLogEntryToJourney(journey, "task-definition", {
      taskData: newTask,
      isCurrentSystemPlan: true,
    });
    journey = addLogEntryToJourney(journey, "system-message", {
      text: `New step/task added: "${stepDescription}"`,
    });

    const updatedJourney = await saveJourney(journey);
    return updatedJourney;
  } catch (error) {
    console.error(`Error adding step to journey ${journeyId}:`, error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

export async function processUserJourneyRequest(
  journeyId: string,
  content: string,
  currentLog: JourneyLogItem[] // currentLog from client, might be slightly stale
): Promise<JourneyLogItem[]> {
  let journey = await getJourneyById(journeyId);
  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found.`);
  }

  // Add user request to log
  journey = addLogEntryToJourney(journey, "user-request", { text: content });

  // Basic command parsing example
  const lowerContent = content.toLowerCase();
  if (lowerContent.startsWith("add task:")) {
    const taskName = content.substring("add task:".length).trim();
    if (taskName) {
      const newTask: TaskData = {
        id: `task-${Date.now()}`,
        name: taskName,
        completed: false,
        assignedAgentId:
          findSuitableAgentForTask(taskName)?.id || DEFAULT_AGENT_ID,
      };
      if (!journey.phases || journey.phases.length === 0) {
        const newPhase: PhaseData = {
          id: `phase-${Date.now()}`,
          name: "Tasks",
        };
        journey.phases = [{ ...newPhase, tasks: [newTask] }];
        journey = addLogEntryToJourney(journey, "phase-header", {
          phaseData: newPhase,
          isCurrentSystemPlan: true,
        });
      } else {
        journey.phases[0].tasks.push(newTask);
      }
      journey = addLogEntryToJourney(journey, "task-definition", {
        taskData: newTask,
        isCurrentSystemPlan: true,
      });
      journey = addLogEntryToJourney(journey, "system-message", {
        text: `Task "${taskName}" added to the first phase.`,
      });
    }
  } else if (lowerContent.startsWith("edit task:")) {
    journey = addLogEntryToJourney(journey, "system-message", {
      text: `Received request to process: ${content}`,
    });
    // More complex parsing and update logic would go here.
    // For example, finding the task, updating its properties, and logging the specific changes.
  }
  // This function is for direct modifications to journey structure based on user text.
  // AI chat responses are handled separately by the /api/chat endpoint.
  const updatedJourney = await saveJourney(journey);
  return updatedJourney.log || [];
}

export async function updateJourneyTask(
  journeyId: string,
  taskId: string,
  updateType: "toggleComplete" | "edit" | "decision",
  payload: any,
  currentLog: JourneyLogItem[] // currentLog from client
): Promise<JourneyLogItem[]> {
  let journey = await getJourneyById(journeyId);
  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found.`);
  }

  let taskUpdated = false;
  let taskNameForLog = "";

  const newPhases = journey.phases.map((phase) => ({
    ...phase,
    tasks: phase.tasks.map((task) => {
      if (task.id === taskId) {
        taskUpdated = true;
        taskNameForLog = task.name;
        const updatedTask = { ...task };

        if (updateType === "toggleComplete") {
          updatedTask.completed = payload.completed;
          journey = addLogEntryToJourney(journey, "system-message", {
            text: `Task "${taskNameForLog}" marked as ${
              updatedTask.completed ? "complete" : "incomplete"
            }.`,
            relatedTaskId: taskId,
          });
        } else if (updateType === "edit" && payload.name) {
          // Example: editing name
          updatedTask.name = payload.name;
          // Potentially log old vs new name or more details
          journey = addLogEntryToJourney(journey, "system-message", {
            text: `Task "${taskNameForLog}" name updated to "${updatedTask.name}".`,
            relatedTaskId: taskId,
          });
          taskNameForLog = updatedTask.name; // Update for subsequent logs if any
        } else if (updateType === "decision" && updatedTask.decisions) {
          const decisionId = payload.decisionId;
          const approved = payload.approved;
          let decisionText = "";
          updatedTask.decisions = updatedTask.decisions.map((d) => {
            if (d.id === decisionId) {
              decisionText = d.text;
              return { ...d, approved: approved };
            }
            return d;
          });
          if (decisionText) {
            journey = addLogEntryToJourney(journey, "system-message", {
              text: `Decision "${decisionText}" for task "${taskNameForLog}" was ${
                approved ? "approved" : "set to not approved"
              }.`,
              relatedTaskId: taskId,
            });
          }
        }
        // Log the updated task definition itself to reflect the new state
        journey = addLogEntryToJourney(journey, "task-definition", {
          taskData: updatedTask,
          isCurrentSystemPlan: true,
          supersedesItemId: `task-def-${taskId}` /* example of how to mark old one */,
        });

        return updatedTask;
      }
      return task;
    }),
  }));

  if (!taskUpdated) {
    console.warn(
      `Task with ID ${taskId} not found in journey ${journeyId} for update.`
    );
    return journey.log || []; // Return current log if no task was updated
  }

  journey.phases = newPhases;
  const updatedJourney = await saveJourney(journey);
  return updatedJourney.log || [];
}
