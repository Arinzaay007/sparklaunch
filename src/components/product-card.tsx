import Link from "next/link";
import { Eye, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { UpvoteButton } from "@/components/upvote-button";
import type { Product } from "@/lib/types";
import { cn, formatCompact } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <Link
        href={`/product/${product.id}`}
        className="flex items-start gap-4 p-5"
      >
        {/* Logo */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
          {product.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.logo_url}
              alt={`${product.name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
              {product.name[0]}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold group-hover:text-primary">
              {product.name}
            </h3>
            {product.product_of_the_day && (
              <Badge variant="featured" className="shrink-0">
                #1 of the day
              </Badge>
            )}
            {product.featured && !product.product_of_the_day && (
              <Badge variant="gradient" className="shrink-0">
                Featured
              </Badge>
            )}
          </div>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
            {product.tagline}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="secondary">{product.category}</Badge>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {formatCompact(product.views)}
            </span>
            {product.deal && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-medium text-emerald-400"
                )}
              >
                <Tag className="h-3.5 w-3.5" />
                {product.deal}
              </span>
            )}
          </div>
        </div>

        {/* Upvote (stops its own click propagation so the card link doesn't fire) */}
        <div className="shrink-0">
          <UpvoteButton productId={product.id} initial={product.upvotes} />
        </div>
      </Link>
    </Card>
  );
}
