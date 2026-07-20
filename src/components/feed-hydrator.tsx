"use client";

import * as React from "react";

import { FeedClient } from "@/components/feed-client";
import { getLocalProducts } from "@/lib/local-store";
import type { Product } from "@/lib/types";

/**
 * Merges server-provided products with any locally-submitted ones (demo mode)
 * before handing off to the interactive FeedClient.
 */
export function FeedHydrator({
  products,
  dealsOnly = false,
}: {
  products: Product[];
  dealsOnly?: boolean;
}) {
  const [merged, setMerged] = React.useState<Product[]>(products);

  React.useEffect(() => {
    const local = getLocalProducts();
    if (!local.length) return;
    const ids = new Set(products.map((p) => p.id));
    let extra = local.filter((p) => !ids.has(p.id));
    if (dealsOnly) extra = extra.filter((p) => !!p.deal);
    if (extra.length) setMerged([...extra, ...products]);
  }, [products, dealsOnly]);

  return <FeedClient products={merged} />;
}
