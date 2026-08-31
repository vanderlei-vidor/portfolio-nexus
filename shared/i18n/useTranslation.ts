"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Custom hook to easily access translation strings and locale switcher state.
 */
export function useTranslation() {
  const { locale, setLocale, t } = useLanguage();
  return { locale, setLocale, t };
}
