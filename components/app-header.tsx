"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  LogOut,
  UserCircle,
  Search,
  ChevronDown,
  ArrowLeft,
  BarChartBig,
  HardDrive,
  CreditCardIcon,
  MessageSquare,
  Key,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { sidebarNavItems } from "@/lib/data";
import { fetchAllAgents } from "@/features/agents/api";
import type { Agent } from "@/interfaces";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useHeader } from "@/contexts/header-context";
import { DEFAULT_AGENT_ID } from "@/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "e" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/explore");
      }
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        const newJourneyNavItem = sidebarNavItems.find(
          (item) => item.id === "new-journey"
        );
        if (newJourneyNavItem && newJourneyNavItem.href) {
          router.push(newJourneyNavItem.href);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);

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

  const handleAgentSelect = (selectedAgentId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (pathname.startsWith("/chat")) {
      params.set("agentId", selectedAgentId);
      params.delete("activeAgentForJourneyChat");
    } else if (pathname.startsWith("/journeys/")) {
      params.set("activeAgentForJourneyChat", selectedAgentId);
      params.delete("agentId");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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

  const renderSettingsTabs = () => {
    const activeTab = searchParams.get("tab") || "account-overview";

    const handleTabChange = (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
      <div className="w-full overflow-x-auto pb-2">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="flex h-10 w-full overflow-x-auto space-x-1 sm:space-x-2">
            <TabsTrigger value="account-overview" className="flex-shrink-0">
              <UserCircle className="mr-2 h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="interaction-stats" className="flex-shrink-0">
              <MessageSquare className="mr-2 h-4 w-4" /> Interaction Stats
            </TabsTrigger>
            <TabsTrigger value="usage-details" className="flex-shrink-0">
              <BarChartBig className="mr-2 h-4 w-4" /> Usage Details
            </TabsTrigger>
            <TabsTrigger value="storage-management" className="flex-shrink-0">
              <HardDrive className="mr-2 h-4 w-4" /> Storage
            </TabsTrigger>
            <TabsTrigger value="billing-history" className="flex-shrink-0">
              <CreditCardIcon className="mr-2 h-4 w-4" /> Billing and Usage
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
  };

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
      return renderSettingsTabs();
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="group flex items-center gap-1.5 md:gap-2 px-2 md:px-3 h-auto py-1.5 text-lg font-semibold focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
              disabled={
                availableAgentsToSwitch.length === 0 && !finalAgentForDisplay
              }
            >
              <span className="truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]">
                {finalAgentForDisplay?.name ||
                  (agentsData.length > 0
                    ? "Select Agent"
                    : "Loading Agents...")}
              </span>
              {availableAgentsToSwitch.length > 0 && (
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
              )}
            </Button>
          </DropdownMenuTrigger>
          {availableAgentsToSwitch.length > 0 && (
            <DropdownMenuContent align="start" className="w-64 sm:w-72">
              {availableAgentsToSwitch.map((agent) => (
                <DropdownMenuItem
                  key={agent.id}
                  onClick={() => handleAgentSelect(agent.id)}
                  className="cursor-pointer pl-3 pr-2 py-1.5"
                >
                  <span className="flex-grow truncate text-sm">
                    {agent.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
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

  return (
    <header
      className={cn(
        "sticky top-0 flex h-16 items-center gap-1 sm:gap-2 border-b bg-background px-2 sm:px-4 md:px-6 py-4 dark:border-neutral-800",
        pathname === "/explore" && !isAgentDetailPage ? "z-40" : "z-10",
        pathname === "/settings" ? "flex-col h-auto pb-0" : ""
      )}
    >
      <div
        className={cn(
          "flex w-full items-center gap-1 sm:gap-2",
          pathname === "/settings" ? "mb-2" : ""
        )}
      >
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
        </div>

        <div
          className={cn(
            "flex-1 min-w-0 flex justify-center items-center",
            (pathname === "/explore" && !isAgentDetailPage) ||
              isAgentDetailPage ||
              overrideTitle ||
              (!isMobile && sidebarDesktopState === "expanded") ||
              isMobile ||
              pathname === "/settings"
              ? "sm:justify-start"
              : "sm:justify-center"
          )}
        >
          {pathname === "/settings" ? (
            <h1
              className="text-lg font-semibold p-1 h-auto truncate"
              title="Settings"
            >
              Settings
            </h1>
          ) : (
            renderCenterContent()
          )}
          {pageControls && <div className="ml-auto">{pageControls}</div>}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://discord.gg/your-discord-invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Community
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <ThemeToggle />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:!text-red-500 hover:!bg-red-500/10 cursor-pointer">
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {pathname === "/settings" && renderSettingsTabs()}
    </header>
  );
}
