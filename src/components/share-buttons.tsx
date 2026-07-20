"use client";

import * as React from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ShareButtons({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const [url, setUrl] = React.useState(path);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}${path}`);
    }
  }, [path]);

  const text = encodeURIComponent(`${title} just launched on SparkLaunch! 🚀`);
  const encodedUrl = encodeURIComponent(url);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <Twitter className="h-4 w-4" />
          Twitter / X
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" size="sm" onClick={copy}>
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
