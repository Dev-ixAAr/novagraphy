'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createJob(formData: FormData) {
  const title = formData.get('title') as string;
  const dept = formData.get('dept') as string;
  const type = formData.get('type') as string;
  const location = formData.get('location') as string;
  const salary = formData.get('salary') as string;
  const active = formData.get('active') === 'on';

  await prisma.job.create({
    data: {
      title,
      dept,
      type,
      location,
      salary,
      active,
    },
  });

  revalidatePath('/admin/jobs');
  redirect('/admin/jobs');
}

export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({ where: { id } });
    revalidatePath('/admin/jobs');
  } catch (error) {
    console.error('Failed to delete job:', error);
  }
}