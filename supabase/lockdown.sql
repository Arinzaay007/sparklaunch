-- SparkLaunch — production lockdown
-- Makes the anon/publishable key READ-ONLY. Visitors can still browse every
-- product, comment, and asset, but nobody can write to your database with the
-- browser key. The app degrades gracefully: submits, upvotes, and comments
-- fall back to the visitor's own localStorage, so the UX stays intact.
--
-- Run this in the Supabase SQL editor AFTER schema.sql (and seed.sql).
-- To re-open writes later (e.g. once real auth is added), re-run schema.sql.

-- Clean up any leftover verification/probe rows -----------------------------
delete from public.products where id = 'lockdown-probe';

-- Products: drop write policies, keep public read ---------------------------
drop policy if exists "anyone can insert products" on public.products;
drop policy if exists "anyone can update products" on public.products;
-- (kept) "products are readable by everyone" — select using (true)

-- Comments: drop write policy, keep public read -----------------------------
drop policy if exists "anyone can insert comments" on public.comments;
-- (kept) "comments are readable by everyone" — select using (true)

-- Storage: drop upload policy, keep public read -----------------------------
drop policy if exists "anyone can upload product-assets" on storage.objects;
-- (kept) "public read product-assets" — select using bucket_id = 'product-assets'

-- Verify: list the policies that remain (should be reads only) ---------------
select schemaname, tablename, policyname, cmd
from pg_policies
where schemaname in ('public', 'storage')
  and tablename in ('products', 'comments', 'profiles', 'objects')
order by tablename, cmd;
