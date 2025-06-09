import type { Agent } from "@/interfaces";
import ExploreAgentCard from "@/components/explore-agent-card";
import ExploreAgentCardMobile from "@/components/explore-agent-card-mobile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

interface AgentSubSectionProps {
  title: string;
  agents: Agent[];
  onInstall: (agentId: string) => Promise<void>;
  installingAgentId: string | null;
  isInstallPending: boolean;
  className?: string;
  cardClassName?: string;
  scrollable?: boolean;
  displayCardType?: "regular" | "mobile" | "mixed"; // New prop
}

export default function AgentSubSection({
  title,
  agents,
  onInstall,
  installingAgentId,
  isInstallPending,
  className,
  cardClassName,
  scrollable = false,
  displayCardType = "mixed", // Default to mixed if not specified
}: AgentSubSectionProps) {
  if (!agents || agents.length === 0) {
    return null; // Or some placeholder if needed
  }

  // Generate a mapping of agent IDs to card types (regular or mobile)
  const [cardTypeMap, setCardTypeMap] = useState<
    Record<string, "regular" | "mobile">
  >({});

  useEffect(() => {
    // Create the mapping when agents change
    const newCardTypeMap: Record<string, "regular" | "mobile"> = {};
    agents.forEach((agent) => {
      if (displayCardType === "mixed") {
        // Only randomize if displayCardType is "mixed"
        newCardTypeMap[agent.id] = Math.random() > 0.5 ? "regular" : "mobile";
      } else {
        // Otherwise, use the specified displayCardType
        newCardTypeMap[agent.id] = displayCardType;
      }
    });
    setCardTypeMap(newCardTypeMap);
  }, [agents, displayCardType]);

  // Create a ref for each card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // State to store the maximum height
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  // Reset refs array when number of agents changes
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, agents.length);
  }, [agents.length]);

  // Measure heights and set the maximum after rendering
  useLayoutEffect(() => {
    if (cardRefs.current.length === 0) return;

    // Reset max height when agents change
    setMaxHeight(null);

    // Allow a short delay for cards to render their content
    const timeoutId = setTimeout(() => {
      const heights = cardRefs.current
        .filter(Boolean)
        .map((el) => el?.offsetHeight || 0);

      if (heights.length > 0) {
        const maxH = Math.max(...heights);
        if (maxH > 0) {
          setMaxHeight(maxH);
        }
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [agents, cardTypeMap]);

  const content = (
    <div
      className={cn(
        "flex", // Common base for both layouts
        scrollable
          ? "space-x-4 pb-4 px-1 xs:px-2 sm:px-0" // For horizontal scrolling, add padding inside the scroll area. Adjusted px for very small screens.
          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" // For grid layout
      )}
    >
      {agents.map((agent, index) => {
        const cardType = cardTypeMap[agent.id] || "regular";
        const isAgentInstallPending =
          isInstallPending && installingAgentId === agent.id;

        const cardStyle = maxHeight ? { height: `${maxHeight}px` } : {};

        if (cardType === "mobile") {
          return (
            <div
              key={agent.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={cardStyle}
              className="flex"
            >
              <ExploreAgentCardMobile
                agent={agent}
                onInstall={onInstall}
                className={cn(
                  scrollable
                    ? "w-[270px] xs:w-[280px] sm:w-[300px] flex-shrink-0"
                    : "",
                  "h-full", // Use h-full to fill parent container
                  cardClassName
                )}
                isInstallPending={isAgentInstallPending}
                featuredText={`FEATURED ${agent.category || "ASSISTANT"}`}
              />
            </div>
          );
        }

        return (
          <div
            key={agent.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={cardStyle}
            className="flex"
          >
            <ExploreAgentCard
              agent={agent}
              onInstall={onInstall}
              className={cn(
                scrollable
                  ? "w-[270px] xs:w-[280px] sm:w-[300px] flex-shrink-0"
                  : "",
                "h-full", // Use h-full to fill parent container
                cardClassName
              )}
              isInstallPending={isAgentInstallPending}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>
      {scrollable ? (
        <ScrollArea
          className={cn(
            "w-full whitespace-nowrap"
            // To achieve edge-to-edge feel for scroll area on mobile, if section is inside a padded container:
            // This requires knowing the container padding. Assuming default page padding is px-4 (1rem).
            // "-mx-4 sm:-mx-6 md:-mx-8" // Negative margins to counteract page padding
            // "px-4 sm:px-6 md:px-8" // Add padding back to scrollbar track if needed
            // For now, let's keep it simple and let it respect container padding.
          )}
        >
          {content}
          <ScrollBar orientation="horizontal" className="h-2.5" />
        </ScrollArea>
      ) : (
        content
      )}
    </section>
  );
}
