import { mockAgents } from "@/features/agents/mock-agents";
import AgentDetailPageClient from "@/features/agents/AgentDetailPageClient";
import { Suspense } from "react";
import AgentDetailLoading from "@/app/explore/[agentId]/loading";

export function generateStaticParams() {
  return mockAgents.map((agent) => ({
    agentId: agent.id,
  }));
}

const Page = async ({ params }: { params: Promise<{ agentId: string }> }) => {
  const agentId = await params.then((p) => p.agentId);

  return (
    <AgentDetailPageClient
      params={{
        agentId,
      }}
    />
  );
};

export default Page;
