import type { Metadata } from "next";

import { ProductDetail } from "@/components/product-detail";
import { LocalProductDetail } from "@/components/local-product-detail";
import { getComments, getProductById } from "@/lib/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return { title: "Product" };
  }
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.screenshots[0] ? [product.screenshots[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  // Not in Supabase/seed — likely a local demo submission. Hydrate on client.
  if (!product) {
    return <LocalProductDetail id={id} />;
  }

  const comments = await getComments(id);
  return <ProductDetail product={product} comments={comments} />;
}
