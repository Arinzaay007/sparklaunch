import * as React from "react";
import type { Metadata } from "next";

import { SuccessClient } from "@/components/success-client";

export const metadata: Metadata = {
  title: "Launched!",
  description: "Your product is now live on SparkLaunch.",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <React.Suspense fallback={<div className="container py-24" />}>
      <SuccessClient />
    </React.Suspense>
  );
}
