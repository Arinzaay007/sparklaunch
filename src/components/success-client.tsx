"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/confetti";
import { ShareButtons } from "@/components/share-buttons";

export function SuccessClient() {
  const params = useSearchParams();
  const name = params.get("name") || "Your product";
  const id = params.get("id") || "";
  const [showConfetti, setShowConfetti] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      {showConfetti && <Confetti />}
      <div className="spark-glow pointer-events-none absolute inset-0 h-80" />

      <div className="container relative flex max-w-lg flex-col items-center py-24 text-center">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="h-9 w-9" />
        </span>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          🚀 <span className="spark-gradient-text">{name}</span> is live!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Congratulations! Your product is now in front of thousands of makers.
          Share it to climb the rankings and get your first upvotes.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {id && (
            <Button asChild size="lg" variant="gradient">
              <Link href={`/product/${id}`}>
                View your launch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button asChild size="lg" variant="outline">
            <Link href="/feed">
              <Rocket className="h-4 w-4" />
              Explore other launches
            </Link>
          </Button>
        </div>

        <div className="mt-10 w-full rounded-2xl border border-border/60 bg-card/50 p-6">
          <div className="mb-3 text-sm font-medium">
            Share your launch and get more upvotes
          </div>
          <div className="flex justify-center">
            <ShareButtons
              title={name}
              path={id ? `/product/${id}` : "/feed"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
