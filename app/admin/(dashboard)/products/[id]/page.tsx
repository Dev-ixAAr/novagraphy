import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';

// ─────────────────────────────────────────────
// Server Component — Fetches product + relations
// ─────────────────────────────────────────────
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      colors: { orderBy: { sortOrder: 'asc' } },
      sizes: { orderBy: { sortOrder: 'asc' } },
    },
  });

  if (!product) notFound();

  return <EditProductForm product={product} />;
}