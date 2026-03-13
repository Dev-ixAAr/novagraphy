'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPortfolioItem(formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const image = formData.get('image') as string;
  const category = formData.get('category') as string;
  const date = formData.get('date') as string;
  const className = formData.get('className') as string;

  const maxItem = await prisma.portfolioItem.findFirst({
    where: { category },
    orderBy: { sortOrder: 'desc' },
  });
  const nextSortOrder = maxItem ? maxItem.sortOrder + 1 : 0;

  await prisma.portfolioItem.create({
    data: {
      title,
      subtitle,
      image,
      category,
      date,
      className,
      sortOrder: nextSortOrder,
    },
  });

  revalidatePath('/', 'layout');
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  redirect('/admin/portfolio');
}

export async function deletePortfolioItem(id: string) {
  try {
    await prisma.portfolioItem.delete({
      where: { id },
    });
    revalidatePath('/', 'layout');
    revalidatePath('/portfolio');
    revalidatePath('/admin/portfolio');
  } catch (error) {
    console.error('Failed to delete portfolio item:', error);
  }
}