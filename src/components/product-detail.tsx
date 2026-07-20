import Link from "next/link";
import { ArrowUpRight, Calendar, Eye, ExternalLink, Twitter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpvoteButton } from "@/components/upvote-button";
import { ScreenshotsCarousel } from "@/components/screenshots-carousel";
import { Comments } from "@/components/comments";
import { ShareButtons } from "@/components/share-buttons";
import type { Comment, Product } from "@/lib/types";
import { formatCompact, timeAgo } from "@/lib/utils";

export function ProductDetail({
  product,
  comments,
}: {
  product: Product;
  comments: Comment[];
}) {
  return (
    <div className="container py-12">
      <Link
        href="/feed"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to launches
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div>
          <div className="flex items-start gap-4">
            {product.logo_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.logo_url}
                alt={`${product.name} logo`}
                className="h-16 w-16 shrink-0 rounded-2xl border border-border/60 object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {product.name}
                </h1>
                {product.product_of_the_day && (
                  <Badge variant="featured">#1 Product of the Day</Badge>
                )}
                {product.featured && !product.product_of_the_day && (
                  <Badge variant="gradient">Featured</Badge>
                )}
                {product.deal && <Badge variant="deal">{product.deal}</Badge>}
              </div>
              <p className="mt-1 text-lg text-muted-foreground">
                {product.tagline}
              </p>
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary">{product.category}</Badge>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {formatCompact(product.views)} views
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Launched {timeAgo(product.created_at)}
            </span>
            {product.twitter && (
              <a
                href={`https://twitter.com/${product.twitter}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />@{product.twitter}
              </a>
            )}
          </div>

          {/* Screenshots */}
          <div className="mt-8">
            <ScreenshotsCarousel
              screenshots={product.screenshots}
              name={product.name}
            />
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">About {product.name}</h2>
            <div className="mt-3 space-y-3 whitespace-pre-line text-muted-foreground">
              {product.description}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-12">
            <Comments productId={product.id} initial={comments} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Upvotes</div>
                <div className="text-2xl font-bold">{product.upvotes}</div>
              </div>
              <UpvoteButton
                productId={product.id}
                initial={product.upvotes}
                variant="detail"
              />
            </div>

            <div className="mt-6 space-y-3">
              <Button asChild variant="gradient" className="w-full" size="lg">
                <a href={product.url} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Get it
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={product.url} target="_blank" rel="noreferrer">
                  Visit website
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-6 border-t border-border/60 pt-6">
              <div className="mb-3 text-sm font-medium">Share this launch</div>
              <ShareButtons
                title={product.name}
                path={`/product/${product.id}`}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
