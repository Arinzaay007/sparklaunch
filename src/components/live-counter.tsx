"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Fake "makers online right now" ticker. Starts near 1,248 and gently drifts
 * up and down to feel alive.
 */
export function LiveCounter({ className }: { className?: string }) {
  const [count, setCount] = React.useState(1248);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4..+4
        const next = c + delta;
        return Math.min(1400, Math.max(1180, next));
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-medium text-foreground">
        {count.toLocaleString()}
      </span>{" "}
      makers online right now
    </div>
  );
}
