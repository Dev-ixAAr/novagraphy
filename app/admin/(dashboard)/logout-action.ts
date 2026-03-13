'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAdmin() {
  // 1. Cookie එක මකලා දානවා
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');

  // 2. Login පේජ් එකට හරවලා යවනවා (try/catch එකෙන් එළියේ)
  redirect('/admin/login');
}