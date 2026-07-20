import Link from "next/link";
import { ArrowRight, Crown, Rocket, ShieldCheck, Zap } from "lucide-react";

import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { ProductCard } from "@/components/product-card";
import { CategoryShowcase } from "@/components/category-showcase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProduct, getProducts } from "@/lib/products";

export default async function HomePage() {
  const [featured, trending] = await Promise.all([
    getFeaturedProduct(),
    getProducts({ sort: "trending" }),
  ]);

  const topSix = trending.filter((p) => p.id !== featured?.id).slice(0, 6);

  return (
    <>
      <Hero />

      {/* Product of the day */}
      {featured && (
        <section className="container py-16 md:py-20">
          <div className="mb-6 flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Product of the Day
            </p>
          </div>

          <Link
            href={`/product/${featured.id}`}
            className="group grid overflow-hidden rounded-2xl border border-border/60 bg-card md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
              {featured.screenshots[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.screenshots[0]}
                  alt={featured.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
              <div className="flex items-center gap-3">
                {featured.logo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.logo_url}
                    alt=""
                    className="h-12 w-12 rounded-xl border border-border/60 object-cover"
                  />
                )}
                <Badge variant="featured">Featured</Badge>
              </div>
              <h3 className="font-display text-3xl font-medium tracking-tight group-hover:text-primary">
                {featured.name}
              </h3>
              <p className="text-lg text-muted-foreground">{featured.tagline}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                View launch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      <CategoryShowcase products={trending} />

      {/* Trending grid */}
      <section id="trending" className="container scroll-mt-20 py-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Hand-picked today
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Trending launches
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/feed">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {topSix.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="container py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Launch in one click",
              body: "No waitlist, no gatekeepers. Submit your product and go live to thousands of makers instantly.",
            },
            {
              icon: Rocket,
              title: "Built-in distribution",
              body: "Tap into a community of 30,000+ founders and early adopters actively hunting for new tools.",
            },
            {
              icon: ShieldCheck,
              title: "Everything included",
              body: "Upvotes, comments, deals, analytics, and a featured slot — all in one beautiful platform.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border/60 bg-card p-8"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-amber-500/5 to-transparent p-10 text-center md:p-16">
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Ready to get your first thousand users?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of makers who launched with SparkLaunch. It&apos;s
              free to start.
            </p>
            <Button asChild size="xl" variant="gradient" className="mt-8">
              <Link href="/submit">
                <Rocket className="h-5 w-5" />
                Launch for Free
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
