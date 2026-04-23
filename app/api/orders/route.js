import { supabase } from '@/lib/supabase'
import { sendTelegramMessage } from '@/lib/telegram'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      template_id: body.template_id,
      custom_data: body.custom_data,
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Отправляем уведомление в Telegram
  await sendTelegramMessage(`
🆕 <b>Новый заказ!</b>

👤 Клиент: ${body.customer_name}
📞 Телефон: ${body.customer_phone}
🎉 Событие: ${body.custom_data?.guest_name}
📅 Дата: ${body.custom_data?.event_date}
📍 Место: ${body.custom_data?.venue}

⏳ Ожидает оплаты
  `)

  return NextResponse.json({ data })
}