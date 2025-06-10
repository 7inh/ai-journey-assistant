"use client";

import { useContext } from "react";
import { useTypedTranslation } from "./use-typed-translation";
import { TranslationPath } from "@/i18n/translation-types";

export function useLanguage() {
  const { t, i18n } = useTypedTranslation();

  const currentLanguage = i18n.language;

  const toggleLanguage = (lang: string) => {
    // Check if the language is already set
    if (currentLanguage === lang) return;
    // Set the new language
    i18n.changeLanguage(lang).catch((error) => {
      console.error("Error changing language:", error);
    });
  };

  // Return the enhanced context with our typed translation function
  return {
    locale: currentLanguage.startsWith("vi") ? "vi" : "en",
    toggleLanguage,
    t: (key: TranslationPath, options?: Record<TranslationPath, any>) =>
      t(key, options),
  };
}
