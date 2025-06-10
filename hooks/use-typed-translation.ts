import { useTranslation, UseTranslationOptions } from "react-i18next";
import { TranslationPath } from "@/i18n/translation-types";

export function useTypedTranslation(
  ns?: string,
  options?: UseTranslationOptions<undefined>
) {
  const { t, i18n, ready } = useTranslation(ns, options);

  // Type-safe translation function
  const typedT = (
    key: TranslationPath,
    options?: Record<TranslationPath, any>
  ) => {
    return t(key, options);
  };

  return {
    t: typedT,
    i18n,
    ready,
  };
}
