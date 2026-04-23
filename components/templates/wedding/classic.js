export default function WeddingClassic({ data }) {
  return (
    <main className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* Верхнее украшение */}
        <div className="text-center mb-6">
          <div className="text-4xl">🌹 🤍 🌹</div>
        </div>

        {/* Основная карточка */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100">

          {/* Шапка */}
          <div className="bg-gradient-to-b from-rose-100 to-white px-8 pt-10 pb-6 text-center">
            <p className="text-rose-400 text-sm uppercase tracking-widest mb-2">
              Бізді қуантыңыз
            </p>
            <h1 className="text-4xl font-serif text-rose-600 font-bold mb-1">
              {data.guest_name || 'Есім жазылмаған'}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px bg-rose-200 w-16"/>
              <div className="text-rose-300 text-xl">💍</div>
              <div className="h-px bg-rose-200 w-16"/>
            </div>
          </div>

          {/* Фото */}
          {data.photo_url && (
            <div className="px-6">
              <img
                src={data.photo_url}
                alt="Фото"
                className="w-full h-64 object-cover rounded-2xl shadow-md"
              />
            </div>
          )}

          {/* Детали */}
          <div className="px-8 py-6 space-y-4">
            {data.event_date && (
              <div className="flex items-center gap-4 bg-rose-50 rounded-2xl p-4">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs text-rose-400 uppercase tracking-wide">Күні</p>
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
              <div className="flex items-center gap-4 bg-rose-50 rounded-2xl p-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-xs text-rose-400 uppercase tracking-wide">Уақыты</p>
                  <p className="font-semibold text-gray-800">{data.event_time}</p>
                </div>
              </div>
            )}

            {data.venue && (
              <div className="flex items-center gap-4 bg-rose-50 rounded-2xl p-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs text-rose-400 uppercase tracking-wide">Мекен-жайы</p>
                  <p className="font-semibold text-gray-800">{data.venue}</p>
                </div>
              </div>
            )}
          </div>

          {/* RSVP */}
          <div className="px-8 pb-8">
            <p className="text-center text-gray-500 text-sm mb-4">
              Келе аласыз ба?
            </p>
            <div className="flex gap-3">
              <a
                href={`/invite/${data.orderId}/rsvp?answer=yes`}
                className="flex-1 text-center bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold transition"
              >
                ✅ Келемін
              </a>
              <a
                href={`/invite/${data.orderId}/rsvp?answer=no`}
                className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition"
              >
                ❌ Келе алмаймын
              </a>
            </div>
          </div>

          {/* Футер */}
          <div className="bg-rose-50 p-4 text-center border-t border-rose-100">
            <p className="text-rose-300 text-xs">
              Создано на <span className="text-rose-500 font-medium">InviteApp</span>
            </p>
          </div>
        </div>

        {/* Нижнее украшение */}
        <div className="text-center mt-6">
          <div className="text-3xl">🌸 🌸 🌸</div>
        </div>
      </div>
    </main>
  )
}