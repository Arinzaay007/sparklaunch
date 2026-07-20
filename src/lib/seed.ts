import type { Comment, Product } from "@/lib/types";

/** Deterministic timestamp helper — N days/hours before now. */
function ago(days: number, hours = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

// Assets are generated SVGs committed to /public (see scripts/generate-assets.mjs).
// Logos are brand-colored marks; covers are app-window mockups. The product
// URLs link to the real, live products so the gallery is genuinely useful.
function logo(slug: string): string {
  return `/logos/${slug}.svg`;
}
function shots(slug: string): string[] {
  // Real captured screenshot first, branded cover mockup second.
  return [`/shots/${slug}.png`, `/covers/${slug}.svg`];
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: "prod-linear",
    name: "Linear",
    tagline: "The issue tracker built for high-performance teams",
    description:
      "Linear is the project and issue tracking tool that streamlines software projects, sprints, and product roadmaps. Purpose-built for speed, it keeps engineering teams focused and shipping.\n\nHighlights:\n• Blazing-fast, keyboard-first UI\n• Cycles, roadmaps, and triage\n• Git, Slack, and Figma integrations\n• Beautiful, opinionated design",
    url: "https://linear.app",
    twitter: "linear",
    logo_url: logo("linear"),
    screenshots: shots("linear"),
    category: "Productivity",
    upvotes: 842,
    views: 12480,
    featured: true,
    product_of_the_day: true,
    deal: null,
    created_at: ago(0, 3),
    user_id: null,
  },
  {
    id: "prod-raycast",
    name: "Raycast",
    tagline: "Supercharged productivity from your keyboard",
    description:
      "Raycast is a blazingly fast, extensible launcher that lets you control your tools with a few keystrokes. Search, automate, and access everything without leaving the keyboard.\n\nHighlights:\n• Command everything from one bar\n• Rich extension store\n• Clipboard history & snippets\n• AI built right in",
    url: "https://raycast.com",
    twitter: "raycastapp",
    logo_url: logo("raycast"),
    screenshots: shots("raycast"),
    category: "Productivity",
    upvotes: 731,
    views: 9840,
    featured: true,
    product_of_the_day: false,
    deal: null,
    created_at: ago(1, 0),
    user_id: null,
  },
  {
    id: "prod-supabase",
    name: "Supabase",
    tagline: "The open source Firebase alternative",
    description:
      "Supabase gives you a Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and storage. Build in a weekend, scale to millions.\n\nHighlights:\n• Full Postgres database\n• Auth with row-level security\n• Realtime & storage out of the box\n• Generous free tier",
    url: "https://supabase.com",
    twitter: "supabase",
    logo_url: logo("supabase"),
    screenshots: shots("supabase"),
    category: "Developer Tools",
    upvotes: 689,
    views: 8210,
    featured: true,
    product_of_the_day: false,
    deal: null,
    created_at: ago(2, 0),
    user_id: null,
  },
  {
    id: "prod-cal",
    name: "Cal.com",
    tagline: "Scheduling infrastructure for absolutely everyone",
    description:
      "Cal.com is the open-source Calendly alternative. Own your scheduling with a fully customizable booking experience you can self-host or use in the cloud.\n\nHighlights:\n• Open source & self-hostable\n• Team scheduling & routing\n• Deep calendar integrations\n• API-first and white-label ready",
    url: "https://cal.com",
    twitter: "calcom",
    logo_url: logo("calcom"),
    screenshots: shots("calcom"),
    category: "SaaS",
    upvotes: 604,
    views: 7210,
    featured: false,
    product_of_the_day: false,
    deal: "Free for individuals",
    created_at: ago(3, 0),
    user_id: null,
  },
  {
    id: "prod-resend",
    name: "Resend",
    tagline: "The email API for developers",
    description:
      "Resend is the modern email platform built for developers. Send transactional and marketing emails with a delightful API, React email templates, and best-in-class deliverability.\n\nHighlights:\n• Simple, powerful API\n• Write emails in React\n• First-class deliverability\n• Full analytics & webhooks",
    url: "https://resend.com",
    twitter: "resend",
    logo_url: logo("resend"),
    screenshots: shots("resend"),
    category: "Developer Tools",
    upvotes: 553,
    views: 6480,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(4, 0),
    user_id: null,
  },
  {
    id: "prod-excalidraw",
    name: "Excalidraw",
    tagline: "Virtual whiteboard for sketching hand-drawn diagrams",
    description:
      "Excalidraw is an open-source virtual whiteboard with a hand-drawn feel. Sketch diagrams, wireframes, and flows collaboratively — no account required.\n\nHighlights:\n• Hand-drawn, low-fidelity style\n• Real-time collaboration\n• End-to-end encrypted\n• Completely free & open source",
    url: "https://excalidraw.com",
    twitter: "excalidraw",
    logo_url: logo("excalidraw"),
    screenshots: shots("excalidraw"),
    category: "Design",
    upvotes: 512,
    views: 6120,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(5, 0),
    user_id: null,
  },
  {
    id: "prod-plausible",
    name: "Plausible Analytics",
    tagline: "Privacy-first analytics for indie makers",
    description:
      "Plausible is a lightweight, open-source, and privacy-friendly alternative to Google Analytics. No cookies, fully GDPR compliant, and the script is under 1KB.\n\nHighlights:\n• Cookie-free & GDPR ready\n• Tiny, fast script\n• Simple, beautiful dashboard\n• Open source & self-hostable",
    url: "https://plausible.io",
    twitter: "plausiblehq",
    logo_url: logo("plausible"),
    screenshots: shots("plausible"),
    category: "Analytics",
    upvotes: 421,
    views: 5010,
    featured: false,
    product_of_the_day: false,
    deal: "3 months free",
    created_at: ago(6, 0),
    user_id: null,
  },
  {
    id: "prod-tally",
    name: "Tally",
    tagline: "The simplest way to create free forms",
    description:
      "Tally is a form builder that works like a text document. Create unlimited forms and surveys for free, with powerful features and no coding required.\n\nHighlights:\n• Free & unlimited forms\n• Works like a doc — just type\n• Logic jumps & calculations\n• Payments and integrations",
    url: "https://tally.so",
    twitter: "tally_so",
    logo_url: logo("tally"),
    screenshots: shots("tally"),
    category: "No-Code",
    upvotes: 377,
    views: 4490,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(7, 0),
    user_id: null,
  },
  {
    id: "prod-framer",
    name: "Framer",
    tagline: "The web builder for stunning, no-code sites",
    description:
      "Framer lets you design and publish professional websites without code. Start from a template or a blank canvas, add interactions, and ship to a custom domain in minutes.\n\nHighlights:\n• Design and publish in one place\n• Powerful interactions & animations\n• CMS and SEO built in\n• Templates for every use case",
    url: "https://framer.com",
    twitter: "framer",
    logo_url: logo("framer"),
    screenshots: shots("framer"),
    category: "Design",
    upvotes: 342,
    views: 4120,
    featured: false,
    product_of_the_day: false,
    deal: null,
    created_at: ago(8, 0),
    user_id: null,
  },
  {
    id: "prod-warp",
    name: "Warp",
    tagline: "The intelligent terminal for the 21st century",
    description:
      "Warp is a modern, Rust-based terminal with AI built in. Edit commands like a code editor, share workflows with your team, and get AI help right in your shell.\n\nHighlights:\n• Blocks, not endless scrollback\n• AI command search & suggestions\n• Modern text editing\n• Shareable workflows",
    url: "https://www.warp.dev",
    twitter: "warpdotdev",
    logo_url: logo("warp"),
    screenshots: shots("warp"),
    category: "Developer Tools",
    upvotes: 298,
    views: 3410,
    featured: false,
    product_of_the_day: false,
    deal: "Free plan available",
    created_at: ago(9, 0),
    user_id: null,
  },
];

export const SEED_COMMENTS: Comment[] = [
  {
    id: "c1",
    product_id: "prod-linear",
    author: "Maya Chen",
    avatar_url:
      "https://ui-avatars.com/api/?name=Maya+Chen&background=6d28d9&color=fff",
    body: "The keyboard shortcuts alone changed how our team ships. Congrats on the launch! 🚀",
    created_at: ago(0, 2),
  },
  {
    id: "c2",
    product_id: "prod-linear",
    author: "Devon Okafor",
    avatar_url:
      "https://ui-avatars.com/api/?name=Devon+Okafor&background=2563eb&color=fff",
    body: "Fastest issue tracker I've ever used. The triage view is chef's kiss.",
    created_at: ago(0, 1),
  },
  {
    id: "c3",
    product_id: "prod-supabase",
    author: "Priya Nair",
    avatar_url:
      "https://ui-avatars.com/api/?name=Priya+Nair&background=db2777&color=fff",
    body: "Shipped my SaaS in a weekend with this. Auth + Postgres + storage in one place is unreal.",
    created_at: ago(1, 1),
  },
];
