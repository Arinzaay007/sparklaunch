import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Deals & offers",
  description:
    "Exclusive deals and discounts from products launched on SparkLaunch.",
};

export default async function DealsPage() {
  const deals = await getProducts({ sort: "top", dealsOnly: true });

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-black">
          <Tag className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Deals & offers
          </h1>
          <p className="mt-1 text-muted-foreground">
            Exclusive discounts from makers in the SparkLaunch community.
          </p>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
          No active deals right now. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((p) => (
            <Card
              key={p.id}
              className="group relative flex flex-col overflow-hidden transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {p.screenshots[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.screenshots[0]}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <Badge variant="deal" className="absolute left-3 top-3">
                  {p.deal}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  {p.logo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo_url}
                      alt=""
                      className="h-10 w-10 rounded-lg border border-border/60 object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{p.name}</h3>
                    <Badge variant="secondary" className="mt-0.5">
                      {p.category}
                    </Badge>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {p.tagline}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="gradient" size="sm" className="flex-1">
                    <Link href={`/product/${p.id}`}>Claim deal</Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <a href={p.url} target="_blank" rel="noreferrer" aria-label="Visit site">
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
