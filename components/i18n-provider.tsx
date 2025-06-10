"use client";

import i18n from "@/i18n/config";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Initialize i18n on the client side
    try {
      // Get the saved language from localStorage
      const savedLang = localStorage.getItem("i18nextLng");

      if (savedLang) {
        // Extract language code without region for consistency
        const languageCode = savedLang.split("-")[0];

        // Only change if different from current
        if (
          i18n.language !== languageCode &&
          (languageCode === "en" || languageCode === "vi")
        ) {
          i18n.changeLanguage(languageCode);
          document.documentElement.lang = languageCode;
        }
      }
    } catch (e) {
      console.error("Error initializing language:", e);
    }

    // Update HTML lang attribute when language changes
    const handleLanguageChanged = (lng: string) => {
      try {
        document.documentElement.lang = lng.split("-")[0];
      } catch (e) {
        console.error("Error updating document language:", e);
      }
    };

    // Register the event listener
    i18n.on("languageChanged", handleLanguageChanged);

    // Clean up the event listener on unmount
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
