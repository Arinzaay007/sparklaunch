"use client";

import * as React from "react";
import { Flame, Search, Sparkles, Trophy } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, type Product, type SortKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const sorts: { key: SortKey; label: string; icon: React.ElementType }[] = [
  { key: "trending", label: "Trending", icon: Flame },
  { key: "newest", label: "Newest", icon: Sparkles },
  { key: "top", label: "Top", icon: Trophy },
];

function score(p: Product, sort: SortKey): number {
  if (sort === "newest") return +new Date(p.created_at);
  if (sort === "top") return p.upvotes;
  const hours = (Date.now() - +new Date(p.created_at)) / 3_600_000 + 2;
  return (p.upvotes + p.views * 0.05) / Math.pow(hours, 0.8);
}

export function FeedClient({ products }: { products: Product[] }) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");
  const [sort, setSort] = React.useState<SortKey>("trending");

  const filtered = React.useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => score(b, sort) - score(a, sort));
  }, [products, category, search, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/50 p-1">
            {sorts.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  sort === s.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category chips */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-sm transition-colors",
                category === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-muted-foreground">
            No products match your search. Try a different filter.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
