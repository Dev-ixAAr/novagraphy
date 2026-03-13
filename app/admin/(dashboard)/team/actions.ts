'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTeamMember(formData: FormData) {
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const img = formData.get('img') as string;
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;
  const isFounder = formData.get('isFounder') === 'on';

  await prisma.teamMember.create({
    data: {
      name,
      role,
      img,
      sortOrder,
      isFounder,
    },
  });

  revalidatePath('/admin/team');
  redirect('/admin/team');
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });
    revalidatePath('/admin/team');
  } catch (error) {
    console.error('Failed to delete team member:', error);
  }
}