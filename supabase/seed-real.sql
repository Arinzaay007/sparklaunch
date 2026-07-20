-- SparkLaunch — replace demo data with real, linkable products
-- Run this in the Supabase SQL Editor. Safe to re-run (deletes then re-inserts).
-- The deployed site reads from Supabase, so this is what updates production.
-- Asset paths (/logos/*.svg, /covers/*.svg) are served by the Next.js app from /public.

-- Clear existing rows (comments first — FK to products)
delete from public.comments;
delete from public.products;

insert into public.products
  (id, name, tagline, description, url, twitter, logo_url, screenshots, category, upvotes, views, featured, product_of_the_day, deal, created_at)
values
  ('prod-linear', 'Linear', 'The issue tracker built for high-performance teams',
   E'Linear is the project and issue tracking tool that streamlines software projects, sprints, and product roadmaps. Purpose-built for speed, it keeps engineering teams focused and shipping.\n\nHighlights:\n• Blazing-fast, keyboard-first UI\n• Cycles, roadmaps, and triage\n• Git, Slack, and Figma integrations\n• Beautiful, opinionated design',
   'https://linear.app', 'linear', '/logos/linear.svg', array['/covers/linear.svg'],
   'Productivity', 842, 12480, true, true, null, now() - interval '3 hours'),

  ('prod-raycast', 'Raycast', 'Supercharged productivity from your keyboard',
   E'Raycast is a blazingly fast, extensible launcher that lets you control your tools with a few keystrokes. Search, automate, and access everything without leaving the keyboard.\n\nHighlights:\n• Command everything from one bar\n• Rich extension store\n• Clipboard history & snippets\n• AI built right in',
   'https://raycast.com', 'raycastapp', '/logos/raycast.svg', array['/covers/raycast.svg'],
   'Productivity', 731, 9840, true, false, null, now() - interval '1 day'),

  ('prod-supabase', 'Supabase', 'The open source Firebase alternative',
   E'Supabase gives you a Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and storage. Build in a weekend, scale to millions.\n\nHighlights:\n• Full Postgres database\n• Auth with row-level security\n• Realtime & storage out of the box\n• Generous free tier',
   'https://supabase.com', 'supabase', '/logos/supabase.svg', array['/covers/supabase.svg'],
   'Developer Tools', 689, 8210, true, false, null, now() - interval '2 days'),

  ('prod-cal', 'Cal.com', 'Scheduling infrastructure for absolutely everyone',
   E'Cal.com is the open-source Calendly alternative. Own your scheduling with a fully customizable booking experience you can self-host or use in the cloud.\n\nHighlights:\n• Open source & self-hostable\n• Team scheduling & routing\n• Deep calendar integrations\n• API-first and white-label ready',
   'https://cal.com', 'calcom', '/logos/calcom.svg', array['/covers/calcom.svg'],
   'SaaS', 604, 7210, false, false, 'Free for individuals', now() - interval '3 days'),

  ('prod-resend', 'Resend', 'The email API for developers',
   E'Resend is the modern email platform built for developers. Send transactional and marketing emails with a delightful API, React email templates, and best-in-class deliverability.\n\nHighlights:\n• Simple, powerful API\n• Write emails in React\n• First-class deliverability\n• Full analytics & webhooks',
   'https://resend.com', 'resend', '/logos/resend.svg', array['/covers/resend.svg'],
   'Developer Tools', 553, 6480, false, false, null, now() - interval '4 days'),

  ('prod-excalidraw', 'Excalidraw', 'Virtual whiteboard for sketching hand-drawn diagrams',
   E'Excalidraw is an open-source virtual whiteboard with a hand-drawn feel. Sketch diagrams, wireframes, and flows collaboratively — no account required.\n\nHighlights:\n• Hand-drawn, low-fidelity style\n• Real-time collaboration\n• End-to-end encrypted\n• Completely free & open source',
   'https://excalidraw.com', 'excalidraw', '/logos/excalidraw.svg', array['/covers/excalidraw.svg'],
   'Design', 512, 6120, false, false, null, now() - interval '5 days'),

  ('prod-plausible', 'Plausible Analytics', 'Privacy-first analytics for indie makers',
   E'Plausible is a lightweight, open-source, and privacy-friendly alternative to Google Analytics. No cookies, fully GDPR compliant, and the script is under 1KB.\n\nHighlights:\n• Cookie-free & GDPR ready\n• Tiny, fast script\n• Simple, beautiful dashboard\n• Open source & self-hostable',
   'https://plausible.io', 'plausiblehq', '/logos/plausible.svg', array['/covers/plausible.svg'],
   'Analytics', 421, 5010, false, false, '3 months free', now() - interval '6 days'),

  ('prod-tally', 'Tally', 'The simplest way to create free forms',
   E'Tally is a form builder that works like a text document. Create unlimited forms and surveys for free, with powerful features and no coding required.\n\nHighlights:\n• Free & unlimited forms\n• Works like a doc — just type\n• Logic jumps & calculations\n• Payments and integrations',
   'https://tally.so', 'tally_so', '/logos/tally.svg', array['/covers/tally.svg'],
   'No-Code', 377, 4490, false, false, null, now() - interval '7 days'),

  ('prod-framer', 'Framer', 'The web builder for stunning, no-code sites',
   E'Framer lets you design and publish professional websites without code. Start from a template or a blank canvas, add interactions, and ship to a custom domain in minutes.\n\nHighlights:\n• Design and publish in one place\n• Powerful interactions & animations\n• CMS and SEO built in\n• Templates for every use case',
   'https://framer.com', 'framer', '/logos/framer.svg', array['/covers/framer.svg'],
   'Design', 342, 4120, false, false, null, now() - interval '8 days'),

  ('prod-warp', 'Warp', 'The intelligent terminal for the 21st century',
   E'Warp is a modern, Rust-based terminal with AI built in. Edit commands like a code editor, share workflows with your team, and get AI help right in your shell.\n\nHighlights:\n• Blocks, not endless scrollback\n• AI command search & suggestions\n• Modern text editing\n• Shareable workflows',
   'https://www.warp.dev', 'warpdotdev', '/logos/warp.svg', array['/covers/warp.svg'],
   'Developer Tools', 298, 3410, false, false, 'Free plan available', now() - interval '9 days');

insert into public.comments (product_id, author, avatar_url, body, created_at)
values
  ('prod-linear', 'Maya Chen', 'https://ui-avatars.com/api/?name=Maya+Chen&background=6d28d9&color=fff',
   E'The keyboard shortcuts alone changed how our team ships. Congrats on the launch! 🚀', now() - interval '2 hours'),
  ('prod-linear', 'Devon Okafor', 'https://ui-avatars.com/api/?name=Devon+Okafor&background=2563eb&color=fff',
   E'Fastest issue tracker I''ve ever used. The triage view is chef''s kiss.', now() - interval '1 hour'),
  ('prod-supabase', 'Priya Nair', 'https://ui-avatars.com/api/?name=Priya+Nair&background=db2777&color=fff',
   E'Shipped my SaaS in a weekend with this. Auth + Postgres + storage in one place is unreal.', now() - interval '20 hours');
