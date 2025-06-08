import { usePathname } from "next/navigation";
import { useHeader } from "@/contexts/header-context";
import type { Agent } from "@/interfaces";

export function usePageTitle(agentsData: Agent[]) {
  const pathname = usePathname();
  const { overrideTitle } = useHeader();

  const getPageTitle = () => {
    if (pathname === "/explore/top-free") return "Top Free Agents";
    if (pathname === "/explore/top-paid") return "Top Paid Agents";
    if (pathname === "/") return "AI Assistant";
    if (pathname === "/cart") return "Shopping Cart";
    if (pathname === "/settings") return "Settings";
    return "AI Journey Assistant";
  };

  const isAgentDetailPage =
    pathname.startsWith("/explore/") && pathname.split("/").length === 3;

  let agentForTitle: Agent | undefined;
  if (isAgentDetailPage) {
    const agentId = pathname.split("/")[2];
    agentForTitle = agentsData.find((a) => a.id === agentId);
  }

  return {
    overrideTitle,
    basePageTitle: getPageTitle(),
    isAgentDetailPage,
    agentForTitle,
  };
}
