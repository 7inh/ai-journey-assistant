export interface Decision {
  id: string;
  text: string;
  isQuickApprove?: boolean;
  approved?: boolean;
}

export interface ResourceLink {
  title: string;
  url: string;
  type?: "document" | "video" | "external";
}

export interface TaskData {
  id: string;
  name: string;
  completed: boolean;
  description?: string;
  taskType?: string;
  isMultiDecision?: boolean;
  decisions?: Decision[];
  requiresResolution?: boolean;
  actionLabel?: string;
  actionButtons?: Array<{
    label: string;
    variant:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    actionId: string;
  }>;
  assignedAgentId?: string;
}

export interface PhaseData {
  id: string;
  name: string;
  description?: string;
}

export type JourneyLogItemType =
  | "journey-start"
  | "phase-header"
  | "task-definition"
  | "user-request"
  | "ai-response"
  | "system-message";

export interface JourneyLogItem {
  id: string;
  journeyId: string;
  type: JourneyLogItemType;
  timestamp: string;
  isOutdated?: boolean;
  isCurrentSystemPlan?: boolean;
  text?: string;
  journeyTitle?: string;
  originalRequestText?: string;
  phaseData?: PhaseData;
  taskData?: TaskData;
  tasksForPhase?: TaskData[];
  supersedesItemId?: string;
  relatedTaskId?: string;
}

export interface Journey {
  id: string;
  title: string;
  originalRequest?: string;
  phases: Array<{
    id: string;
    name: string;
    description?: string;
    tasks: TaskData[];
  }>;
  createdAt: string;
  images?: string[];
  mainImage?: string;
  tags?: string[];
  resources?: ResourceLink[];
  log?: JourneyLogItem[];
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  createdAt?: Date;
  name?: string;
}

export interface TaskRequestMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  isOutdated?: boolean;
  isCurrent?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatarUrl?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}

export interface ShowcaseItem {
  id: string;
  type: "image" | "video" | "text-demo";
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  demoPrompt?: string;
  demoResponse?: string;
}

export interface UsagePricingTier {
  tierName?: string; // e.g., "Basic", "Pro", "Tokens", "Compute Units"
  unit: string; // e.g., "per 1k tokens", "per API call", "per minute"
  rate: number; // e.g., 0.02
  currency: string; // e.g., "USD"
  description?: string; // e.g., "Input tokens for GPT-4o"
  freeQuota?: number; // e.g., 1000 (units) per month
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  bannerSlogan?: string;
  avatarUrl?: string;
  bannerImageUrl?: string;
  lastUsed?: string;
  systemPrompt?: string;
  tags?: string[];
  isInstalled?: boolean; // "Installed" now means activated/available for use
  version: string;
  latestVersion: string;
  releaseNotes?: string;
  category?: string;
  developerName?: string;
  lastUpdatedDate?: string;
  averageRating?: number;
  ratingCount?: number;
  reviews?: Review[];
  showcaseItems?: ShowcaseItem[];
  relatedAgentIds?: string[];
  // isPremium?: boolean; // Replaced by billingType and usagePricingTiers

  billingType: "pay-as-you-go" | "free" | "contact-sales" | "subscription";
  usagePricingTiers?: UsagePricingTier[];

  // Old pricing fields (to be removed or adapted)
  // price?: string; // e.g., "Free", "$9.99", "Get"
  // priceSubtitle?: string; // e.g., "In-App Purchases", "per month"
  // subscriptionFee?: string; // e.g., "$4.99/month"
  // billingCycle?: "monthly" | "yearly" | "one-time";
  creationDate?: string; // Added for sorting new agents
  weeklyTrendingScore?: number;
  isPremium?: boolean;
}
