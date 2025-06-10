import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ExploreAgentCardMobile from "@/components/explore-agent-card-mobile";
import type { Agent } from "@/interfaces";
import { useEffect, useState } from "react";

interface ExploreRecommendedSectionProps {
  agents: Agent[];
  onInstall: (agentId: string) => Promise<void>;
  isInstallPending: boolean;
  installingAgentId: string | null;
}

export function ExploreRecommendedSection({
  agents,
  onInstall,
  isInstallPending,
  installingAgentId,
}: ExploreRecommendedSectionProps) {
  if (agents.length === 0) return null;

  const [itemsPerView, setItemsPerView] = useState(1);

  // Update items per view based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        // 2xl
        setItemsPerView(4);
      } else if (width >= 1280) {
        // xl
        setItemsPerView(3);
      } else if (width >= 768) {
        // md
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  return (
    <>
      <Separator className="my-10" />
      <div>
        <div>
          <Carousel
            className="w-full h-full"
            opts={{
              align: "start",
              loop: agents.length > itemsPerView,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Recommended For You</h2>
              <div className="flex justify-end gap-2">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
            </div>
            <CarouselContent className="-ml-4 h-full">
              {agents.map((agent) => (
                <CarouselItem
                  key={agent.id}
                  className="pl-4"
                  style={{ flex: `0 0 calc(100% / ${itemsPerView})` }}
                >
                  <ExploreAgentCardMobile
                    agent={agent}
                    onInstall={onInstall}
                    isInstallPending={
                      isInstallPending && installingAgentId === agent.id
                    }
                    portrait={true}
                    className="mx-auto h-full"
                    minWidth="280px"
                    maxHeight="480px"
                    featuredText={
                      agent.description?.substring(0, 60) || "FEATURED AGENT"
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <br />
    </>
  );
}
