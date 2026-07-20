"use client";

import { Search } from "lucide-react";

import { useCommandPalette } from "@/components/command-palette-context";
import { cn } from "@/lib/utils";

/**
 * Discoverable prompt that opens the command palette from the hero, surfacing
 * the ⌘K shortcut so users learn the palette exists.
 */
export function CommandHint({ className }: { className?: string }) {
  const { openPalette } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={openPalette}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-border hover:text-foreground",
        className
      )}
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search launches</span>
      <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium">
        ⌘K
      </kbd>
    </button>
  );
}
