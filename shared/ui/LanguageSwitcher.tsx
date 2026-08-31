"use client";

import { Globe } from "lucide-react";
import { localeLabels, type Locale } from "@/shared/i18n/LanguageContext";
import { useTranslation } from "@/shared/i18n/useTranslation";

const supportedLocales = Object.keys(localeLabels) as Locale[];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1 text-xs font-mono shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      role="group"
      aria-label={t("language.label")}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-300" aria-hidden="true">
        <Globe size={15} strokeWidth={1.8} />
      </div>

      {supportedLocales.map((supportedLocale) => {
        const label = localeLabels[supportedLocale];
        const isActive = locale === supportedLocale;
        const accessibleLabel = isActive
          ? `${t("language.current")}: ${label.nativeName}`
          : `${t("language.changeTo")} ${label.nativeName}`;

        return (
          <button
            key={supportedLocale}
            type="button"
            onClick={() => setLocale(supportedLocale)}
            className={`min-h-9 min-w-10 rounded-full px-3 font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              isActive
                ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.28)]"
                : "text-zinc-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-label={accessibleLabel}
            aria-pressed={isActive}
            lang={label.htmlLang}
          >
            {label.short}
          </button>
        );
      })}
    </div>
  );
}
