// app/product/[id]/page.tsx
// ✅ Server Component
import type { Metadata } from "next";
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

// Dynamic SEO metadata per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: `[INSERT_PRODUCT_DESCRIPTION_PREFIX] ${product.title}`,
    openGraph: {
      title: `${product.title} | NOVAGRAPHY`,
      description: `[INSERT_PRODUCT_OG_DESCRIPTION_PREFIX] ${product.title}`,
      images: product.image
        ? [{ url: product.image, width: 1200, height: 630, alt: product.title }]
        : [],
    },
  };
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