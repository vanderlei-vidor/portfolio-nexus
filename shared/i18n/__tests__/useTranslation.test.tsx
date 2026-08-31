import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "../LanguageContext";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";

describe("i18n system", () => {
  it("provides translations and defaults to English", () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
    });

    expect(result.current.locale).toBe("en");
    expect(result.current.t("nav.home")).toBe("Home");
  });

  it("switches language to Portuguese", () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Português/i }));

    expect(localStorage.getItem("nexus_locale")).toBe("pt");
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("switches language to Spanish", () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Español/i }));

    expect(localStorage.getItem("nexus_locale")).toBe("es");
    expect(document.documentElement.lang).toBe("es");
  });
});
