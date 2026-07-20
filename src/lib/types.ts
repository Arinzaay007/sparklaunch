export const CATEGORIES = [
  "AI",
  "Developer Tools",
  "Productivity",
  "Design",
  "Marketing",
  "SaaS",
  "No-Code",
  "Analytics",
  "Finance",
  "Social",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  twitter: string | null;
  logo_url: string | null;
  screenshots: string[];
  category: string;
  upvotes: number;
  views: number;
  featured: boolean;
  product_of_the_day: boolean;
  deal: string | null; // e.g. "40% OFF" — non-null means it appears in Deals
  created_at: string;
  user_id: string | null;
}

export interface Comment {
  id: string;
  product_id: string;
  author: string;
  avatar_url: string | null;
  body: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

export type SortKey = "trending" | "newest" | "top";

/** Payload used when creating a new product from the submission form. */
export interface NewProductInput {
  name: string;
  tagline: string;
  description: string;
  url: string;
  twitter?: string | null;
  logo_url?: string | null;
  screenshots?: string[];
  category: string;
}
