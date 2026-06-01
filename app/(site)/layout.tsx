import React from "react";

/**
 * Layout para o grupo de rotas (site)
 * Engloba: home, process, projects, etc.
 */
export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 w-full">
            {children}
        </main>
    );
}
