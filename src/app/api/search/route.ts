import { NextResponse } from "next/server";

import { getProducts } from "@/lib/products";

/**
 * Search endpoint powering the ⌘K command palette. Delegates to the existing
 * data layer (Supabase → seed fallback) so it works in demo mode too.
 * Returns a trimmed product shape — just what the palette needs to render.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  const products = await getProducts({
    search: q || undefined,
    sort: q ? "top" : "trending",
  });

  const results = products.slice(0, 8).map((p) => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    logo_url: p.logo_url,
    upvotes: p.upvotes,
    deal: p.deal,
  }));

  return NextResponse.json(
    { query: q, results },
    { headers: { "Cache-Control": "no-store" } }
  );
}
