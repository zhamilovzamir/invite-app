import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()

  const { error } = await supabase
    .from('guest_responses')
    .insert({
      order_id: body.order_id,
      guest_name: body.guest_name,
      answer: body.answer,
      comment: body.comment,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}