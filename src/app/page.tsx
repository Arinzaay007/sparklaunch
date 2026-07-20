import Link from "next/link";
import { ArrowRight, Crown, Rocket, ShieldCheck, Zap } from "lucide-react";

import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProduct, getProducts } from "@/lib/products";

export default async function HomePage() {
  const [featured, trending] = await Promise.all([
    getFeaturedProduct(),
    getProducts({ sort: "trending" }),
  ]);

  const topSix = trending
    .filter((p) => p.id !== featured?.id)
    .slice(0, 6);

  return (
    <>
      <Hero />

      {/* Product of the day */}
      {featured && (
        <section className="container py-16">
          <div className="mb-6 flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <h2 className="text-2xl font-bold tracking-tight">
              Product of the Day
            </h2>
          </div>

          <Link
            href={`/product/${featured.id}`}
            className="group grid overflow-hidden rounded-2xl border border-border/60 bg-card/50 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
              {featured.screenshots[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.screenshots[0]}
                  alt={featured.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-4 p-8">
              <div className="flex items-center gap-3">
                {featured.logo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.logo_url}
                    alt=""
                    className="h-12 w-12 rounded-xl border border-border/60 object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary">
                    {featured.name}
                  </h3>
                  <Badge variant="featured" className="mt-1">
                    Featured
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{featured.tagline}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                View launch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Trending grid */}
      <section id="trending" className="scroll-mt-20 container py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Trending launches
          </h2>
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
      <section className="container py-16">
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
              className="rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-transparent p-10 text-center md:p-16">
          <div className="spark-glow pointer-events-none absolute inset-0" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
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
