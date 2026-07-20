"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import type { Comment } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

export function Comments({
  productId,
  initial,
}: {
  productId: string;
  initial: Comment[];
}) {
  const [comments, setComments] = React.useState<Comment[]>(initial);
  const [name, setName] = React.useState("");
  const [body, setBody] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    setSubmitting(true);
    const author = name.trim() || "Anonymous Maker";
    const optimistic: Comment = {
      id: `local-${Date.now()}`,
      product_id: productId,
      author,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        author
      )}&background=6d28d9&color=fff`,
      body: body.trim(),
      created_at: new Date().toISOString(),
    };

    setComments((c) => [optimistic, ...c]);
    setBody("");

    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("comments").insert({
        product_id: productId,
        author,
        avatar_url: optimistic.avatar_url,
        body: optimistic.body,
      });
      if (error) console.warn("Comment persist failed:", error.message);
    }

    toast.success("Comment posted 🎉");
    setSubmitting(false);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">
        Discussion{" "}
        <span className="text-muted-foreground">({comments.length})</span>
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <Input
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />
        <Textarea
          placeholder="Share your thoughts or congratulate the maker…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={500}
          required
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting || !body.trim()}>
            <Send className="h-4 w-4" />
            {submitting ? "Posting…" : "Post comment"}
          </Button>
        </div>
      </form>

      <div className="mt-8 space-y-6">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Be the first to comment on this launch.
          </p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar className="h-9 w-9">
              {c.avatar_url && <AvatarImage src={c.avatar_url} alt={c.author} />}
              <AvatarFallback>{c.author[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{c.author}</span>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(c.created_at)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
