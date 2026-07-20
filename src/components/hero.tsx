"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Compass, Rocket, Search, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LiveCounter } from "@/components/live-counter";
import { cn } from "@/lib/utils";

type Mode = "discover" | "launch" | "deals";

const TABS: { id: Mode; label: string; icon: React.ElementType }[] = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "launch", label: "Launch", icon: Rocket },
  { id: "deals", label: "Deals", icon: Tag },
];

const PLACEHOLDER: Record<Mode, string> = {
  discover: "Search launches, makers, categories…",
  launch: "What are you launching? Name your product…",
  deals: "Find a deal — analytics, design, dev tools…",
};

export function Hero() {
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>("discover");
  const [query, setQuery] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (mode === "launch") {
      router.push("/submit");
      return;
    }
    if (mode === "deals") {
      router.push(q ? `/deals?q=${encodeURIComponent(q)}` : "/deals");
      return;
    }
    router.push(q ? `/feed?q=${encodeURIComponent(q)}` : "/feed");
  }

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden">
      {/* Full-bleed editorial background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/workspace.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-scrim absolute inset-0" />

      <div className="container relative flex min-h-[88vh] flex-col justify-center py-24 text-white">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            The all-in-one launch platform for makers
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
            Launch your product.
            <br />
            <span className="italic text-white/90">Reach thousands</span> of
            makers.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            Put your product in front of a community of 30,000+ founders,
            builders, and early adopters. No gatekeepers. No waitlist. Just
            launch.
          </p>
        </div>

        {/* Tabbed action bar + inline search */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="flex gap-1">
            {TABS.map((t) => {
              const active = mode === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMode(t.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-t-xl px-5 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-white text-neutral-900"
                      : "bg-white/10 text-white/85 backdrop-blur hover:bg-white/20"
                  )}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 rounded-b-xl rounded-tr-xl bg-white p-3 shadow-2xl sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={PLACEHOLDER[mode]}
                aria-label={PLACEHOLDER[mode]}
                className="h-12 w-full bg-transparent text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
            <Button
              type="submit"
              size="xl"
              className="bg-neutral-900 text-white hover:bg-neutral-800 sm:w-auto"
            >
              {mode === "launch" ? (
                <>
                  <Rocket className="h-5 w-5" />
                  Launch for Free
                </>
              ) : (
                <>
                  {TABS.find((t) => t.id === mode)?.label}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <LiveCounter className="border-white/20 bg-white/10 text-white/80 backdrop-blur [&_span]:text-white" />
          <Link
            href="/feed"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/85 underline-offset-4 hover:underline"
          >
            Browse all launches
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
