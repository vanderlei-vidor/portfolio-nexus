// components/Loader.tsx
"use client";
import { useEffect, useState } from "react";

const LOADER_STORAGE_KEY = "portfolio-loader-seen";

export default function Loader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const hasSeenLoader = window.sessionStorage.getItem(LOADER_STORAGE_KEY);

        if (hasSeenLoader) return;

        const showTimer = setTimeout(() => setLoading(true), 0);

        const hideTimer = setTimeout(() => {
            window.sessionStorage.setItem(LOADER_STORAGE_KEY, "true");
            setLoading(false);
        }, 1400);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-accent text-2xl animate-pulse">
                Loading Experience...
            </div>
        </div>
    );
}
