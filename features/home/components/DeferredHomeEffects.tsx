"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";



const Cursor = dynamic(() => import("@/shared/effects/Cursor"), {
  ssr: false,
});

export default function DeferredHomeEffects() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const windowWithIdleCallback = window as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (windowWithIdleCallback.requestIdleCallback) {
      const idleId = windowWithIdleCallback.requestIdleCallback(
        () => setShouldRender(true),
        { timeout: 2000 }
      );

      return () => windowWithIdleCallback.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => setShouldRender(true), 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      
      <Cursor />
    </>
  );
}