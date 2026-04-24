import { supabase } from '@/lib/supabase'
import { sendTelegramMessage } from '@/lib/telegram'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()

  const { data: order } = await supabase
    .from('orders')
    .select('customer_name, custom_data')
    .eq('id', body.order_id)
    .single()

  const { error } = await supabase
    .from('guest_responses')
    .insert({
      order_id: body.order_id,
      guest_name: body.guest_name,
      answer: body.answer,
      comment: body.comment,
    })

  if (!error && order) {
    const emoji = body.answer === 'yes' ? '✅' : '❌'
    const text = body.answer === 'yes' ? 'Келемін' : 'Келе алмаймын'

    await sendTelegramMessage(`
${emoji} <b>Жаңа жауап!</b>

🎉 Той: ${order.custom_data?.guest_name}
👤 Той иесі: ${order.customer_name}
👥 Қонақ: ${body.guest_name}
💬 Жауап: ${text}
${body.comment ? `📝 Пікір: ${body.comment}` : ''}
    `)
  }

  return NextResponse.json({ ok: true })
}