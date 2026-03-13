import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow access to the login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 2. Check for the admin_token cookie
  const tokenCookie = request.cookies.get('admin_token');
  const token = tokenCookie?.value;

  // 3. Verify the token
  // If no token or verification fails, redirect to login
  if (!token || !(await verifyToken(token))) {
    const loginUrl = new URL('/admin/login', request.url);
    // Optional: Add ?next= param to redirect back after login
    // loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Token is valid, allow access
  return NextResponse.next();
}

// Apply middleware only to admin routes
export const config = {
  matcher: '/admin/:path*',
};