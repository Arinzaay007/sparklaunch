import type { Comment, Product } from "@/lib/types";

/** Deterministic timestamp helper — N days/hours before now. */
function ago(days: number, hours = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

// Logos use ui-avatars (no external asset files needed for the demo).
function logo(name: string, color: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=${color}&color=fff&size=256&bold=true&format=png`;
}

// Screenshots use picsum with a stable seed per product.
function shots(seed: string): string[] {
  return [
    `https://picsum.photos/seed/${seed}-1/1200/750`,
    `https://picsum.photos/seed/${seed}-2/1200/750`,
    `https://picsum.photos/seed/${seed}-3/1200/750`,
  ];
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: "prod-nebula",
    name: "Nebula AI",
    tagline: "Your second brain, powered by GPT-class models",
    description:
      "Nebula AI turns scattered notes, docs, and links into an organized knowledge base you can chat with. Ask questions in plain English and get answers sourced from your own content. Built for founders who drown in tabs.\n\nHighlights:\n• Instant semantic search across everything\n• AI summaries and daily digests\n• Slack, Notion, and Google Drive sync\n• End-to-end encrypted workspaces",
    url: "https://example.com/nebula",
    twitter: "nebula_ai",
    logo_url: logo("Nebula AI", "6d28d9"),
    screenshots: shots("nebula"),
    category: "AI",
    upvotes: 842,
    views: 12480,
    featured: true,
    product_of_the_day: true,
    deal: null,
    created_at: ago(0, 3),
    user_id: null,
  },
  {
    id: "prod-shipfast",
    name: "ShipFast Kit",
    tagline: "The Next.js boilerplate that ships in hours, not weeks",
    description:
      "Stop reinventing auth, payments, and emails. ShipFast Kit gives you a production-ready Next.js starter with Stripe, Supabase, and Resend wired up. Launch your SaaS this weekend.",
    url: "https://example.com/shipfast",
    twitter: "shipfastkit",
    logo_url: logo("ShipFast", "2563eb"),
    screenshots: shots("shipfast"),
    category: "Developer Tools",
    upvotes: 731,
    views: 9840,
    featured: true,
    product_of_the_day: false,
    deal: "40% OFF",
    created_at: ago(1, 2),
    user_id: null,
  },
  {
    id: "prod-focusflow",
    name: "FocusFlow",
    tagline: "Deep work sessions with ambient soundscapes",
    description:
      "FocusFlow blends a Pomodoro timer with generative ambient audio and website blocking. Track your focus streaks and finally beat procrastination.",
    url: "https://example.com/focusflow",
    twitter: "focusflowapp",
    logo_url: logo("FocusFlow", "059669"),
    screenshots: shots("focusflow"),
    category: "Productivity",
    upvotes: 604,
    views: 7210,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(2, 5),
    user_id: null,
  },
  {
    id: "prod-palette",
    name: "Palette Studio",
    tagline: "AI color systems for design teams",
    description:
      "Generate accessible, on-brand color palettes in seconds. Palette Studio checks contrast, exports tokens for Figma and Tailwind, and keeps your whole team in sync.",
    url: "https://example.com/palette",
    twitter: "palettestudio",
    logo_url: logo("Palette", "db2777"),
    screenshots: shots("palette"),
    category: "Design",
    upvotes: 512,
    views: 6120,
    featured: false,
    product_of_the_day: false,
    deal: "Lifetime $49",
    created_at: ago(3, 1),
    user_id: null,
  },
  {
    id: "prod-inboxzero",
    name: "InboxZero",
    tagline: "AI email assistant that actually clears your inbox",
    description:
      "InboxZero drafts replies, unsubscribes from noise, and summarizes long threads. Reach inbox zero every day without lifting a finger.",
    url: "https://example.com/inboxzero",
    twitter: "inboxzero",
    logo_url: logo("InboxZero", "ea580c"),
    screenshots: shots("inboxzero"),
    category: "Productivity",
    upvotes: 489,
    views: 5830,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(4, 6),
    user_id: null,
  },
  {
    id: "prod-metricly",
    name: "Metricly",
    tagline: "Privacy-first analytics for indie makers",
    description:
      "A lightweight, cookie-free analytics script that loads in under 1KB. Beautiful dashboards, real-time visitors, and no creepy tracking. GDPR-ready by default.",
    url: "https://example.com/metricly",
    twitter: "metricly",
    logo_url: logo("Metricly", "0891b2"),
    screenshots: shots("metricly"),
    category: "Analytics",
    upvotes: 421,
    views: 5010,
    featured: false,
    product_of_the_day: false,
    deal: "3 months free",
    created_at: ago(5, 2),
    user_id: null,
  },
  {
    id: "prod-formcraft",
    name: "FormCraft",
    tagline: "Build beautiful forms without code",
    description:
      "Drag, drop, and publish forms that convert. FormCraft handles logic jumps, payments, and integrations with 40+ tools. No developer required.",
    url: "https://example.com/formcraft",
    twitter: "formcraft",
    logo_url: logo("FormCraft", "7c3aed"),
    screenshots: shots("formcraft"),
    category: "No-Code",
    upvotes: 377,
    views: 4490,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(6, 4),
    user_id: null,
  },
  {
    id: "prod-launchmail",
    name: "LaunchMail",
    tagline: "Cold outreach that feels warm",
    description:
      "Personalize thousands of outreach emails with AI, schedule follow-ups, and track opens. LaunchMail helps you land your first 100 customers.",
    url: "https://example.com/launchmail",
    twitter: "launchmail",
    logo_url: logo("LaunchMail", "c026d3"),
    screenshots: shots("launchmail"),
    category: "Marketing",
    upvotes: 318,
    views: 3980,
    featured: false,
    product_of_the_day: false,
    deal: "50% OFF",
    created_at: ago(7, 3),
    user_id: null,
  },
  {
    id: "prod-stackpay",
    name: "StackPay",
    tagline: "Accept payments in 10 lines of code",
    description:
      "A developer-first payments API with usage-based billing, invoices, and a hosted checkout. Built for SaaS, marketplaces, and AI products.",
    url: "https://example.com/stackpay",
    twitter: "stackpay",
    logo_url: logo("StackPay", "16a34a"),
    screenshots: shots("stackpay"),
    category: "Finance",
    upvotes: 276,
    views: 3410,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(8, 1),
    user_id: null,
  },
  {
    id: "prod-loopfeed",
    name: "LoopFeed",
    tagline: "Turn customer feedback into a public roadmap",
    description:
      "Collect feature requests, let users vote, and share a live changelog. LoopFeed closes the loop between what you build and what people want.",
    url: "https://example.com/loopfeed",
    twitter: "loopfeed",
    logo_url: logo("LoopFeed", "0ea5e9"),
    screenshots: shots("loopfeed"),
    category: "SaaS",
    upvotes: 233,
    views: 2870,
    featured: false,
    product_of_the_day: false,
    deal: "Free for startups",
    created_at: ago(9, 5),
    user_id: null,
  },
];

export const SEED_COMMENTS: Comment[] = [
  {
    id: "c1",
    product_id: "prod-nebula",
    author: "Maya Chen",
    avatar_url: "https://ui-avatars.com/api/?name=Maya+Chen&background=6d28d9&color=fff",
    body: "Been using this for a week — the daily digest alone is worth it. Congrats on the launch! 🚀",
    created_at: ago(0, 2),
  },
  {
    id: "c2",
    product_id: "prod-nebula",
    author: "Devon Okafor",
    avatar_url: "https://ui-avatars.com/api/?name=Devon+Okafor&background=2563eb&color=fff",
    body: "The Notion sync is buttery smooth. Any plans for an API?",
    created_at: ago(0, 1),
  },
  {
    id: "c3",
    product_id: "prod-shipfast",
    author: "Priya Nair",
    avatar_url: "https://ui-avatars.com/api/?name=Priya+Nair&background=db2777&color=fff",
    body: "Shipped my SaaS in a weekend with this. Absolute time-saver.",
    created_at: ago(1, 1),
  },
];
