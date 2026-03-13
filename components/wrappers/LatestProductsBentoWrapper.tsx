import { LatestProductsBento } from "@/components/LatestProductsBento";
import { getProducts } from "@/lib/actions/products";

export default async function LatestProductsBentoWrapper() {
  const products = await getProducts();
  return <LatestProductsBento products={products} />;
}
