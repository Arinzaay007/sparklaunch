import Link from "next/link";
import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="spark-gradient-text text-7xl font-black">404</span>
      <h1 className="mt-4 text-2xl font-bold">This page hasn&apos;t launched</h1>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or moved.
      </p>
      <Button asChild variant="gradient" className="mt-6">
        <Link href="/">
          <Rocket className="h-4 w-4" />
          Back home
        </Link>
      </Button>
    </div>
  );
}
