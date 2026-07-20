import Link from "next/link";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LiveCounter } from "@/components/live-counter";
import { Stats } from "@/components/stats";
import { CommandHint } from "@/components/command-hint";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="spark-glow pointer-events-none absolute inset-0" />
      <div className="spark-grid pointer-events-none absolute inset-0" />

      <div className="container relative flex flex-col items-center py-20 text-center md:py-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
          The all-in-one launch platform for makers
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Launch your product.{" "}
          <span className="spark-gradient-text">Reach thousands</span> of
          makers. Get your first users in one click.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          SparkLaunch puts your product in front of a community of 30,000+
          founders, builders, and early adopters. No gatekeepers. No waitlist.
          Just launch.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="xl" variant="gradient">
            <Link href="/submit">
              <Rocket className="h-5 w-5" />
              Launch for Free
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/feed">
              Explore launches
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <CommandHint />
        </div>

        <div className="mt-6">
          <LiveCounter />
        </div>

        <div className="mt-16 w-full max-w-4xl">
          <Stats />
        </div>
      </div>
    </section>
  );
}
