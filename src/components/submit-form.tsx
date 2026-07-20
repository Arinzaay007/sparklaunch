"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Rocket, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { addLocalProduct } from "@/lib/local-store";
import { CATEGORIES } from "@/lib/types";
import { slugify } from "@/lib/utils";

const MAX_SHOTS = 3;

export function SubmitForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [shotPreviews, setShotPreviews] = React.useState<string[]>([]);
  const [shotFiles, setShotFiles] = React.useState<File[]>([]);
  const [category, setCategory] = React.useState<string>("");

  function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  function onShots(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      MAX_SHOTS - shotFiles.length
    );
    if (files.length === 0) return;
    setShotFiles((prev) => [...prev, ...files].slice(0, MAX_SHOTS));
    setShotPreviews((prev) =>
      [...prev, ...files.map((f) => URL.createObjectURL(f))].slice(0, MAX_SHOTS)
    );
  }

  function removeShot(i: number) {
    setShotFiles((prev) => prev.filter((_, idx) => idx !== i));
    setShotPreviews((prev) => prev.filter((_, idx) => idx !== i));
  }

  /** Upload a file to Supabase storage and return its public URL. */
  async function uploadToStorage(
    supabase: NonNullable<ReturnType<typeof createClient>>,
    file: File,
    prefix: string
  ): Promise<string | null> {
    const ext = file.name.split(".").pop() || "png";
    const path = `${prefix}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("product-assets")
      .upload(path, file, { upsert: false });
    if (error) {
      console.warn("Upload failed:", error.message);
      return null;
    }
    const { data } = supabase.storage
      .from("product-assets")
      .getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = String(form.get("name") || "").trim();
    const tagline = String(form.get("tagline") || "").trim();
    const description = String(form.get("description") || "").trim();
    const url = String(form.get("url") || "").trim();
    const twitter = String(form.get("twitter") || "")
      .trim()
      .replace(/^@/, "");

    if (!name || !tagline || !description || !url || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    const id = `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;

    const supabase = createClient();
    let logo_url: string | null = logoPreview;
    let screenshots: string[] = shotPreviews;

    // When Supabase is configured, upload assets and persist the row.
    if (supabase) {
      if (logoFile) {
        logo_url = (await uploadToStorage(supabase, logoFile, "logos")) ?? null;
      }
      const uploaded: string[] = [];
      for (const f of shotFiles) {
        const u = await uploadToStorage(supabase, f, "screenshots");
        if (u) uploaded.push(u);
      }
      if (uploaded.length) screenshots = uploaded;

      const { error } = await supabase.from("products").insert({
        id,
        name,
        tagline,
        description,
        url,
        twitter: twitter || null,
        logo_url,
        screenshots,
        category,
        upvotes: 1,
        views: 0,
        featured: false,
        product_of_the_day: false,
        deal: null,
      });

      if (error) {
        console.warn("Insert failed, falling back to local:", error.message);
        toast.message("Saved locally (demo mode)");
        addLocalProduct({
          id,
          name,
          tagline,
          description,
          url,
          twitter: twitter || null,
          logo_url,
          screenshots,
          category,
        });
      }
    } else {
      // Demo mode: keep it in localStorage so the feed/detail pages can show it.
      addLocalProduct({
        id,
        name,
        tagline,
        description,
        url,
        twitter: twitter || null,
        logo_url,
        screenshots,
        category,
      });
    }

    toast.success("🚀 Launched!");
    router.push(`/success?name=${encodeURIComponent(name)}&id=${id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">
          Product name <span className="text-destructive">*</span>
        </Label>
        <Input id="name" name="name" placeholder="Nebula AI" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tagline">
          Tagline <span className="text-destructive">*</span>
        </Label>
        <Input
          id="tagline"
          name="tagline"
          placeholder="Your second brain, powered by AI"
          maxLength={90}
          required
        />
        <p className="text-xs text-muted-foreground">
          A short, punchy one-liner (max 90 chars).
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">
          Full description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Tell makers what your product does, who it's for, and why it's great…"
          className="min-h-[140px]"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="url">
            Website URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="url"
            name="url"
            type="url"
            placeholder="https://yourproduct.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="twitter">Twitter / X handle</Label>
          <Input id="twitter" name="twitter" placeholder="@yourhandle" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>
          Category <span className="text-destructive">*</span>
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Logo upload */}
      <div className="grid gap-2">
        <Label>Logo</Label>
        <div className="flex items-center gap-4">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card/40">
            {logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoPreview}
                alt="Logo preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <label className="cursor-pointer">
            <span className="inline-flex h-9 items-center gap-2 rounded-md border border-input px-4 text-sm font-medium transition-colors hover:bg-accent">
              <Upload className="h-4 w-4" />
              Upload logo
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onLogo}
            />
          </label>
        </div>
      </div>

      {/* Screenshots upload */}
      <div className="grid gap-2">
        <Label>Screenshots (up to {MAX_SHOTS})</Label>
        <div className="flex flex-wrap gap-3">
          {shotPreviews.map((src, i) => (
            <div
              key={i}
              className="relative h-24 w-36 overflow-hidden rounded-lg border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeShot(i)}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                aria-label="Remove screenshot"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {shotPreviews.length < MAX_SHOTS && (
            <label className="flex h-24 w-36 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-card/40 text-xs text-muted-foreground transition-colors hover:bg-accent">
              <ImagePlus className="h-5 w-5" />
              Add screenshot
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onShots}
              />
            </label>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="xl"
        className="w-full"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Launching…
          </>
        ) : (
          <>
            <Rocket className="h-5 w-5" />
            Launch Now
          </>
        )}
      </Button>
    </form>
  );
}
