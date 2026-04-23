export default function TusauKeserClassic({ data }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        <div className="text-center mb-6">
          <div className="text-4xl">👶 ⭐ 👶</div>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-orange-100">

          <div className="bg-gradient-to-b from-orange-100 to-white px-8 pt-10 pb-6 text-center">
            <p className="text-orange-400 text-xs uppercase tracking-widest mb-3">
              Тұсау кесер тойына шақырамыз
            </p>
            <h1 className="text-4xl font-bold text-orange-500 mb-3"
              style={{ fontFamily: 'Georgia, serif' }}>
              {data.guest_name || 'Есім жазылмаған'}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-orange-200 w-16"/>
              <span className="text-2xl">🌟</span>
              <div className="h-px bg-orange-200 w-16"/>
            </div>
          </div>

          {data.photo_url && (
            <div className="px-6 py-2">
              <img
                src={data.photo_url}
                alt="Фото"
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          )}

          <div className="px-8 py-6 space-y-4">
            {data.event_date && (
              <div className="flex items-center gap-4 bg-orange-50 rounded-2xl p-4">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs text-orange-400 uppercase tracking-wide">Күні</p>
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
              <div className="flex items-center gap-4 bg-orange-50 rounded-2xl p-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-xs text-orange-400 uppercase tracking-wide">Уақыты</p>
                  <p className="font-semibold text-gray-800">{data.event_time}</p>
                </div>
              </div>
            )}

            {data.venue && (
              <div className="flex items-center gap-4 bg-orange-50 rounded-2xl p-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs text-orange-400 uppercase tracking-wide">Мекен-жайы</p>
                  <p className="font-semibold text-gray-800">{data.venue}</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-8 pb-8">
            <p className="text-center text-gray-500 text-sm mb-4">Келе аласыз ба?</p>
            <div className="flex gap-3">
              <a
                href={`/invite/${data.orderId}/rsvp?answer=yes`}
                className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
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

          <div className="bg-orange-50 p-4 text-center border-t border-orange-100">
            <p className="text-orange-300 text-xs">
              Создано на <span className="text-orange-500 font-medium">InviteApp</span>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <div className="text-3xl">🌟 🌟 🌟</div>
        </div>
      </div>
    </main>
  )
}