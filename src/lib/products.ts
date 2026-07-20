import { createClient } from "@/lib/supabase/server";
import { SEED_COMMENTS, SEED_PRODUCTS } from "@/lib/seed";
import type { Comment, Product, SortKey } from "@/lib/types";

/**
 * Data-access layer. Every function tries Supabase first and transparently
 * falls back to in-memory seed data when Supabase isn't configured or a query
 * fails — so the app is always demo-able.
 */

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const arr = [...list];
  switch (sort) {
    case "newest":
      return arr.sort(
        (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
      );
    case "top":
      return arr.sort((a, b) => b.upvotes - a.upvotes);
    case "trending":
    default:
      // Trending = upvotes weighted by recency (simple gravity score).
      return arr.sort((a, b) => {
        const score = (p: Product) => {
          const hours =
            (Date.now() - +new Date(p.created_at)) / 3_600_000 + 2;
          return (p.upvotes + p.views * 0.05) / Math.pow(hours, 0.8);
        };
        return score(b) - score(a);
      });
  }
}

export interface GetProductsOptions {
  sort?: SortKey;
  category?: string;
  search?: string;
  dealsOnly?: boolean;
}

export async function getProducts(
  opts: GetProductsOptions = {}
): Promise<Product[]> {
  const { sort = "trending", category, search, dealsOnly } = opts;
  const supabase = await createClient();

  let list: Product[];

  if (supabase) {
    const { data, error } = await supabase.from("products").select("*");
    list = !error && data ? (data as Product[]) : SEED_PRODUCTS;
  } else {
    list = SEED_PRODUCTS;
  }

  if (category && category !== "All") {
    list = list.filter((p) => p.category === category);
  }
  if (dealsOnly) {
    list = list.filter((p) => !!p.deal);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return sortProducts(list, sort);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!error && data) return data as Product;
  }

  return SEED_PRODUCTS.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const products = await getProducts({ sort: "top" });
  return (
    products.find((p) => p.product_of_the_day) ??
    products.find((p) => p.featured) ??
    products[0] ??
    null
  );
}

export async function getComments(productId: string): Promise<Comment[]> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (!error && data) return data as Comment[];
  }

  return SEED_COMMENTS.filter((c) => c.product_id === productId).sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
}
