"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface UpvoteButtonProps {
  productId: string;
  initial: number;
  variant?: "card" | "detail";
  className?: string;
}

/**
 * Optimistic upvote. Persists to Supabase when configured; otherwise it's a
 * local-only demo interaction. Guards against double-voting via localStorage.
 */
export function UpvoteButton({
  productId,
  initial,
  variant = "card",
  className,
}: UpvoteButtonProps) {
  const [count, setCount] = React.useState(initial);
  const [voted, setVoted] = React.useState(false);

  React.useEffect(() => {
    setVoted(
      typeof window !== "undefined" &&
        localStorage.getItem(`spark-upvote-${productId}`) === "1"
    );
  }, [productId]);

  async function handleVote(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (voted) {
      setVoted(false);
      setCount((c) => c - 1);
      localStorage.removeItem(`spark-upvote-${productId}`);
      return;
    }

    const next = count + 1;
    setVoted(true);
    setCount(next);
    localStorage.setItem(`spark-upvote-${productId}`, "1");
    toast.success("Upvoted! Thanks for the support 🙌");

    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase
        .from("products")
        .update({ upvotes: next })
        .eq("id", productId);
      if (error) {
        // Non-fatal in demo mode — keep the optimistic UI.
        console.warn("Upvote persist failed:", error.message);
      }
    }
  }

  if (variant === "detail") {
    return (
      <button
        onClick={handleVote}
        aria-pressed={voted}
        className={cn(
          "flex h-16 w-20 flex-col items-center justify-center rounded-xl border text-center transition-all",
          voted
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card hover:border-primary/50 hover:bg-accent",
          className
        )}
      >
        <ChevronUp className="h-5 w-5" />
        <span className="text-lg font-bold leading-none">{count}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleVote}
      aria-pressed={voted}
      className={cn(
        "flex flex-col items-center rounded-lg border px-2.5 py-1.5 text-sm font-semibold transition-all",
        voted
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background/40 text-foreground hover:border-primary/50 hover:bg-accent",
        className
      )}
    >
      <ChevronUp className="h-4 w-4" />
      {count}
    </button>
  );
}
