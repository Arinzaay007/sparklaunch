"use client";

import type { NewProductInput, Product } from "@/lib/types";

/**
 * Client-side persistence for demo mode (no Supabase configured). Newly
 * submitted products are stored in localStorage so the feed, detail, and
 * admin pages can display them without a backend.
 */

const KEY = "spark-local-products";

export function getLocalProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

export function addLocalProduct(input: NewProductInput & { id: string }): Product {
  const product: Product = {
    id: input.id,
    name: input.name,
    tagline: input.tagline,
    description: input.description,
    url: input.url,
    twitter: input.twitter ?? null,
    logo_url: input.logo_url ?? null,
    screenshots: input.screenshots ?? [],
    category: input.category,
    upvotes: 1,
    views: 0,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: new Date().toISOString(),
    user_id: null,
  };

  const existing = getLocalProducts().filter((p) => p.id !== product.id);
  localStorage.setItem(KEY, JSON.stringify([product, ...existing]));
  return product;
}

export function getLocalProductById(id: string): Product | null {
  return getLocalProducts().find((p) => p.id === id) ?? null;
}
