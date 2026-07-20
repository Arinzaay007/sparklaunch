-- SparkLaunch — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`) to set up the
-- backend. The app works without this (demo mode), but this enables real
-- persistence for products, comments, upvotes, and file uploads.

-- Extensions -----------------------------------------------------------------
create extension if not exists "pgcrypto";

-- Products -------------------------------------------------------------------
create table if not exists public.products (
  id                text primary key default gen_random_uuid()::text,
  name              text not null,
  tagline           text not null,
  description       text not null default '',
  url               text not null,
  twitter           text,
  logo_url          text,
  screenshots       text[] not null default '{}',
  category          text not null,
  upvotes           integer not null default 1,
  views             integer not null default 0,
  featured          boolean not null default false,
  product_of_the_day boolean not null default false,
  deal              text,
  user_id           uuid references auth.users (id) on delete set null,
  created_at        timestamptz not null default now()
);

create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists products_upvotes_idx on public.products (upvotes desc);
create index if not exists products_category_idx on public.products (category);

-- Comments -------------------------------------------------------------------
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  product_id  text not null references public.products (id) on delete cascade,
  author      text not null default 'Anonymous Maker',
  avatar_url  text,
  body        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists comments_product_id_idx on public.comments (product_id, created_at desc);

-- Profiles (optional, for authenticated makers) ------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text unique,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

-- Row Level Security ---------------------------------------------------------
-- This demo uses permissive policies so the anon key can read/write. Tighten
-- these before any real production use.
alter table public.products enable row level security;
alter table public.comments enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "products are readable by everyone" on public.products;
create policy "products are readable by everyone"
  on public.products for select using (true);

drop policy if exists "anyone can insert products" on public.products;
create policy "anyone can insert products"
  on public.products for insert with check (true);

drop policy if exists "anyone can update products" on public.products;
create policy "anyone can update products"
  on public.products for update using (true) with check (true);

drop policy if exists "comments are readable by everyone" on public.comments;
create policy "comments are readable by everyone"
  on public.comments for select using (true);

drop policy if exists "anyone can insert comments" on public.comments;
create policy "anyone can insert comments"
  on public.comments for insert with check (true);

drop policy if exists "profiles are readable by everyone" on public.profiles;
create policy "profiles are readable by everyone"
  on public.profiles for select using (true);

-- Storage bucket for logos + screenshots -------------------------------------
insert into storage.buckets (id, name, public)
values ('product-assets', 'product-assets', true)
on conflict (id) do nothing;

drop policy if exists "public read product-assets" on storage.objects;
create policy "public read product-assets"
  on storage.objects for select
  using (bucket_id = 'product-assets');

drop policy if exists "anyone can upload product-assets" on storage.objects;
create policy "anyone can upload product-assets"
  on storage.objects for insert
  with check (bucket_id = 'product-assets');
