/**
 * Centralized environment access. SparkLaunch is designed to run even without
 * Supabase configured — in that case it falls back to in-memory seed data so
 * the demo works out-of-the-box.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "sparklaunch";

/** True only when both Supabase env vars are present and non-empty. */
export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
