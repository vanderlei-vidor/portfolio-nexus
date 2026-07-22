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
        <div className="max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-center shadow-2xl">
          <h1 className="text-3xl font-bold mb-4 tracking-tighter">System Malfunction</h1>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            A critical error occurred in the application root layout.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
