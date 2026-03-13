'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const location = formData.get('location') as string;
  const image = formData.get('image') as string;
  const category = formData.get('category') as string;
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

  await prisma.event.create({
    data: {
      title,
      date,
      location,
      image,
      category,
      sortOrder,
    },
  });

  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath('/admin/events');
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
}