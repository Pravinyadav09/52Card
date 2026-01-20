"use client";

import { useEffect } from "react";

export function SecurityProvider() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Print Screen (PrtScn) or other key combos if possible (limited browser support)
            // Getting access to clipboard is restricted.
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return null;
}
