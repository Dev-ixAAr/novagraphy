'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const location = formData.get('location') as string;
  const image = formData.get('image') as string;

  const maxItem = await prisma.portfolioItem.findFirst({
    where: { category: 'events' },
    orderBy: { sortOrder: 'desc' },
  });
  const nextSortOrder = maxItem ? maxItem.sortOrder + 1 : 0;

  await prisma.portfolioItem.create({
    data: {
      title,
      subtitle: location,
      image,
      category: 'events',
      date,
      sortOrder: nextSortOrder,
    },
  });

  revalidatePath('/', 'layout');
  revalidatePath('/portfolio');
  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  try {
    await prisma.portfolioItem.delete({
      where: { id },
    });
    revalidatePath('/', 'layout');
    revalidatePath('/portfolio');
    revalidatePath('/admin/events');
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
}