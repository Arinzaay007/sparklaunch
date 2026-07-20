import type { Metadata } from "next";

import { FeedHydrator } from "@/components/feed-hydrator";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Explore launches",
  description:
    "Discover the latest products launched by makers and founders on SparkLaunch.",
};

export default async function FeedPage() {
  const products = await getProducts({ sort: "trending" });

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Explore launches
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover what makers are building. Upvote your favorites and find your
          next favorite tool.
        </p>
      </div>

      <FeedHydrator products={products} />
    </div>
  );
}
