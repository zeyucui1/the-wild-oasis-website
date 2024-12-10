/* import { NextResponse } from 'next/server'

export function middleware(req, res, next) {
  return NextResponse.redirect(new URL('/about', request.url))
}
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
} */

import { auth } from '@/app/_lib/auth'
export const middleware = auth

export const config = {
  matcher: ['/account'],
}
