"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight: string;
  rootMargin?: string;
}

export default function DeferredSection({
  children,
  minHeight,
  rootMargin = "400px 0px",
}: DeferredSectionProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (shouldRender) return children;

  return <div ref={placeholderRef} style={{ minHeight }} aria-hidden="true" />;
}
