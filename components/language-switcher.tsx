"use client";

import { useLanguage } from "@/hooks/use-language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher({ showLabel }: { showLabel?: boolean }) {
  const { locale, toggleLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 ${
            showLabel ? "px-3" : "w-8 px-0"
          } bg-muted/50 hover:bg-muted`}
        >
          {showLabel && <span className="mr-2">{t("currentLanguage")}</span>}
          {!showLabel && (
            <span className="mr-1">{locale === "en" ? "🇺🇸" : "🇻🇳"}</span>
          )}
          <span className="sr-only">{t("currentLanguage")}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => toggleLanguage("en-US")}
          className={locale === "en" ? "bg-accent" : ""}
        >
          <span className="mr-2">🇺🇸</span> {t("common.english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLanguage("vi-VN")}
          className={locale === "vi" ? "bg-accent" : ""}
        >
          <span className="mr-2">🇻🇳</span> {t("common.vietnamese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
