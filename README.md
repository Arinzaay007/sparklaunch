# 🚀 SparkLaunch

**Launch your product. Reach thousands of makers. Get your first users in one click.**

SparkLaunch is a polished, Product Hunt–style launch platform for makers and
founders. Submit a product, collect upvotes and comments, showcase deals, and
manage everything from an admin dashboard — all in a fast, dark-mode-first
Next.js app.

Built to run **out of the box with zero configuration** (in-memory demo data),
and to scale up to a real backend the moment you add Supabase credentials.

---

## ✨ Features

- **Landing page** with animated hero, live "makers online" counter, stats,
  Product of the Day, trending grid, testimonials carousel, and CTAs.
- **Explore feed** with live search, category filters, and Trending / Newest /
  Top sorting.
- **Product detail** pages with screenshot carousel, description, optimistic
  upvotes, threaded comments, and social share buttons.
- **Submit flow** with logo + screenshot uploads (drag to add, live previews),
  category select, and validation.
- **Success page** with a confetti burst and share prompts.
- **Deals** page highlighting products offering discounts.
- **Admin dashboard** (password-gated) to feature products and crown the
  Product of the Day.
- **Dark / light theme** toggle, fully responsive, accessible components.
- **SEO** — per-page metadata, Open Graph, Twitter cards, and a 🚀 favicon.

## 🧱 Tech stack

- [Next.js 15](https://nextjs.org) (App Router, React Server Components)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)-style components
- [Radix UI](https://www.radix-ui.com) primitives
- [Supabase](https://supabase.com) (Postgres + Storage) — optional
- [Sonner](https://sonner.emilkowal.ski) toasts, [lucide-react](https://lucide.dev) icons

---

## 🏁 Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). That's it — the app runs
immediately using built-in demo data. No database required.

> **Demo mode:** Without Supabase env vars, products come from in-memory seed
> data, and new submissions/upvotes/comments are persisted to your browser's
> `localStorage` so the flow feels real.

### 3. Admin access

Visit [`/admin`](http://localhost:3000/admin). The default demo password is:

```
sparklaunch
```

Override it with `NEXT_PUBLIC_ADMIN_PASSWORD` (see below).

---

## 🗄️ Connecting Supabase (optional)

To enable real persistence and file uploads:

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) to create
   the tables, RLS policies, and the `product-assets` storage bucket.
3. (Optional) Run [`supabase/seed.sql`](supabase/seed.sql) to populate demo
   products and comments.
4. Copy your credentials into `.env.local`:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password
```

5. Restart the dev server. The app now reads and writes to Supabase, and file
   uploads go to the `product-assets` bucket.

> ⚠️ **Security note:** The included RLS policies are intentionally permissive
> so the demo works with the anon key alone (anyone can insert/update). Tighten
> them — and move the admin gate to real auth — before any production use.

---

## 📁 Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, theme, nav, footer, metadata
│   ├── page.tsx              # Landing page
│   ├── feed/                 # Explore feed
│   ├── product/[id]/         # Product detail (SSR + local fallback)
│   ├── submit/               # Submission form
│   ├── success/              # Post-launch confetti page
│   ├── deals/                # Deals listing
│   └── admin/                # Password-gated dashboard
├── components/               # UI + feature components
│   └── ui/                   # shadcn/ui-style primitives
└── lib/
    ├── products.ts           # Data access (Supabase → seed fallback)
    ├── seed.ts               # In-memory demo data
    ├── local-store.ts        # localStorage persistence for demo mode
    ├── supabase/             # Browser + server clients
    ├── types.ts              # Shared types
    └── utils.ts              # Helpers (cn, formatting, slugify)
supabase/
├── schema.sql                # Tables, RLS, storage bucket
└── seed.sql                  # Optional seed data
```

---

## 🚢 Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.local` (optional — it deploys fine
   in demo mode without them).
4. Deploy. 🎉

---

## 📜 Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint                      |

---

Built with ☕ for makers. Now go launch something.
