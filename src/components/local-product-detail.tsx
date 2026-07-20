"use client";

import * as React from "react";
import Link from "next/link";

import { ProductDetail } from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getLocalProductById } from "@/lib/local-store";
import type { Product } from "@/lib/types";

/**
 * Fallback for product detail when the server couldn't find the product —
 * it may be a demo submission living only in localStorage.
 */
export function LocalProductDetail({ id }: { id: string }) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setProduct(getLocalProductById(id));
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-8 w-40" />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Skeleton className="h-16 w-2/3" />
            <Skeleton className="aspect-[16/10] w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container flex flex-col items-center py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          This launch doesn&apos;t exist or has been removed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/feed">Explore launches</Link>
        </Button>
      </div>
    );
  }

  return <ProductDetail product={product} comments={[]} />;
}
