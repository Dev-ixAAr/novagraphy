'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// =============================================
// CREATE PACKAGE
// =============================================
export async function createPackage(formData: FormData) {
  const title = formData.get('title') as string;
  const price = formData.get('price') as string;
  const category = formData.get('category') as string;

  // Parse the features JSON from the hidden input
  const featuresRaw = formData.get('featuresData') as string | null;
  const features: string[] = featuresRaw
    ? (JSON.parse(featuresRaw) as string[]).filter((f) => f.trim() !== '')
    : [];

  await prisma.servicePackage.create({
    data: {
      title,
      price,
      category,
      features,
    },
  });

  revalidatePath('/admin/packages');
  redirect('/admin/packages');
}

// =============================================
// UPDATE PACKAGE
// =============================================
export async function updatePackage(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const price = formData.get('price') as string;
  const category = formData.get('category') as string;

  const featuresRaw = formData.get('featuresData') as string | null;
  const features: string[] = featuresRaw
    ? (JSON.parse(featuresRaw) as string[]).filter((f) => f.trim() !== '')
    : [];

  await prisma.servicePackage.update({
    where: { id },
    data: {
      title,
      price,
      category,
      features,
    },
  });

  revalidatePath('/admin/packages');
  redirect('/admin/packages');
}

// =============================================
// DELETE PACKAGE
// =============================================
export async function deletePackage(id: string) {
  await prisma.servicePackage.delete({ where: { id } });
  revalidatePath('/admin/packages');
}
