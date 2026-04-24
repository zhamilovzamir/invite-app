'use server'

import { supabase } from '@/lib/supabase'
import { sendTelegramMessage } from '@/lib/telegram'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId, status) {
  await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  revalidatePath('/admin')
}

export async function activateOrder(orderId, customerPhone) {
  await supabase
    .from('orders')
    .update({ is_paid: true, status: 'paid' })
    .eq('id', orderId)

  await sendTelegramMessage(`
✅ <b>Заказ активирован!</b>
📞 Телефон: ${customerPhone}
🔗 Ссылка: /invite/${orderId}
  `)

  revalidatePath('/admin')
}