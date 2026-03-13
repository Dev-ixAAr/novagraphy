'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createMvArtwork(formData: FormData) {
  const title = formData.get('title') as string;
  const artist = formData.get('artist') as string;
  const img = formData.get('img') as string;
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

  await prisma.mvArtwork.create({
    data: {
      title,
      artist,
      img,
      sortOrder,
    },
  });

  revalidatePath('/admin/mv-artworks');
  redirect('/admin/mv-artworks');
}

export async function deleteMvArtwork(id: string) {
  try {
    await prisma.mvArtwork.delete({
      where: { id },
    });
    revalidatePath('/admin/mv-artworks');
  } catch (error) {
    console.error('Failed to delete artwork:', error);
  }
}