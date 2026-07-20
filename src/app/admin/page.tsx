import type { Metadata } from "next";

import { AdminClient } from "@/components/admin-client";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage SparkLaunch submissions.",
  robots: { index: false },
};

export default async function AdminPage() {
  const products = await getProducts({ sort: "top" });

  return (
    <div className="container">
      <AdminClient initial={products} />
    </div>
  );
}
