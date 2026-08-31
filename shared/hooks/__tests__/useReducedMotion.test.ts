import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useReducedMotion } from "../useReducedMotion";

describe("useReducedMotion", () => {
  it("should return false by default when prefers-reduced-motion is false", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("should return true when prefers-reduced-motion is reduce", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
