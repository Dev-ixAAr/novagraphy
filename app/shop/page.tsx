// app/shop/page.tsx
// ✅ Server Component — NO "use client"
import type { Metadata } from "next";
import { getProducts } from "@/lib/actions/products";
import ShopContent from "./shop-content";

export const metadata: Metadata = {
  title: "[INSERT_SHOP_TITLE]",
  description: "[INSERT_SHOP_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_SHOP_OG_TITLE]",
    description: "[INSERT_SHOP_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_SHOP_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_SHOP_OG_IMAGE_ALT]" }],
  },
};

export default async function ShopPage() {
  // 🔥 Database query — runs on server
  const products = await getProducts();

  return <ShopContent products={products} />;
}