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
import { LanguageSwitcher } from "@/components/language-switcher";
import { HeaderSkeleton } from "@/components/header/header-skeleton";

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

  const isSettingsPage = pathname === "/settings";
  const isAgentDetailPage =
    pathname.startsWith("/explore/") && pathname.split("/").length === 3;
  const isExplorePage = pathname === "/explore" && !isAgentDetailPage;

  if (!mounted) {
    return (
      <HeaderSkeleton
        isSettingsPage={isSettingsPage}
        isExplorePage={isExplorePage}
      />
    );
  }

  return (
    <header className={cn("sticky top-0", isExplorePage ? "z-40" : "z-10")}>
      <div
        className={cn(
          "relative",
          "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-6 dark:border-neutral-800",
          isSettingsPage ? "h-12 py-0" : "h-16 py-3" // Reduced padding from py-4 to py-3 to accommodate larger avatar
        )}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/40 dark:bg-background/70 dark:border-border/30"></div>

        <div className="flex w-full items-center gap-1 sm:gap-2 relative">
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
      </div>
    </header>
  );
}
