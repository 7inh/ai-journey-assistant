import { usePathname, useSearchParams } from "next/navigation";
import { useHeader } from "@/contexts/header-context";
import type { Agent } from "@/interfaces";

export function usePageTitle(agentsData: Agent[]) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { overrideTitle } = useHeader();

  const getPageTitle = () => {
    // Check for search query in explore page
    if (pathname === "/explore" && searchParams.get("q")) {
      return `Search: ${searchParams.get("q")}`;
    }

    if (pathname === "/explore/top-free") return "Top Free Agents";
    if (pathname === "/explore/top-paid") return "Top Paid Agents";
    if (pathname === "/") return "AI Assistant";
    if (pathname === "/cart") return "Shopping Cart";
    if (pathname === "/settings") return "Settings";
    if (pathname === "/explore") return "Explore Agents";
    if (pathname === "/pricing") return "Pricing";
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
