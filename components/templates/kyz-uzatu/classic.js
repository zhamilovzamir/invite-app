export default function KyzUzatuClassic({ data }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 50%, #8B0000 100%)' }}>
      <div className="max-w-md w-full">

        {/* Казахский орнамент сверху */}
        <div className="text-center mb-4">
          <div className="text-3xl">🔴 ⭐ 🔴</div>
          <p className="text-red-200 text-sm mt-1 tracking-widest">✦ ✦ ✦</p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">

          {/* Шапка */}
          <div className="px-8 pt-10 pb-6 text-center"
            style={{ background: 'linear-gradient(180deg, #FFF5F5 0%, #ffffff 100%)' }}>
            <p className="text-red-400 text-xs uppercase tracking-widest mb-3">
              Қыз ұзату тойына шақырамыз
            </p>
            <h1 className="text-4xl font-bold mb-3"
              style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
              {data.guest_name || 'Есім жазылмаған'}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: '#C41E3A' }}/>
              <span className="text-2xl">🌺</span>
              <div className="h-px w-16" style={{ background: '#C41E3A' }}/>
            </div>
          </div>

          {/* Фото */}
          {data.photo_url && (
            <div className="px-6 py-2">
              <img
                src={data.photo_url}
                alt="Фото"
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Детали */}
          <div className="px-8 py-6 space-y-4">
            {data.event_date && (
              <div className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: '#FFF5F5' }}>
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs uppercase tracking-wide" style={{ color: '#C41E3A' }}>Күні</p>
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
              <div className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: '#FFF5F5' }}>
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-xs uppercase tracking-wide" style={{ color: '#C41E3A' }}>Уақыты</p>
                  <p className="font-semibold text-gray-800">{data.event_time}</p>
                </div>
              </div>
            )}

            {data.venue && (
              <div className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: '#FFF5F5' }}>
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs uppercase tracking-wide" style={{ color: '#C41E3A' }}>Мекен-жайы</p>
                  <p className="font-semibold text-gray-800">{data.venue}</p>
                </div>
              </div>
            )}
          </div>

          {/* RSVP */}
          <div className="px-8 pb-8">
            <p className="text-center text-gray-500 text-sm mb-4">Келе аласыз ба?</p>
            <div className="flex gap-3">
              <a
                href={`/invite/${data.orderId}/rsvp?answer=yes`}
                className="flex-1 text-center text-white py-3 rounded-xl font-semibold transition"
                style={{ background: '#C41E3A' }}
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

          <div className="p-4 text-center border-t border-red-100">
            <p className="text-xs" style={{ color: '#C41E3A' }}>
              Создано на <span className="font-medium">InviteApp</span>
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-red-200 text-sm tracking-widest">✦ ✦ ✦</p>
        </div>
      </div>
    </main>
  )
}