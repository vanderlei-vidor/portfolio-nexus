"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#030303] text-white min-h-screen flex items-center justify-center font-sans antialiased">
        <div className="premium-surface max-w-md rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 tracking-tighter">System Malfunction</h1>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            A critical error occurred in the application root layout.
          </p>
          <button
            onClick={() => reset()}
            className="premium-button premium-button--primary px-6 py-3 font-semibold"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
