'use server';

import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    // 1. Database එකෙන් User ව හොයනවා
    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    // 2. User ඉන්නවද සහ Password එක හරිද කියලා බලනවා (ආරක්ෂාවට පොදු Error එකක් දෙනවා)
    if (!user || !user.passwordHash) {
      return { error: 'Invalid email or password.' };
    }

    const isValidPassword = await compare(password, user.passwordHash);

    if (!isValidPassword) {
      return { error: 'Invalid email or password.' };
    }

    // 3. JWT Token එක හදනවා
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // 4. ආරක්ෂිතව Cookie එක සෙට් කරනවා
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true, // XSS ප්‍රහාර වලින් බේරෙන්න
      secure: process.env.NODE_ENV === 'production', // HTTPS වලින් විතරක් යවන්න
      sameSite: 'strict', // CSRF ප්‍රහාර වලින් බේරෙන්න
      maxAge: 60 * 60 * 24, // දවසකින් ලොගවුට් වෙන්න
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }

  // 5. සාර්ථක වුණොත් Admin Dashboard එකට යවනවා 
  // (මේක අනිවාර්යයෙන්ම try/catch එකෙන් එළියේ තියෙන්න ඕනේ)
  redirect('/admin');
}