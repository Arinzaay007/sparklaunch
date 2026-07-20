"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Rocket, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandPalette } from "@/components/command-palette-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/feed", label: "Explore" },
  { href: "/deals", label: "Deals" },
  { href: "/submit", label: "Submit" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openPalette } = useCommandPalette();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-600/30">
            <Rocket className="h-4 w-4 text-white" />
          </span>
          <span className="text-lg tracking-tight">SparkLaunch</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === l.href && "text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search launches"
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <Search className="h-4 w-4" />
            <span>Search…</span>
            <kbd className="ml-2 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          <Button asChild variant="gradient" size="sm">
            <Link href="/submit">
              <Rocket className="h-4 w-4" />
              Launch for Free
            </Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search launches"
            onClick={openPalette}
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  pathname === l.href && "bg-accent text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="gradient" className="mt-2 w-full">
              <Link href="/submit">
                <Rocket className="h-4 w-4" />
                Launch for Free
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
