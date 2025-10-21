import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // This is a mock authentication check. In a real app, you'd verify a session token.
  const isAuthenticated = request.cookies.has('mock-auth-token');
 
  const protectedRoutes = ['/my-reservations', '/admin'];

  if (!isAuthenticated && protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/my-reservations/:path*', '/admin/:path*'],
}