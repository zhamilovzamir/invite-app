'use client'

import { useState } from 'react'

export default function KyzUzatuClassic({ data }) {
  const [comment, setComment] = useState('')
  const [guestName, setGuestName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleRsvp(answer) {
    setLoading(true)
    await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: data.orderId,
        guest_name: guestName,
        answer,
        comment,
      }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Блок 1 — Фото + заголовок */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {data.photo_url ? (
          <img
            src={data.photo_url}
            alt="Фото"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-700"/>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"/>
        
        <div className="relative text-center text-white px-8 z-10">
          <p className="text-sm uppercase tracking-widest mb-4 opacity-80">
            ✦ Сіздерді шақырамыз ✦
          </p>
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Қыз ұзату
          </h1>
          <div className="text-3xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            {data.guest_name || 'Есім'}
          </div>
          <div className="flex items-center justify-center gap-3 text-red-200">
            <div className="h-px w-16 bg-red-200"/>
            <span>🌺</span>
            <div className="h-px w-16 bg-red-200"/>
          </div>
          {data.event_date && (
            <p className="mt-6 text-xl opacity-90">
              {new Date(data.event_date).toLocaleDateString('kk-KZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
        </div>

        {/* Стрелка вниз */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* Блок 2 — Той иелері */}
      <section className="py-20 px-8 bg-red-50 text-center">
        <p className="text-red-400 text-sm uppercase tracking-widest mb-4">Той иелері</p>
        <h2 className="text-4xl font-bold text-red-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          {data.hosts || 'Аты-жөні'}
        </h2>
        <div className="flex items-center justify-center gap-3 text-red-300">
          <div className="h-px w-24 bg-red-200"/>
          <span>🌸</span>
          <div className="h-px w-24 bg-red-200"/>
        </div>
      </section>

      {/* Блок 3 — Дата и время */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-md mx-auto space-y-4">
          {data.event_date && (
            <div className="flex items-center gap-4 bg-red-50 rounded-2xl p-5">
              <span className="text-3xl">📅</span>
              <div>
                <p className="text-xs text-red-400 uppercase tracking-wide mb-1">Күні</p>
                <p className="text-lg font-semibold text-gray-800">
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
            <div className="flex items-center gap-4 bg-red-50 rounded-2xl p-5">
              <span className="text-3xl">🕐</span>
              <div>
                <p className="text-xs text-red-400 uppercase tracking-wide mb-1">Уақыты</p>
                <p className="text-lg font-semibold text-gray-800">{data.event_time}</p>
              </div>
            </div>
          )}

          {data.venue && (
            <div className="flex items-center gap-4 bg-red-50 rounded-2xl p-5">
              <span className="text-3xl">📍</span>
              <div>
                <p className="text-xs text-red-400 uppercase tracking-wide mb-1">Мекен-жайы</p>
                <p className="text-lg font-semibold text-gray-800">{data.venue}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Блок 4 — Карта */}
      {data.map_url && (
        <section className="py-8 px-8 bg-white">
          <div className="max-w-md mx-auto">
            <a
              href={data.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-700 transition"
            >
              🗺️ Картада көру
            </a>
          </div>
        </section>
      )}

      {/* Блок 5 — Telegram канал */}
      {data.telegram_channel && (
        <section className="py-8 px-8 bg-white">
          <div className="max-w-md mx-auto">
            <a
              href={data.telegram_channel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-600 transition"
            >
              ✈️ Telegram каналға өту
            </a>
          </div>
        </section>
      )}

      {/* Блок 6 — RSVP */}
      <section className="py-20 px-8 bg-red-50">
        <div className="max-w-md mx-auto">
          <p className="text-red-400 text-sm uppercase tracking-widest mb-4 text-center">
            Жауабыңызды күтеміз
          </p>
          <h3 className="text-2xl font-bold text-red-800 text-center mb-8">
            Келе аласыз ба?
          </h3>

          {submitted ? (
            <div className="text-center bg-white rounded-2xl p-8 shadow">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-xl font-semibold text-gray-800">Рахмет!</p>
              <p className="text-gray-500 mt-2">Жауабыңыз қабылданды</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Сіздің есіміңіз</label>
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Есіміңізді жазыңыз"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Пікір (міндетті емес)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Құттықтауыңызды жазыңыз..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleRsvp('yes')}
                  disabled={loading || !guestName}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 transition"
                >
                  ✅ Келемін
                </button>
                <button
                  onClick={() => handleRsvp('no')}
                  disabled={loading || !guestName}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 disabled:opacity-50 transition"
                >
                  ❌ Келе алмаймын
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Футер */}
      <footer className="py-8 text-center bg-red-900">
        <p className="text-red-200 text-sm">
          Создано на <span className="text-white font-medium">InviteApp</span>
        </p>
      </footer>
    </main>
  )
}