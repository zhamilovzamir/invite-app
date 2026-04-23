import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}