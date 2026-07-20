"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScreenshotsCarousel({
  screenshots,
  name,
}: {
  screenshots: string[];
  name: string;
}) {
  const [active, setActive] = React.useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  const go = (dir: number) =>
    setActive((a) => (a + dir + screenshots.length) % screenshots.length);

  return (
    <div>
      <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={screenshots[active]}
          alt={`${name} screenshot ${active + 1}`}
          className="aspect-[16/10] w-full animate-fade-up object-cover"
        />

        {screenshots.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Previous screenshot"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Next screenshot"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {screenshots.length > 1 && (
        <div className="mt-3 flex gap-2">
          {screenshots.map((s, i) => (
            <button
              key={s}
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1}`}
              className={cn(
                "relative h-16 flex-1 overflow-hidden rounded-lg border transition-all",
                i === active
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border/60 opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
