"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import {
  Bolt,
  ExternalLink,
  Filter,
  LogIn,
  LogOut,
  Rocket,
  Settings,
  User,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface UserMenuProps {
  isCompact?: boolean;
}

export function UserMenu({ isCompact = false }: UserMenuProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", isCompact ? "h-8 w-8" : "h-10 w-10")}
        >
          <Avatar className={cn(isCompact ? "h-8 w-8" : "h-10 w-10")}>
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt={t("common.userAvatar")}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-2 w-80 bg-background/80 backdrop-blur-xl border border-border/30 shadow-lg rounded-md"
        sideOffset={8}
      >
        <DropdownMenuItem className="py-3 focus:bg-foreground/10 rounded-lg mx-1 mt-1">
          <Avatar className={cn(isCompact ? "h-7 w-7" : "h-9 w-9")}>
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt={t("common.userAvatar")}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="ml-2 flex flex-col">
            <p className="text-sm font-medium">{t("common.myAccount")}</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="opacity-50" />
        <DropdownMenuItem
          asChild
          className="flex-col items-start focus:bg-foreground/10 rounded-lg mx-1"
        >
          <Link href="/pricing">
            <div className="flex items-center gap-1">
              <Rocket className="mr-1 h-[18px] w-[18px]" />
              <span className="font-medium leading-none">
                {t("userMenu.upgrade")}
              </span>
            </div>
            <p className="text-muted-foreground">{t("userMenu.freeVersion")}</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="opacity-50" />
        <div className="px-1">
          <DropdownMenuItem
            asChild
            className="rounded-lg focus:bg-foreground/10"
          >
            <Link href="/profile" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" /> {t("userMenu.profile")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="rounded-lg focus:bg-foreground/10"
          >
            <Link href="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> {t("userMenu.settings")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg focus:bg-foreground/10">
            <User className="mr-1" /> {t("userMenu.invitePeople")}
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="opacity-50" />
        <div className="px-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded-lg focus:bg-foreground/10">
              <Filter className="mr-1" />
              {t("userMenu.filterSidebar")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="bg-background border border-border/30 shadow-lg rounded-md z-50"
              sideOffset={2}
              alignOffset={-5}
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="focus:bg-foreground/10 rounded-lg mx-1">
                  {t("userMenu.activity")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  className="bg-background border border-border/30 shadow-lg rounded-md z-50"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <div className="px-1">
                    <DropdownMenuCheckboxItem
                      checked
                      className="rounded-lg focus:bg-foreground/10"
                    >
                      {t("userMenu.allActivity")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="rounded-lg focus:bg-foreground/10">
                      {t("userMenu.unreadMessagesOnly")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="rounded-lg focus:bg-foreground/10">
                      {t("userMenu.mentionsOnly")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="rounded-lg focus:bg-foreground/10">
                      {t("userMenu.customizeBySection")}
                    </DropdownMenuCheckboxItem>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="focus:bg-foreground/10 rounded-lg mx-1">
                  {t("userMenu.people")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  className="bg-background border border-border/30 shadow-lg rounded-md z-50"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <div className="px-1">
                    <DropdownMenuCheckboxItem
                      checked
                      className="rounded-lg focus:bg-foreground/10"
                    >
                      {t("userMenu.everyone")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="rounded-lg focus:bg-foreground/10">
                      {t("userMenu.withoutExternalPeople")}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem className="rounded-lg focus:bg-foreground/10">
                      {t("userMenu.includingExternalPeople")}
                    </DropdownMenuCheckboxItem>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </div>
        <div className="px-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded-lg focus:bg-foreground/10">
              <Bolt className="mr-1" />
              {t("userMenu.toolsAndSettings")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-56 bg-background border border-border/30 shadow-lg rounded-md z-50"
              sideOffset={2}
              alignOffset={-5}
            >
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground ml-1">
                {t("userMenu.tools")}
              </DropdownMenuLabel>
              <div className="px-1">
                <DropdownMenuItem className="rounded-lg focus:bg-foreground/10">
                  {t("userMenu.customizeWorkspace")}
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg focus:bg-foreground/10">
                  {t("userMenu.workspaceBuilder")}
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg focus:bg-foreground/10">
                  {t("userMenu.workspaceAnalytics")}{" "}
                  <ExternalLink className="ml-auto h-3 w-3" />
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="opacity-50" />
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground ml-1">
                {t("userMenu.community")}
              </DropdownMenuLabel>
              <div className="px-1">
                <DropdownMenuItem
                  asChild
                  className="rounded-lg focus:bg-foreground/10"
                >
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
                    {t("userMenu.discordCommunity")}
                  </a>
                </DropdownMenuItem>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </div>
        <DropdownMenuSeparator className="opacity-50" />
        <div className="px-3 py-2 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            {t("common.language")}
            <LanguageSwitcher showLabel />
          </div>
          <ThemeToggle />
        </div>
        <DropdownMenuSeparator className="opacity-50" />
        <div className="px-1 mb-1">
          <DropdownMenuItem className="rounded-lg focus:bg-foreground/10">
            <LogIn className="mr-1" /> {t("userMenu.signInOnMobile")}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:!text-red-500 hover:!bg-red-500/10 rounded-lg focus:bg-red-500/10 cursor-pointer">
            <LogOut className="h-4 w-4" /> {t("userMenu.logOut")}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
