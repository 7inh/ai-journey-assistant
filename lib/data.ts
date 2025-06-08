import type { Journey, JourneyLogItem } from "@/interfaces" // Removed Agent, Review, ShowcaseItem
import { SearchIcon as SearchIconLucide, Compass, PlusCircle } from "lucide-react"

const generateInitialLog = (journey: Omit<Journey, "log">): JourneyLogItem[] => {
  const log: JourneyLogItem[] = []
  const now = new Date()

  log.push({
    id: `${journey.id}-start`,
    journeyId: journey.id,
    type: "journey-start",
    timestamp: journey.createdAt,
    journeyTitle: journey.title,
    originalRequestText: journey.originalRequest,
    isCurrentSystemPlan: true,
  })

  journey.phases.forEach((phase, phaseIndex) => {
    log.push({
      id: `${phase.id}-header`,
      journeyId: journey.id,
      type: "phase-header",
      timestamp: new Date(now.getTime() + phaseIndex * 1000).toISOString(),
      phaseData: { id: phase.id, name: phase.name, description: phase.description },
      isCurrentSystemPlan: true,
    })
    phase.tasks.forEach((task, taskIndex) => {
      log.push({
        id: `${task.id}-def`,
        journeyId: journey.id,
        type: "task-definition",
        timestamp: new Date(now.getTime() + phaseIndex * 1000 + (taskIndex + 1) * 100).toISOString(),
        taskData: task,
        isCurrentSystemPlan: true,
      })
    })
  })
  return log
}

export const rawMockJourneys: Array<Omit<Journey, "log">> = [
  {
    id: "project-alpha",
    title: "Project Alpha Launch Approval",
    originalRequest: "Secure all necessary approvals to officially launch Project Alpha.",
    createdAt: "2024-05-15T10:00:00Z",
    mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VfQF9gTOGCEdT3SdvyGdLFkQOCTqio.png",
    tags: ["Product Launch", "High Priority", "Q3 Target"],
    phases: [
      {
        id: "phase-1-planning-pa",
        name: "PHASE 1: PLANNING",
        tasks: [
          {
            id: "task-pa-1",
            name: "Define detailed scope for Project Alpha",
            completed: true,
            assignedAgentId: "journey-master", // Example assignment
          },
          {
            id: "task-pa-2",
            name: "Finalize Project Alpha Approvals",
            completed: false,
            isMultiDecision: true,
            requiresResolution: true,
            actionLabel: "Resolve Decisions",
            decisions: [
              { id: "decision-pa-1", text: "Approve project budget of $50,000", isQuickApprove: true, approved: false },
              { id: "decision-pa-2", text: "Confirm launch timeline for end of Q3", approved: false },
              { id: "decision-pa-3", text: "Allocate 3 senior engineers to the project", approved: false },
              { id: "decision-pa-4", text: "Approve initial marketing campaign draft", approved: false },
            ],
          },
        ],
      },
      {
        id: "phase-2-execution-pa",
        name: "PHASE 2: EXECUTION",
        tasks: [
          {
            id: "task-pa-3",
            name: "Kick-off Project Alpha development",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "tech-book-shopping",
    title: "Tech Book Shopping List",
    originalRequest:
      "I need to buy 'Designing Data-Intensive Applications' and 'Clean Architecture'. Find best prices.",
    createdAt: "2024-06-02T10:00:00Z",
    mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iK3C52mymKxKHdC1T91rYQ6tUEVxr1.png",
    tags: ["Shopping", "Books", "Tech"],
    phases: [
      {
        id: "phase-book-list",
        name: "BOOK LIST",
        tasks: [
          {
            id: "task-book-1",
            name: "List 'Designing Data-Intensive Applications'",
            completed: false,
          },
          {
            id: "task-book-2",
            name: "List 'Clean Architecture'",
            completed: false,
          },
        ],
      },
      {
        id: "phase-purchase-process",
        name: "PURCHASE PROCESS",
        tasks: [
          {
            id: "task-price-research-ddia",
            name: "Research best price for 'Designing Data-Intensive Applications'",
            completed: false,
            taskType: "Research",
            assignedAgentId: "general-chat", // Example assignment
          },
          {
            id: "task-choose-store",
            name: "Choose online store for book purchase",
            completed: false,
            taskType: "Select Store",
            actionLabel: "Decide",
            requiresResolution: true,
          },
          {
            id: "task-add-to-cart",
            name: "Add books to cart and proceed to checkout",
            completed: false,
            taskType: "Generic Confirmation",
            requiresResolution: true,
            actionButtons: [
              { label: "No", variant: "outline", actionId: "checkout-no" },
              { label: "Yes", variant: "default", actionId: "checkout-yes" },
            ],
          },
        ],
      },
    ],
  },
]

export const mockJourneys: Journey[] = rawMockJourneys.map((j) => ({
  ...j,
  log: generateInitialLog(j),
}))

export const sidebarNavItems = [
  {
    id: "new-journey",
    title: "New Journey",
    href: "/chat?agentId=journey-master&initialInput=new%20journey%3A%20",
    icon: PlusCircle,
  },
  { id: "search", title: "Search Journeys", icon: SearchIconLucide, action: "openSearchModal" },
  { id: "explore", title: "Explore Agents", href: "/explore", icon: Compass },
]

// JourneyLogIcons and DEFAULT_AGENT_ID are imported from @/constants
// mockAgents and its related data (journeyMasterReviews, journeyMasterShowcase) are now in features/agents/mock-agents.ts
