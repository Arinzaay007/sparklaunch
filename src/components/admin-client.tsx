"use client";

import * as React from "react";
import { Crown, Eye, Lock, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getLocalProducts } from "@/lib/local-store";
import { ADMIN_PASSWORD } from "@/lib/env";
import type { Product } from "@/lib/types";
import { formatCompact } from "@/lib/utils";

export function AdminClient({ initial }: { initial: Product[] }) {
  const [authed, setAuthed] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>(initial);

  // Merge any locally-submitted products (demo mode) once mounted.
  React.useEffect(() => {
    if (!authed) return;
    const local = getLocalProducts();
    if (local.length) {
      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        return [...local.filter((p) => !ids.has(p.id)), ...prev];
      });
    }
  }, [authed]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      toast.success("Welcome back, admin 👋");
    } else {
      toast.error("Incorrect password");
    }
  }

  async function patch(id: string, changes: Partial<Product>) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...changes } : p))
    );
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase
        .from("products")
        .update(changes)
        .eq("id", id);
      if (error) console.warn("Admin update failed:", error.message);
    }
  }

  function toggleFeatured(p: Product) {
    patch(p.id, { featured: !p.featured });
    toast.success(p.featured ? "Removed from featured" : "Marked as featured");
  }

  async function setProductOfDay(p: Product) {
    // Only one product of the day at a time.
    setProducts((prev) =>
      prev.map((x) => ({ ...x, product_of_the_day: x.id === p.id }))
    );
    const supabase = createClient();
    if (supabase) {
      await supabase
        .from("products")
        .update({ product_of_the_day: false })
        .neq("id", p.id);
      await supabase
        .from("products")
        .update({ product_of_the_day: true, featured: true })
        .eq("id", p.id);
    }
    toast.success(`${p.name} is now Product of the Day 👑`);
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm py-20">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle>Admin access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="pw">Password</Label>
                <Input
                  id="pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Demo password: <code className="font-mono">{ADMIN_PASSWORD}</code>
                </p>
              </div>
              <Button type="submit" className="w-full">
                Unlock dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalUpvotes = products.reduce((s, p) => s + p.upvotes, 0);
  const totalViews = products.reduce((s, p) => s + p.views, 0);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Admin dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Manage submissions, feature products, and crown the Product of the Day.
      </p>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard label="Products" value={String(products.length)} icon={Star} />
        <SummaryCard
          label="Featured"
          value={String(products.filter((p) => p.featured).length)}
          icon={Crown}
        />
        <SummaryCard
          label="Total upvotes"
          value={formatCompact(totalUpvotes)}
          icon={TrendingUp}
        />
        <SummaryCard
          label="Total views"
          value={formatCompact(totalViews)}
          icon={Eye}
        />
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card/60 text-left text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="hidden p-4 font-medium sm:table-cell">Category</th>
              <th className="hidden p-4 font-medium md:table-cell">Upvotes</th>
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {p.logo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo_url}
                        alt=""
                        className="h-9 w-9 rounded-lg object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">{p.name}</span>
                        {p.product_of_the_day && (
                          <Badge variant="featured">#1</Badge>
                        )}
                        {p.featured && !p.product_of_the_day && (
                          <Badge variant="gradient">Featured</Badge>
                        )}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {p.tagline}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden p-4 sm:table-cell">
                  <Badge variant="secondary">{p.category}</Badge>
                </td>
                <td className="hidden p-4 md:table-cell">{p.upvotes}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant={p.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(p)}
                    >
                      <Star className="h-3.5 w-3.5" />
                      {p.featured ? "Featured" : "Feature"}
                    </Button>
                    <Button
                      variant={p.product_of_the_day ? "gradient" : "outline"}
                      size="sm"
                      onClick={() => setProductOfDay(p)}
                    >
                      <Crown className="h-3.5 w-3.5" />
                      Day
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
