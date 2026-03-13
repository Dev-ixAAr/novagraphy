import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditPackageForm from './EditPackageForm';

// ─────────────────────────────────────────────
// Server Component — Fetches package by ID
// ─────────────────────────────────────────────
export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pkg = await prisma.servicePackage.findUnique({
    where: { id },
  });

  if (!pkg) notFound();

  return <EditPackageForm pkg={pkg} />;
}
