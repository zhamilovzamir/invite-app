import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ orders: [] })
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*, templates(name)')
    .eq('customer_phone', phone)
    .order('created_at', { ascending: false })

  return NextResponse.json({ orders: orders || [] })
}