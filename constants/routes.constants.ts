/**
 * Application route constants
 *
 * This file defines all routes used in the application to provide a central
 * place for route management and prevent hardcoded paths.
 */

/**
 * Base routes without parameters
 */
export const ROUTES = {
  HOME: "/",
  JOURNEYS: "/journeys",
  CHAT: "/chat",
  EXPLORE: "/explore",
  SETTINGS: "/settings",
  CREATE: "/create",
} as const;

/**
 * API routes
 */
export const API_ROUTES = {
  CHAT: "/api/chat",
} as const;

/**
 * Helper functions to generate parameterized routes
 */

/**
 * Generate a route to a specific journey
 */
export function getJourneyRoute(journeyId: string): string {
  return `${ROUTES.JOURNEYS}/${journeyId}`;
}

/**
 * Generate a route to chat with a specific agent
 */
export function getChatRoute(agentId?: string): string {
  return agentId ? `${ROUTES.CHAT}?agentId=${agentId}` : ROUTES.CHAT;
}

/**
 * Generate a route to explore a specific agent
 */
export function getAgentExploreRoute(agentId: string): string {
  return `${ROUTES.EXPLORE}/${agentId}`;
}

/**
 * Generate a route to create a journey with an initial query
 */
export function getCreateJourneyRoute(query?: string): string {
  return query
    ? `${ROUTES.CREATE}?query=${encodeURIComponent(query)}`
    : ROUTES.CREATE;
}
