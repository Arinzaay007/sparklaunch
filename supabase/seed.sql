-- SparkLaunch — seed data
-- Optional: populates the products + comments tables with the same demo data
-- the app falls back to in-memory. Run after schema.sql.
-- Timestamps are relative to now() so "trending" stays sensible.

insert into public.products
  (id, name, tagline, description, url, twitter, logo_url, screenshots, category, upvotes, views, featured, product_of_the_day, deal, created_at)
values
  ('prod-nebula', 'Nebula AI', 'Your second brain, powered by GPT-class models',
   'Nebula AI turns scattered notes, docs, and links into an organized knowledge base you can chat with. Ask questions in plain English and get answers sourced from your own content.',
   'https://example.com/nebula', 'nebula_ai',
   'https://ui-avatars.com/api/?name=Nebula+AI&background=6d28d9&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/nebula-1/1200/750','https://picsum.photos/seed/nebula-2/1200/750','https://picsum.photos/seed/nebula-3/1200/750'],
   'AI', 842, 12480, true, true, null, now() - interval '3 hours'),

  ('prod-shipfast', 'ShipFast Kit', 'The Next.js boilerplate that ships in hours, not weeks',
   'Stop reinventing auth, payments, and emails. ShipFast Kit gives you a production-ready Next.js starter with Stripe, Supabase, and Resend wired up.',
   'https://example.com/shipfast', 'shipfastkit',
   'https://ui-avatars.com/api/?name=ShipFast&background=2563eb&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/shipfast-1/1200/750','https://picsum.photos/seed/shipfast-2/1200/750','https://picsum.photos/seed/shipfast-3/1200/750'],
   'Developer Tools', 731, 9840, true, false, '40% OFF', now() - interval '1 day'),

  ('prod-focusflow', 'FocusFlow', 'Deep work sessions with ambient soundscapes',
   'FocusFlow blends a Pomodoro timer with generative ambient audio and website blocking. Track your focus streaks and finally beat procrastination.',
   'https://example.com/focusflow', 'focusflowapp',
   'https://ui-avatars.com/api/?name=FocusFlow&background=059669&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/focusflow-1/1200/750','https://picsum.photos/seed/focusflow-2/1200/750','https://picsum.photos/seed/focusflow-3/1200/750'],
   'Productivity', 604, 7210, false, false, null, now() - interval '2 days'),

  ('prod-palette', 'Palette Studio', 'AI color systems for design teams',
   'Generate accessible, on-brand color palettes in seconds. Palette Studio checks contrast, exports tokens for Figma and Tailwind, and keeps your whole team in sync.',
   'https://example.com/palette', 'palettestudio',
   'https://ui-avatars.com/api/?name=Palette&background=db2777&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/palette-1/1200/750','https://picsum.photos/seed/palette-2/1200/750','https://picsum.photos/seed/palette-3/1200/750'],
   'Design', 512, 6120, false, false, 'Lifetime $49', now() - interval '3 days'),

  ('prod-inboxzero', 'InboxZero', 'AI email assistant that actually clears your inbox',
   'InboxZero drafts replies, unsubscribes from noise, and summarizes long threads. Reach inbox zero every day without lifting a finger.',
   'https://example.com/inboxzero', 'inboxzero',
   'https://ui-avatars.com/api/?name=InboxZero&background=ea580c&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/inboxzero-1/1200/750','https://picsum.photos/seed/inboxzero-2/1200/750','https://picsum.photos/seed/inboxzero-3/1200/750'],
   'Productivity', 489, 5830, false, false, null, now() - interval '4 days'),

  ('prod-metricly', 'Metricly', 'Privacy-first analytics for indie makers',
   'A lightweight, cookie-free analytics script that loads in under 1KB. Beautiful dashboards, real-time visitors, and no creepy tracking. GDPR-ready by default.',
   'https://example.com/metricly', 'metricly',
   'https://ui-avatars.com/api/?name=Metricly&background=0891b2&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/metricly-1/1200/750','https://picsum.photos/seed/metricly-2/1200/750','https://picsum.photos/seed/metricly-3/1200/750'],
   'Analytics', 421, 5010, false, false, '3 months free', now() - interval '5 days'),

  ('prod-formcraft', 'FormCraft', 'Build beautiful forms without code',
   'Drag, drop, and publish forms that convert. FormCraft handles logic jumps, payments, and integrations with 40+ tools. No developer required.',
   'https://example.com/formcraft', 'formcraft',
   'https://ui-avatars.com/api/?name=FormCraft&background=7c3aed&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/formcraft-1/1200/750','https://picsum.photos/seed/formcraft-2/1200/750','https://picsum.photos/seed/formcraft-3/1200/750'],
   'No-Code', 377, 4490, false, false, null, now() - interval '6 days'),

  ('prod-launchmail', 'LaunchMail', 'Cold outreach that feels warm',
   'Personalize thousands of outreach emails with AI, schedule follow-ups, and track opens. LaunchMail helps you land your first 100 customers.',
   'https://example.com/launchmail', 'launchmail',
   'https://ui-avatars.com/api/?name=LaunchMail&background=c026d3&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/launchmail-1/1200/750','https://picsum.photos/seed/launchmail-2/1200/750','https://picsum.photos/seed/launchmail-3/1200/750'],
   'Marketing', 342, 4120, false, false, null, now() - interval '7 days'),

  ('prod-stackpay', 'StackPay', 'Accept payments in 10 lines of code',
   'A developer-first payments API with usage-based billing, invoices, and a hosted checkout. Built for SaaS, marketplaces, and AI products.',
   'https://example.com/stackpay', 'stackpay',
   'https://ui-avatars.com/api/?name=StackPay&background=16a34a&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/stackpay-1/1200/750','https://picsum.photos/seed/stackpay-2/1200/750','https://picsum.photos/seed/stackpay-3/1200/750'],
   'Finance', 276, 3410, false, false, null, now() - interval '8 days'),

  ('prod-loopfeed', 'LoopFeed', 'Turn customer feedback into a public roadmap',
   'Collect feature requests, let users vote, and share a live changelog. LoopFeed closes the loop between what you build and what people want.',
   'https://example.com/loopfeed', 'loopfeed',
   'https://ui-avatars.com/api/?name=LoopFeed&background=0ea5e9&color=fff&size=256&bold=true&format=png',
   array['https://picsum.photos/seed/loopfeed-1/1200/750','https://picsum.photos/seed/loopfeed-2/1200/750','https://picsum.photos/seed/loopfeed-3/1200/750'],
   'SaaS', 233, 2870, false, false, 'Free for startups', now() - interval '9 days')
on conflict (id) do nothing;

insert into public.comments (product_id, author, avatar_url, body, created_at)
values
  ('prod-nebula', 'Maya Chen', 'https://ui-avatars.com/api/?name=Maya+Chen&background=6d28d9&color=fff',
   'Been using this for a week — the daily digest alone is worth it. Congrats on the launch! 🚀', now() - interval '2 hours'),
  ('prod-nebula', 'Devon Okafor', 'https://ui-avatars.com/api/?name=Devon+Okafor&background=2563eb&color=fff',
   'The Notion sync is buttery smooth. Any plans for an API?', now() - interval '1 hour'),
  ('prod-shipfast', 'Priya Nair', 'https://ui-avatars.com/api/?name=Priya+Nair&background=db2777&color=fff',
   'Shipped my SaaS in a weekend with this. Absolute time-saver.', now() - interval '20 hours');
