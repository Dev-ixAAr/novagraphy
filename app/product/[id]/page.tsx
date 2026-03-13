// app/product/[id]/page.tsx
// ✅ Server Component
import { getProductById, getProducts } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./product-detail-client";

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}