import { supabase } from '@/lib/supabase'

const templates_design = {
  wedding: {
    bg: 'from-pink-50 to-rose-100',
    accent: 'text-rose-500',
    border: 'border-rose-200',
    emoji: '💍',
    font: 'font-serif',
  },
  birthday: {
    bg: 'from-amber-50 to-orange-100',
    accent: 'text-orange-500',
    border: 'border-orange-200',
    emoji: '🎂',
    font: 'font-sans',
  },
  corporate: {
    bg: 'from-blue-50 to-indigo-100',
    accent: 'text-indigo-500',
    border: 'border-indigo-200',
    emoji: '🎯',
    font: 'font-sans',
  },
}

export default async function PreviewPage({ params, searchParams }) {
  const { id } = await params
  const { order: orderId } = await searchParams

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

  const design = templates_design[order.templates?.category] || templates_design.wedding
  const data = order.custom_data || {}

  return (
    <main className={`min-h-screen bg-gradient-to-br ${design.bg} flex items-center justify-center p-8`}>
      <div className={`bg-white rounded-3xl shadow-2xl max-w-md w-full border ${design.border} overflow-hidden`}>

        <div className={`bg-gradient-to-br ${design.bg} p-10 text-center border-b ${design.border}`}>
          <div className="text-6xl mb-4">{design.emoji}</div>
          <p className={`text-sm uppercase tracking-widest ${design.accent} mb-3`}>
            Вы приглашены
          </p>
          <h1 className={`text-4xl ${design.font} ${design.accent} font-bold mb-2`}>
            {data.guest_name || 'Имя не указано'}
          </h1>
        </div>

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

        {data.photo_url && (
          <div className="px-8 pb-4">
            <img
              src={data.photo_url}
              alt="Фото события"
              className="w-full h-48 object-cover rounded-2xl"
            />
          </div>
        )}

        <div className={`p-6 text-center border-t ${design.border} bg-gradient-to-br ${design.bg}`}>
          <p className="text-gray-500 text-sm">
            Создано на <span className={`font-semibold ${design.accent}`}>InviteApp</span>
          </p>
        </div>
      </div>
    </main>
  )
}