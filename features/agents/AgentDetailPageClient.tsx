"use client";

import { notFound } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Agent } from "@/interfaces";
import {
  fetchAgentDetails,
  fetchRelatedAgents,
  installAgent,
  submitAgentReview,
} from "@/features/agents/api";

import AgentHeader from "@/components/agent-detail/agent-header";
import AgentAboutSection from "@/components/agent-detail/agent-about-section";
import AgentShowcaseSection from "@/components/agent-detail/agent-showcase-section";
import AgentReviewsSection from "@/components/agent-detail/agent-reviews-section";
import AgentInformationSidebar from "@/components/agent-detail/agent-information-sidebar";
import AgentRelatedSidebar from "@/components/agent-detail/agent-related-sidebar";
import AgentDetailLoading from "@/app/explore/[agentId]/loading";

export default function AgentDetailPageClient({
  params,
}: {
  params: { agentId: string };
}) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([]);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);
  const [isInstallPending, startInstallTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setIsFetchingInitialData(true);
      try {
        const agentDetails = await fetchAgentDetails(params.agentId);
        console.log("Fetched agent details:", agentDetails, params.agentId);
        if (agentDetails) {
          setAgent(agentDetails);
          setIsInstalled(agentDetails.isInstalled || false);
          const related = await fetchRelatedAgents(agentDetails);
          setRelatedAgents(related);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch agent details:", error);
        toast({
          title: "Error",
          description: "Could not load agent details.",
          variant: "destructive",
        });
      } finally {
        setIsFetchingInitialData(false);
      }
    }
    fetchData();
  }, [params.agentId, toast]);

  const handleInstallToggle = async () => {
    if (!agent || agent.isInstalled || agent.billingType === "contact-sales") {
      // If already installed, or contact-sales, or no agent, do nothing or show a message.
      // For "contact-sales", the button in AgentHeader should be disabled or link out.
      if (agent?.isInstalled) {
        toast({
          title: "Already Active",
          description: `${agent.name} is already active.`,
        });
      }
      return;
    }

    // For 'free' or 'pay-as-you-go' agents, "install" means activate.
    startInstallTransition(async () => {
      const success = await installAgent(agent.id); // installAgent marks it as available for use
      if (success) {
        setIsInstalled(true);
        setAgent((prev) => (prev ? { ...prev, isInstalled: true } : null));
        toast({
          title: "Agent Activated",
          description: `${agent.name} has been successfully activated.`,
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to activate ${agent.name}.`,
          variant: "destructive",
        });
      }
    });
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!agent) return;
    // The ReviewForm component itself handles its own isSubmitting state for the button.
    // This function is primarily for updating the agent data after submission.
    const updatedAgentData = await submitAgentReview(agent.id, rating, comment);
    if (updatedAgentData) {
      setAgent(updatedAgentData);
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to submit review.",
        variant: "destructive",
      });
    }
  };

  // If we're still loading initial data, return the skeleton directly
  if (isFetchingInitialData) {
    return <AgentDetailLoading />;
  }

  // If agent is null but we're not loading, it means we couldn't find the agent
  if (!agent && !isFetchingInitialData) {
    notFound();
  }

  return agent ? (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-6 sm:py-8 px-4 md:px-6">
        <AgentHeader
          agent={agent}
          isInstalled={isInstalled}
          onInstallToggle={handleInstallToggle}
          isInstallPending={isInstallPending} // Pass pending state
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12 gap-y-8 mt-8 md:mt-12">
          <main className="lg:col-span-2 space-y-8 md:space-y-10">
            {agent && (
              <AgentAboutSection
                description={agent.longDescription || agent.description}
              />
            )}
            {agent?.showcaseItems && agent.showcaseItems.length > 0 && (
              <AgentShowcaseSection items={agent.showcaseItems} />
            )}
            {agent && (
              <AgentReviewsSection
                agent={agent}
                onSubmitReview={handleReviewSubmit}
              />
            )}
          </main>

          <aside className="space-y-6 md:space-y-8 lg:pt-1">
            {agent && <AgentInformationSidebar agent={agent} />}
            {relatedAgents.length > 0 && (
              <AgentRelatedSidebar relatedAgents={relatedAgents} />
            )}
          </aside>
        </div>
      </div>
    </div>
  ) : null;
}
