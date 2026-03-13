'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/applications');
  } catch (error) {
    console.error('Failed to update application status:', error);
  }
}

export async function deleteApplication(id: string) {
  try {
    await prisma.jobApplication.delete({
      where: { id },
    });
    revalidatePath('/admin/applications');
  } catch (error) {
    console.error('Failed to delete application:', error);
  }
}
