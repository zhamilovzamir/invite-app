'use client'

import React from 'react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EditPage({ params: paramsPromise }) {
  const [orderId, setOrderId] = useState(null)
  const params = React.use(paramsPromise)
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    guest_name: '',
    event_date: '',
    event_time: '',
    venue: '',
    map_url: '',
    telegram_channel: '',
    hosts: '',
    music_url: '',
  })
  const [loading, setLoading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage
      .from('photos')
      .upload(fileName, file)
    if (!error) {
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName)
      setPhotoUrl(urlData.publicUrl)
    } else {
      alert('Фото жүктеу қатесі: ' + error.message)
    }
    setUploading(false)
  }

  async function handleSubmit() {
    setLoading(true)
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        template_id: params.id,
        custom_data: {
          guest_name: form.guest_name,
          event_date: form.event_date,
          event_time: form.event_time,
          venue: form.venue,
          hosts: form.hosts,
          map_url: form.map_url,
          telegram_channel: form.telegram_channel,
          photo_url: photoUrl,
          music_url: form.music_url,
        },
      }),
    })
    const result = await res.json()
    setLoading(false)
    if (result.data) {
      setOrderId(result.data.id)
      setDone(true)
    } else {
      alert('Қате: ' + result.error)
    }
  }

  if (done && orderId) {
    return (
      <main className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Тапсырыс қабылданды!</h2>
          <p className="text-gray-600 mb-6">
            Kaspi арқылы төлем жасап, скриншотты WhatsApp-қа жіберіңіз
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold text-gray-800">Kaspi нөмірі:</p>
            <p className="text-2xl font-bold text-blue-600">4400 4302 5838 7080 <span className="ml-2 text-sm font-normal text-gray-500">
    (Замир Ж)
  </span></p>
            <p className="font-semibold mt-3 text-gray-800">Сомасы:</p>
            <p className="text-2xl font-bold text-green-600">1 990 ₸</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-4 text-left">
            <p className="font-semibold text-purple-800 mb-2">Шақыру сілтемесі:</p>
            <p className="text-sm text-purple-600 break-all">{window.location.origin}/invite/{orderId}</p>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/invite/${orderId}`)}
              className="mt-2 text-xs bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700"
            >
              Көшіру
            </button>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold text-blue-800 mb-2">Дашборд сілтемесі:</p>
            <p className="text-sm text-blue-600 break-all">{window.location.origin}/dashboard/{orderId}</p>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/dashboard/${orderId}`)}
              className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              Көшіру
            </button>
          </div>

          <a
            href={`/invite/${orderId}`}
            className="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-semibold mb-3 hover:bg-purple-700"
          >
            Шақыруды қарау →
          </a>
          <a
            href="https://wa.me/77066355150"
            className="block w-full text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
          >
            WhatsApp-қа жазу
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <a href={`/templates/${params.id}`} className="text-purple-600 mb-6 block font-medium">
          ← Артқа
        </a>

        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Деректерді толтырыңыз</h1>
          <p className="text-gray-500 text-sm mb-6">Барлық өрістерді толтырыңыз</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Сіздің есіміңіз</label>
              <input
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="Есіміңізді енгізіңіз"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Телефон нөміріңіз</label>
              <input
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="+7 777 123 45 67"
              />
            </div>

            <hr className="my-2"/>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Шақырудағы есімдер</label>
              <input
                name="guest_name"
                value={form.guest_name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="Төлеген & Қыз Жібек"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Той иелері</label>
              <input
                name="hosts"
                value={form.hosts || ''}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="Асем мен Берік"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Той күні</label>
              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Уақыты</label>
              <input
                type="time"
                name="event_time"
                value={form.event_time}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Мекенжайы</label>
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="Астана Палас мейрамханасы"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Картаға сілтеме (Google Maps)</label>
              <input
                name="map_url"
                value={form.map_url || ''}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="https://maps.google.com/..."
              />
              <p className="text-xs text-gray-400 mt-1">Google Maps → мейрамхананы табыңыз → Бөлісу → сілтемені көшіріңіз</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Telegram канал (міндетті емес)</label>
              <input
                name="telegram_channel"
                value={form.telegram_channel || ''}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="https://t.me/your_channel"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Музыка (міндетті емес)</label>
              <input
                name="music_url"
                value={form.music_url || ''}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500"
                placeholder="https://example.com/music.mp3"
              />
              <p className="text-xs text-gray-400 mt-1">MP3 сілтемесі. Егер қоспасаңыз үлгідегі әуен ойналады</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Фото (міндетті емес)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:border-purple-500"
              />
              {uploading && (
                <p className="text-sm text-purple-500 mt-1">Жүктелуде...</p>
              )}
              {photoUrl && (
                <img src={photoUrl} alt="Превью" className="mt-3 w-full h-40 object-cover rounded-xl" />
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-8 w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {loading ? 'Жіберілуде...' : 'Тапсырыс беру →'}
          </button>
        </div>
      </div>
    </main>
  )
}