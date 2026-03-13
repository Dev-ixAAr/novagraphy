'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createMvArtwork(formData: FormData) {
  const title = formData.get('title') as string;
  const artist = formData.get('artist') as string;
  const img = formData.get('img') as string;

  const maxItem = await prisma.portfolioItem.findFirst({
    where: { category: 'mv-artworks' },
    orderBy: { sortOrder: 'desc' },
  });
  const nextSortOrder = maxItem ? maxItem.sortOrder + 1 : 0;

  await prisma.portfolioItem.create({
    data: {
      title,
      subtitle: artist,
      image: img,
      category: 'mv-artworks',
      sortOrder: nextSortOrder,
    },
  });

  revalidatePath('/', 'layout');
  revalidatePath('/portfolio');
  revalidatePath('/admin/mv-artworks');
  redirect('/admin/mv-artworks');
}

export async function deleteMvArtwork(id: string) {
  try {
    await prisma.portfolioItem.delete({
      where: { id },
    });
    revalidatePath('/', 'layout');
    revalidatePath('/portfolio');
    revalidatePath('/admin/mv-artworks');
  } catch (error) {
    console.error('Failed to delete artwork:', error);
  }
}