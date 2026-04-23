import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request) {
  const { password } = await request.json()

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin_token', password, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
}