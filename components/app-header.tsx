"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_AGENT_ID } from "@/constants";
import { useHeader } from "@/contexts/header-context";
import { fetchAllAgents } from "@/features/agents/api";
import type { Agent } from "@/interfaces";
import { sidebarNavItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AgentSelector } from "@/components/header/agent-selector";
import { SettingsTabs } from "@/components/header/settings-tabs";
import { UserMenu } from "@/components/header/user-menu";
import { useGlobalShortcuts } from "@/hooks/use-global-shortcuts";

export default function AppHeader() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { state: sidebarDesktopState, isMobile } = useSidebar();
  const { toast } = useToast();
  const { overrideTitle, pageControls } = useHeader();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [agentsData, setAgentsData] = useState<Agent[]>([]);
  const [exploreSearchTerm, setExploreSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  useGlobalShortcuts();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadAgents() {
      try {
        const agents = await fetchAllAgents();
        setAgentsData(agents.map((agent) => ({ ...agent })));
      } catch (error) {
        console.error("Failed to fetch agents for header:", error);
        toast({
          title: "Error",
          description: "Could not load agent data for header.",
          variant: "destructive",
        });
      }
    }
    loadAgents();
  }, [toast]);

  useEffect(() => {
    if (pathname === "/explore") {
      const q = searchParams.get("q") || "";
      if (q !== exploreSearchTerm) {
        setExploreSearchTerm(q);
      }
    }
  }, [searchParams, pathname, exploreSearchTerm]);

  const handleUpdateAgent = (agentId: string) => {
    setAgentsData((prevAgents) =>
      prevAgents.map((agent) => {
        if (agent.id === agentId && agent.version < agent.latestVersion) {
          toast({
            title: `${agent.name} Updated`,
            description: (
              <div>
                <p>Successfully updated to v{agent.latestVersion}.</p>
                {agent.releaseNotes && (
                  <p className="text-xs mt-1">Changes: {agent.releaseNotes}</p>
                )}
              </div>
            ),
          });
          return { ...agent, version: agent.latestVersion };
        }
        return agent;
      })
    );
  };

  const installedAgents = agentsData.filter((agent) => agent.isInstalled);

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

  const renderCenterContent = () => {
    if (overrideTitle) {
      return (
        <h1
          className="text-lg font-semibold truncate px-1 sm:px-2"
          title={overrideTitle}
        >
          {overrideTitle}
        </h1>
      );
    }

    // If we're on the settings page, render the settings tabs
    if (pathname === "/settings") {
      return <SettingsTabs />;
    }

    const isChatPage = pathname.startsWith("/chat");
    if (isChatPage) {
      let currentActiveAgentId: string | null = searchParams.get("agentId");
      const agentForDisplay = agentsData.find(
        (agent) => agent.id === currentActiveAgentId
      );

      if (
        !currentActiveAgentId ||
        (currentActiveAgentId &&
          !installedAgents.find((agent) => agent.id === currentActiveAgentId))
      ) {
        const defaultJourneyMaster = installedAgents.find(
          (agent) => agent.id === DEFAULT_AGENT_ID
        );
        const firstInstalledAgent =
          installedAgents.length > 0 ? installedAgents[0] : undefined;

        if (defaultJourneyMaster) {
          currentActiveAgentId = defaultJourneyMaster.id;
        } else if (firstInstalledAgent) {
          currentActiveAgentId = firstInstalledAgent.id;
        } else {
          currentActiveAgentId = null;
        }
        if (
          currentActiveAgentId &&
          currentActiveAgentId !== searchParams.get("agentId")
        ) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("agentId", currentActiveAgentId);
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
      }

      const finalAgentForDisplay = agentsData.find(
        (agent) => agent.id === currentActiveAgentId
      );
      const availableAgentsToSwitch = installedAgents.filter(
        (agent) => agent.id !== currentActiveAgentId
      );

      return (
        <AgentSelector
          currentAgentId={currentActiveAgentId}
          finalAgentForDisplay={finalAgentForDisplay}
          availableAgentsToSwitch={availableAgentsToSwitch}
          isLoading={agentsData.length === 0}
        />
      );
    }

    if (isAgentDetailPage && agentForTitle) {
      return (
        <h1
          className="text-lg font-semibold truncate px-1 sm:px-2"
          title={agentForTitle.name}
        >
          {agentForTitle.name}
        </h1>
      );
    }

    if (pathname === "/explore" && !isAgentDetailPage) {
      return (
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agents..."
            className="w-full pl-9 pr-4 h-10 rounded-md text-sm bg-muted/50 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
            value={exploreSearchTerm}
            onChange={(e) => {
              const newSearchTerm = e.target.value;
              setExploreSearchTerm(newSearchTerm);
              const params = new URLSearchParams(searchParams.toString());
              if (newSearchTerm) {
                params.set("q", newSearchTerm);
              } else {
                params.delete("q");
              }
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            aria-label="Search agents"
          />
        </div>
      );
    }
    return (
      <h1
        className="text-lg font-semibold p-1 h-auto truncate"
        title={getPageTitle()}
      >
        {getPageTitle()}
      </h1>
    );
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 dark:border-neutral-800">
        <div className="h-6 w-6 animate-pulse rounded-md bg-muted md:hidden" />
        <div className="flex-1 h-6 animate-pulse rounded-md bg-muted" />
        <div className="flex items-center gap-2 md:gap-4">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
      </header>
    );
  }

  const isSettingsPage = pathname === "/settings";

  return (
    <header
      className={cn(
        "sticky top-0 flex border-b items-center gap-1 sm:gap-2 bg-background px-2 sm:px-4 md:px-6 dark:border-neutral-800",
        pathname === "/explore" && !isAgentDetailPage ? "z-40" : "z-10",
        isSettingsPage ? "h-12 py-0" : "h-16 py-4"
      )}
    >
      <div className="flex w-full items-center gap-1 sm:gap-2">
        <div className="flex items-center gap-1 flex-shrink-0">
          <SidebarTrigger className="md:hidden flex-shrink-0" />
          {!isMobile && sidebarDesktopState === "collapsed" && (
            <SidebarTrigger
              className="flex-shrink-0"
              aria-label="Open sidebar"
            />
          )}
          {isAgentDetailPage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full h-9 w-9 flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          {/* Show title for settings page here */}
          {isSettingsPage && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="rounded-full h-8 w-8 flex-shrink-0 mr-1"
                aria-label="Back to main page"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1
                className="text-lg font-semibold p-1 h-auto truncate translate-y-0.5"
                title="Settings"
              >
                Settings
              </h1>
            </>
          )}
        </div>

        <div
          className={cn(
            "min-w-0 flex-1 flex justify-center items-center",
            (pathname === "/explore" && !isAgentDetailPage) ||
              isAgentDetailPage ||
              overrideTitle ||
              (!isMobile && sidebarDesktopState === "expanded") ||
              isMobile
              ? "sm:justify-start"
              : isSettingsPage
              ? "justify-center"
              : "sm:justify-center"
          )}
        >
          {renderCenterContent()}
          {pageControls && <div className="ml-auto">{pageControls}</div>}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          <UserMenu isCompact={isSettingsPage} />
        </div>
      </div>
    </header>
  );
}
