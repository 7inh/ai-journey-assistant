"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserMenu } from "@/components/header/user-menu";
import { useGlobalShortcuts } from "@/hooks/use-global-shortcuts";
import { HeaderTitle } from "@/components/header/header-title";
import { useHeader } from "@/contexts/header-context";

export default function AppHeader() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { state: sidebarDesktopState, isMobile } = useSidebar();
  const { pageControls } = useHeader();
  const router = useRouter();

  useGlobalShortcuts();

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const isAgentDetailPage =
    pathname.startsWith("/explore/") && pathname.split("/").length === 3;
  const isExplorePage = pathname === "/explore" && !isAgentDetailPage;

  return (
    <header
      className={cn(
        "sticky top-0 flex border-b items-center gap-1 sm:gap-2 bg-background/95 backdrop-blur-sm px-2 sm:px-4 md:px-6 dark:border-neutral-800",
        isExplorePage ? "z-40" : "z-10",
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
            isExplorePage ||
              isAgentDetailPage ||
              (!isMobile && sidebarDesktopState === "expanded") ||
              isMobile
              ? "sm:justify-start"
              : isSettingsPage
              ? "justify-center"
              : "sm:justify-center"
          )}
        >
          <HeaderTitle />
          {pageControls && <div className="ml-auto">{pageControls}</div>}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          <UserMenu isCompact={isSettingsPage} />
        </div>
      </div>
    </header>
  );
}
