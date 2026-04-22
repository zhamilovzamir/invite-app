'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId, status) {
  await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  revalidatePath('/admin')
}