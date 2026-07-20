import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/lib/types";

/**
 * Editorial "browse by category" grid — mirrors the region cards of a luxury
 * real-estate site: a large image, a serif label, and a count, each linking
 * into the filtered feed.
 */
const FEATURED_CATEGORIES = [
  "Productivity",
  "Developer Tools",
  "Design",
  "Analytics",
] as const;

export function CategoryShowcase({ products }: { products: Product[] }) {
  const cards = FEATURED_CATEGORIES.map((category) => {
    const inCategory = products.filter((p) => p.category === category);
    const cover = inCategory[0]?.screenshots?.[0] ?? null;
    return { category, count: inCategory.length, cover };
  }).filter((c) => c.count > 0);

  if (cards.length === 0) return null;

  return (
    <section className="container py-16 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Explore the collection
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Browse by category
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ category, count, cover }) => (
          <Link
            key={category}
            href={`/feed?category=${encodeURIComponent(category)}`}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border/60"
          >
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt={category}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="relative p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-medium">{category}</h3>
                <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-1 text-sm text-white/70">
                {count} {count === 1 ? "launch" : "launches"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
