import { supabase } from '@/lib/supabase'
import { sendTelegramMessage } from '@/lib/telegram'

export default async function RsvpPage({ params, searchParams }) {
  const { orderId } = await params
  const { answer } = await searchParams

  const { data: order } = await supabase
    .from('orders')
    .select('*, templates(name, category)')
    .eq('id', orderId)
    .single()

  if (order) {
    const guestName = order.custom_data?.guest_name || 'Қонақ'
    const emoji = answer === 'yes' ? '✅' : '❌'
    const text = answer === 'yes' ? 'Келемін' : 'Келе алмаймын'

    await sendTelegramMessage(`
${emoji} <b>RSVP жауабы!</b>

🎉 Той: ${guestName}
👤 Той иесі: ${order.customer_name}
💬 Жауап: ${text}
    `)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">
          {answer === 'yes' ? '🎉' : '😢'}
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {answer === 'yes' ? 'Рахмет!' : 'Жарайды!'}
        </h1>
        <p className="text-gray-500">
          {answer === 'yes'
            ? 'Жауабыңыз қабылданды. Сізді күтеміз!'
            : 'Жауабыңыз қабылданды.'}
        </p>
      </div>
    </main>
  )
}