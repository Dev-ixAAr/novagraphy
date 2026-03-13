// app/shop/page.tsx
// ✅ Server Component — NO "use client"
import { getProducts } from "@/lib/actions/products";
import ShopContent from "./shop-content";

export const metadata = {
  title: "Shop | Novagraphy",
  description: "Premium streetwear and accessories",
};

export default async function ShopPage() {
  // 🔥 Database query — runs on server
  const products = await getProducts();

  return <ShopContent products={products} />;
}