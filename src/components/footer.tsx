import Link from "next/link";
import { Github, Rocket, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex items-center gap-2 font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Rocket className="h-3.5 w-3.5 text-white" />
          </span>
          SparkLaunch
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/feed" className="hover:text-foreground">
            Explore
          </Link>
          <Link href="/deals" className="hover:text-foreground">
            Deals
          </Link>
          <Link href="/submit" className="hover:text-foreground">
            Submit
          </Link>
          <Link href="/admin" className="hover:text-foreground">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-muted-foreground">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SparkLaunch. Launch your product. Reach
        thousands of makers.
      </div>
    </footer>
  );
}
