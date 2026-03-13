'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleMessageReadStatus(id: string, currentReadStatus: boolean) {
  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: { read: !currentReadStatus },
    });
    revalidatePath('/admin/messages');
  } catch (error) {
    console.error('Failed to update message status:', error);
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });
    revalidatePath('/admin/messages');
  } catch (error) {
    console.error('Failed to delete message:', error);
  }
}