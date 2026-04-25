'use client'

import { useState } from 'react'

export default function FindPage() {
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!phone) return
    setLoading(true)

    const res = await fetch(`/api/find?phone=${encodeURIComponent(phone)}`)
    const data = await res.json()
    setOrders(data.orders)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Сілтемені табу</h1>
        <p className="text-gray-500 text-center text-sm mb-6">
          Тіркелген нөміріңізді енгізіңіз
        </p>

        <div className="space-y-4">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="+7 777 123 45 67"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !phone}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {loading ? 'Іздеу...' : 'Іздеу'}
          </button>
        </div>

        {/* Результаты */}
        {orders !== null && (
          <div className="mt-6">
            {orders.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500">Заказ табылмады</p>
                <p className="text-gray-400 text-sm mt-1">Нөмірді тексеріңіз</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600">Табылды:</p>
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-xl p-4 space-y-3">
                    <div>
                      <p className="font-semibold text-gray-800">{order.templates?.name}</p>
                      <p className="text-gray-500 text-sm">{order.custom_data?.guest_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/invite/${order.id}`}
                        className="flex-1 text-center bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
                      >
                        🔗 Шақыру
                      </a>
                      <a
                        href={`/dashboard/${order.id}`}
                        className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
                      >
                        👤 Дашборд
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}