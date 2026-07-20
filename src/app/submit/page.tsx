import type { Metadata } from "next";
import { Rocket } from "lucide-react";

import { SubmitForm } from "@/components/submit-form";

export const metadata: Metadata = {
  title: "Launch your product",
  description:
    "Submit your product to SparkLaunch and reach thousands of makers in one click.",
};

export default function SubmitPage() {
  return (
    <div className="relative">
      <div className="spark-glow pointer-events-none absolute inset-0 h-64" />
      <div className="container relative max-w-2xl py-12">
        <div className="text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-600/30">
            <Rocket className="h-6 w-6" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Launch your product
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Fill in the details below and go live to thousands of makers. It
            takes about two minutes.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur sm:p-8">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
}
