import { supabase } from '@/lib/supabase'

const designs = {
  wedding: {
    bg: 'from-pink-50 to-rose-100',
    accent: 'text-rose-500',
    border: 'border-rose-200',
    button: 'bg-rose-500 hover:bg-rose-600',
    emoji: '💍',
    font: 'font-serif',
    title: 'Свадебное приглашение',
  },
  birthday: {
    bg: 'from-amber-50 to-orange-100',
    accent: 'text-orange-500',
    border: 'border-orange-200',
    button: 'bg-orange-500 hover:bg-orange-600',
    emoji: '🎂',
    font: 'font-sans',
    title: 'День рождения',
  },
  corporate: {
    bg: 'from-blue-50 to-indigo-100',
    accent: 'text-indigo-500',
    border: 'border-indigo-200',
    button: 'bg-indigo-500 hover:bg-indigo-600',
    emoji: '🎯',
    font: 'font-sans',
    title: 'Корпоративное мероприятие',
  },
}

export default async function InvitePage({ params }) {
  const { orderId } = await params

  const { data: order } = await supabase
    .from('orders')
    .select('*, templates(name, category)')
    .eq('id', orderId)
    .single()

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Приглашение не найдено</p>
      </div>
    )
  }

  const design = designs[order.templates?.category] || designs.wedding
  const data = order.custom_data || {}

  return (
    <main className={`min-h-screen bg-gradient-to-br ${design.bg} flex items-center justify-center p-8`}>
      <div className={`bg-white rounded-3xl shadow-2xl max-w-md w-full border ${design.border} overflow-hidden`}>

        {/* Верхняя часть */}
        <div className={`bg-gradient-to-br ${design.bg} p-10 text-center border-b ${design.border}`}>
          <div className="text-6xl mb-4">{design.emoji}</div>
          <p className={`text-sm uppercase tracking-widest ${design.accent} mb-3`}>
            {design.title}
          </p>
          <h1 className={`text-4xl ${design.font} ${design.accent} font-bold mb-2`}>
            {data.guest_name || 'Приглашение'}
          </h1>
        </div>

        {/* Фото */}
        {data.photo_url && (
          <div className="px-8 pt-6">
            <img
              src={data.photo_url}
              alt="Фото события"
              className="w-full h-56 object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Детали */}
        <div className="p-8 space-y-5">
          {data.event_date && (
            <div className="flex items-center gap-4">
              <div className="text-2xl">📅</div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Дата</p>
                <p className="font-semibold text-gray-800">
                  {new Date(data.event_date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}

          {data.event_time && (
            <div className="flex items-center gap-4">
              <div className="text-2xl">🕐</div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Время</p>
                <p className="font-semibold text-gray-800">{data.event_time}</p>
              </div>
            </div>
          )}

          {data.venue && (
            <div className="flex items-center gap-4">
              <div className="text-2xl">📍</div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Место</p>
                <p className="font-semibold text-gray-800">{data.venue}</p>
              </div>
            </div>
          )}
        </div>

        {/* RSVP кнопки */}
        <div className={`p-6 border-t ${design.border} bg-gradient-to-br ${design.bg}`}>
          <p className="text-center text-gray-600 text-sm mb-4 font-medium">
            Вы сможете прийти?
          </p>
          <div className="flex gap-3">
            <a
              href={`/invite/${orderId}/rsvp?answer=yes`}
              className={`flex-1 text-center ${design.button} text-white py-3 rounded-xl font-semibold transition`}
            >
              ✅ Приду
            </a>
            <a
              href={`/invite/${orderId}/rsvp?answer=no`}
              className="flex-1 text-center bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              ❌ Не смогу
            </a>
          </div>
        </div>

        {/* Футер */}
        <div className="p-4 text-center">
          <p className="text-gray-400 text-xs">
            Создано на <span className="text-purple-500 font-medium">InviteApp</span>
          </p>
        </div>
      </div>
    </main>
  )
}
