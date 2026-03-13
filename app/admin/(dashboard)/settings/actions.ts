'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveSetting(formData: FormData) {
  const key = formData.get('key') as string;
  const value = formData.get('value') as string;

  if (!key || !value) return;

  // Use Upsert: Update if key exists, Create if it doesn't
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath('/admin/settings');
}

export async function deleteSetting(id: string) {
  try {
    await prisma.siteSetting.delete({
      where: { id },
    });
    revalidatePath('/admin/settings');
  } catch (error) {
    console.error('Failed to delete setting:', error);
  }
}