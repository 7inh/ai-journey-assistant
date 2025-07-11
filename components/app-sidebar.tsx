"use client";

import { SearchModal } from "@/components/search-modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES, getJourneyRoute } from "@/constants/routes.constants";
import { mockJourneys, sidebarNavItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Bot, PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useCallback, useEffect } from "react";

export default function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  // Keyboard shortcut for opening search modal (Cmd/Ctrl + K)
  const handleSearchModalKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setIsSearchModalOpen((prevOpen) => !prevOpen);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleSearchModalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleSearchModalKeyDown);
    };
  }, [handleSearchModalKeyDown]);

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  if (pathname === "/settings" || pathname === "/pricing") {
    return null;
  }

  return (
    <>
      <Sidebar className="bg-muted/40 dark:bg-muted/20" collapsible="offcanvas">
        <SidebarHeader className="p-2 flex flex-row items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-muted"
          >
            <Bot className="h-6 w-6 text-primary" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="group-data-[state=collapsed]:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <ScrollArea className="h-full">
            <SidebarGroup className="p-2">
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarNavItems.map((item) => {
                    let tooltipContent = item.title;
                    let shortcutDisplay: string | null = null;

                    if (item.action === "openSearchModal") {
                      tooltipContent = `${item.title} (⌘K)`;
                      shortcutDisplay = "⌘K";
                    } else if (item.id === "explore") {
                      tooltipContent = `${item.title} (⌘E)`;
                      shortcutDisplay = "⌘E";
                    } else if (item.id === "new-journey") {
                      tooltipContent = `${item.title} (⌘J)`;
                      shortcutDisplay = "⌘J";
                    }

                    return (
                      <SidebarMenuItem key={item.id}>
                        {item.action === "openSearchModal" ? (
                          <SidebarMenuButton
                            onClick={handleSearchClick}
                            tooltip={{
                              children: tooltipContent,
                              side: "right",
                              align: "center",
                            }}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="flex-grow">{item.title}</span>
                            {shortcutDisplay && (
                              <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover/menu-item:opacity-100 transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
                                {shortcutDisplay}
                              </span>
                            )}
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            isActive={
                              item.href
                                ? pathname === item.href ||
                                  (item.href !== "/" &&
                                    pathname.startsWith(item.href))
                                : false
                            }
                            tooltip={{
                              children: tooltipContent,
                              side: "right",
                              align: "center",
                            }}
                          >
                            <Link href={item.href || "#"}>
                              <item.icon className="h-4 w-4" />
                              <span className="flex-grow">{item.title}</span>
                              {shortcutDisplay && (
                                <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover/menu-item:opacity-100 transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
                                  {shortcutDisplay}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="my-2" />

            <SidebarGroup className="p-2">
              <SidebarGroupLabel className="px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2">
                <span className="group-data-[collapsible=icon]:hidden text-neutral-500">
                  My Journeys
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mockJourneys.map((journey) => (
                    <SidebarMenuItem key={journey.id}>
                      <SidebarMenuButton
                        asChild
                        size="default"
                        isActive={pathname === getJourneyRoute(journey.id)}
                        tooltip={{
                          children: journey.title,
                          side: "right",
                          align: "center",
                        }}
                      >
                        <Link href={getJourneyRoute(journey.id)}>
                          {pathname === getJourneyRoute(journey.id) && (
                            <Icon
                              icon="tabler:route"
                              className="mr-2 h-4 w-4"
                            />
                          )}
                          <span
                            className={cn("truncate", {
                              "max-w-[190px]":
                                pathname === getJourneyRoute(journey.id),
                              "max-w-[220px]":
                                pathname !== getJourneyRoute(journey.id),
                            })}
                          >
                            {journey.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SearchModal
        journeys={mockJourneys}
        open={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
      />
    </>
  );
}
