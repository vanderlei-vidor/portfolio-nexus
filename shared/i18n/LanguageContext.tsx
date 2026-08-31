"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import enMessages from "@/messages/en.json";
import ptMessages from "@/messages/pt.json";
import esMessages from "@/messages/es.json";

export type Locale = "en" | "pt" | "es";

type Messages = typeof enMessages;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  t: (keyPath: string) => string;
}

const dictionaries: Record<Locale, Messages> = {
  en: enMessages,
  pt: ptMessages,
  es: esMessages,
};

const localeStorageKey = "nexus_locale";

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; nativeName: string; htmlLang: string }> = {
  en: { short: "EN", nativeName: "English", htmlLang: "en" },
  pt: { short: "PT", nativeName: "Português", htmlLang: "pt-BR" },
  es: { short: "ES", nativeName: "Español", htmlLang: "es" },
};

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "pt" || value === "es";
}

function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;

  const preferredLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const matchedLanguage = preferredLanguages
    .map((language) => language.toLowerCase())
    .find((language) => language.startsWith("pt") || language.startsWith("es") || language.startsWith("en"));

  if (matchedLanguage?.startsWith("pt")) return "pt";
  if (matchedLanguage?.startsWith("es")) return "es";
  return defaultLocale;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);

    if (typeof window !== "undefined") {
      localStorage.setItem(localeStorageKey, newLocale);
      document.documentElement.lang = localeLabels[newLocale].htmlLang;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(localeStorageKey);
    const targetLocale = isLocale(saved) ? saved : getBrowserLocale();

    document.documentElement.lang = localeLabels[targetLocale].htmlLang;
    const frameId = requestAnimationFrame(() => setLocaleState(targetLocale));

    return () => cancelAnimationFrame(frameId);
  }, []);

  const messages = dictionaries[locale] || dictionaries.en;

  const t = useCallback((keyPath: string): string => {
    const keys = keyPath.split(".");
    let current: unknown = messages;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        let fallback: unknown = dictionaries.en;

        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === "object" && fallbackKey in fallback) {
            fallback = (fallback as Record<string, unknown>)[fallbackKey];
          } else {
            return keyPath;
          }
        }

        return typeof fallback === "string" ? fallback : keyPath;
      }
    }

    return typeof current === "string" ? current : keyPath;
  }, [messages]);

  const contextValue = useMemo(
    () => ({ locale, setLocale, messages, t }),
    [locale, setLocale, messages, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
