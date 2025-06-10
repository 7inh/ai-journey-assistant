import {
  MessageSquareText,
  BookOpen,
  ListChecks,
  User,
  Sparkles,
  Info,
  AlertTriangle,
  LinkIcon as LinkIconLucide,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export const JourneyLogIcons: Record<string, LucideIcon> = {
  "journey-start": MessageSquareText,
  "phase-header": BookOpen,
  "task-definition": ListChecks,
  "user-request": User,
  "ai-response": Sparkles,
  "system-message": Info,
  Decision: AlertTriangle,
  OriginalRequest: LinkIconLucide,
  Phase: BookOpen,
  Task: ShoppingCart,
};

export const DEFAULT_AGENT_ID = "journey-master";

// Add other enums or constants here as your project grows.
// For example:
// export enum UserRoles {
//   ADMIN = "admin",
//   EDITOR = "editor",
//   VIEWER = "viewer",
// }

// export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
