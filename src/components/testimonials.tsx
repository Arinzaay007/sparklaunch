"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "We hit #1 on launch day and picked up 2,300 signups in 48 hours. SparkLaunch paid for itself before lunch.",
    name: "Maya Chen",
    role: "Founder, Nebula AI",
    color: "6d28d9",
  },
  {
    quote:
      "The reach is unreal. I've launched on every platform and nothing converts like this community of makers.",
    name: "Devon Okafor",
    role: "Solo dev, ShipFast Kit",
    color: "2563eb",
  },
  {
    quote:
      "Clean, fast, and the featured badge sent our traffic through the roof. Easily worth it for any indie hacker.",
    name: "Priya Nair",
    role: "Maker, Palette Studio",
    color: "db2777",
  },
  {
    quote:
      "Got my first paying customer within an hour of launching. The momentum from day one was exactly what we needed.",
    name: "Liam Torres",
    role: "CEO, Metricly",
    color: "0891b2",
  },
];

export function Testimonials() {
  const [index, setIndex] = React.useState(0);

  const go = React.useCallback((dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go]);

  const t = testimonials[index];

  return (
    <section className="container py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by makers everywhere
        </h2>
        <p className="mt-3 text-muted-foreground">
          Thousands of founders have launched with SparkLaunch.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="relative rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur md:p-12">
          <Quote className="absolute right-8 top-8 h-10 w-10 text-primary/15" />
          <p
            key={index}
            className="animate-fade-up text-pretty text-xl font-medium leading-relaxed md:text-2xl"
          >
            “{t.quote}”
          </p>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    t.name
                  )}&background=${t.color}&color=fff`}
                  alt={t.name}
                />
                <AvatarFallback>{t.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next testimonial"
                onClick={() => go(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
