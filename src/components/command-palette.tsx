"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Compass,
  CornerDownLeft,
  Loader2,
  Rocket,
  Search,
  Tag,
  TrendingUp,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useCommandPalette } from "@/components/command-palette-context";
import { getLocalProducts } from "@/lib/local-store";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo_url: string | null;
  upvotes: number;
  deal: string | null;
}

interface NavAction {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  keywords: string;
}

const NAV_ACTIONS: NavAction[] = [
  { id: "nav-feed", label: "Explore launches", href: "/feed", icon: Compass, keywords: "feed explore browse discover products" },
  { id: "nav-deals", label: "Browse deals", href: "/deals", icon: Tag, keywords: "deals discounts offers coupons" },
  { id: "nav-submit", label: "Submit a product", href: "/submit", icon: Rocket, keywords: "submit launch new create post" },
  { id: "nav-trending", label: "Trending today", href: "/#trending", icon: TrendingUp, keywords: "trending hot popular top" },
];

const RECENT_KEY = "sparklaunch:recent-searches";

function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function pushRecent(term: string) {
  if (typeof window === "undefined" || !term.trim()) return;
  try {
    const next = [term, ...getRecent().filter((t) => t !== term)].slice(0, 5);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export function CommandPalette() {
  const router = useRouter();
  const { open, setOpen, toggle } = useCommandPalette();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [recent, setRecent] = React.useState<string[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Global ⌘K / Ctrl+K listener + "/" quick-open when not typing in a field.
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
        return;
      }
      if (
        e.key === "/" &&
        !open &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(
          (e.target as HTMLElement)?.tagName ?? ""
        ) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, toggle, setOpen]);

  // Reset transient state whenever the palette opens.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setRecent(getRecent());
    }
  }, [open]);

  // Debounced search: hits the API and merges any local demo submissions.
  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const controller = new AbortController();
    const q = query.trim();

    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}`,
          { signal: controller.signal }
        );
        const data = (await res.json()) as { results: SearchResult[] };
        if (cancelled) return;

        const merged = mergeLocal(data.results, q);
        setResults(merged);
        setActive(0);
      } catch (err) {
        if (!cancelled && (err as Error).name !== "AbortError") {
          setResults(mergeLocal([], q));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 160);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(t);
    };
  }, [query, open]);

  // Filtered nav actions (only shown when the query matches or is empty).
  const navMatches = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_ACTIONS;
    return NAV_ACTIONS.filter(
      (a) =>
        a.label.toLowerCase().includes(q) || a.keywords.includes(q)
    );
  }, [query]);

  // Flat list of selectable items for keyboard navigation.
  const flat = React.useMemo(
    () => [
      ...navMatches.map((a) => ({ type: "nav" as const, action: a })),
      ...results.map((r) => ({ type: "product" as const, product: r })),
    ],
    [navMatches, results]
  );

  const go = React.useCallback(
    (href: string) => {
      if (query.trim()) pushRecent(query.trim());
      setOpen(false);
      router.push(href);
    },
    [query, router]
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[active];
      if (!item) {
        if (query.trim()) go(`/feed?q=${encodeURIComponent(query.trim())}`);
        return;
      }
      if (item.type === "nav") go(item.action.href);
      else go(`/product/${item.product.id}`);
    }
  }

  // Keep the active row scrolled into view.
  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const showEmpty = !loading && query.trim() && flat.length === 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="top-[15%] max-w-xl translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Search SparkLaunch</DialogTitle>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border/60 px-4">
          {loading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
          ) : (
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search launches or jump to…"
            aria-label="Search launches"
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
          {/* Recent searches (only when empty) */}
          {!query.trim() && recent.length > 0 && (
            <Section label="Recent">
              {recent.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Search className="h-3.5 w-3.5" />
                  {term}
                </button>
              ))}
            </Section>
          )}

          {/* Navigation actions */}
          {navMatches.length > 0 && (
            <Section label={query.trim() ? "Jump to" : "Quick actions"}>
              {navMatches.map((a, i) => {
                const idx = i;
                return (
                  <Row
                    key={a.id}
                    index={idx}
                    active={active === idx}
                    onHover={() => setActive(idx)}
                    onClick={() => go(a.href)}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-foreground">
                      <a.icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 truncate">{a.label}</span>
                    <CornerDownLeft
                      className={cn(
                        "h-3.5 w-3.5 text-muted-foreground opacity-0",
                        active === idx && "opacity-100"
                      )}
                    />
                  </Row>
                );
              })}
            </Section>
          )}

          {/* Product results */}
          {results.length > 0 && (
            <Section label="Launches">
              {results.map((p, i) => {
                const idx = navMatches.length + i;
                return (
                  <Row
                    key={p.id}
                    index={idx}
                    active={active === idx}
                    onHover={() => setActive(idx)}
                    onClick={() => go(`/product/${p.id}`)}
                  >
                    {p.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo_url}
                        alt=""
                        className="h-8 w-8 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                        <Rocket className="h-4 w-4" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-medium">{p.name}</span>
                        {p.deal && (
                          <Badge variant="deal" className="shrink-0">
                            {p.deal}
                          </Badge>
                        )}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {p.tagline}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {p.upvotes}
                    </span>
                  </Row>
                );
              })}
            </Section>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-muted-foreground">
                <Search className="h-5 w-5" />
              </span>
              <div className="text-sm text-muted-foreground">
                No results for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{query.trim()}&rdquo;
                </span>
              </div>
              <button
                onClick={() => go(`/feed?q=${encodeURIComponent(query.trim())}`)}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Search the full feed
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between gap-4 border-t border-border/60 px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-3">
            <Hint keys={["↑", "↓"]}>navigate</Hint>
            <Hint keys={["↵"]}>open</Hint>
            <Hint keys={["esc"]}>close</Hint>
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            <Rocket className="h-3 w-3" />
            SparkLaunch
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Merge server results with local demo submissions, de-duped, filtered by q. */
function mergeLocal(serverResults: SearchResult[], q: string): SearchResult[] {
  const local = getLocalProducts();
  if (!local.length) return serverResults;

  const term = q.toLowerCase();
  const ids = new Set(serverResults.map((r) => r.id));

  const localMatches = local
    .filter((p) => !ids.has(p.id))
    .filter(
      (p) =>
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.tagline.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
    .map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      logo_url: p.logo_url,
      upvotes: p.upvotes,
      deal: p.deal,
    }));

  return [...localMatches, ...serverResults].slice(0, 8);
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-1">
      <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

function Row({
  index,
  active,
  onHover,
  onClick,
  children,
}: {
  index: number;
  active: boolean;
  onHover: () => void;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      data-index={index}
      onMouseMove={onHover}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        active ? "bg-accent text-foreground" : "text-foreground/90"
      )}
    >
      {children}
    </button>
  );
}

function Hint({ keys, children }: { keys: string[]; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1">
      {keys.map((k) => (
        <kbd
          key={k}
          className="rounded border border-border/60 px-1 py-0.5 text-[10px] font-medium"
        >
          {k}
        </kbd>
      ))}
      {children}
    </span>
  );
}
