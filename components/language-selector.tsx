"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  minimal?: boolean;
}

export function LanguageSelector({ minimal = false }: LanguageSelectorProps) {
  const { locale, toggleLanguage, t } = useLanguage();

  if (minimal) {
    return (
      <div className="flex gap-2">
        <Button
          variant={locale === "en" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleLanguage("en-US")}
          className="h-8 px-2"
        >
          {t("common.english")}
        </Button>
        <Button
          variant={locale === "vi" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleLanguage("vi-VN")}
          className="h-8 px-2"
        >
          {t("common.vietnamese")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <span>{t("common.language")}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={locale === "en" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleLanguage("en-US")}
          className="h-8 px-2"
        >
          {t("common.english")}
        </Button>
        <Button
          variant={locale === "vi" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleLanguage("vi-VN")}
          className="h-8 px-2"
        >
          {t("common.vietnamese")}
        </Button>
      </div>
    </div>
  );
}
