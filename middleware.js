import { NextResponse } from 'next/server';

// Middleware to handle session persistence
export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users trying to access protected routes
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect authenticated users away from the login page
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow all other requests through
  return NextResponse.next();
}

// Apply middleware to root and dashboard routes
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
