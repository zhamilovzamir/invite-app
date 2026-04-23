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
  })
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
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
  const { data, error } = await supabase.storage
    .from('photos')
    .upload(fileName, file)

  if (!error) {
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName)
    setPhotoUrl(urlData.publicUrl)
  } else {
    alert('Ошибка загрузки фото: ' + error.message)
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
        photo_url: photoUrl,
      },
    }),
  })

  const result = await res.json()
  setLoading(false)

  if (result.data) {
    setOrderId(result.data.id)
    setDone(true)
  } else {
    alert('Ошибка: ' + result.error)
  }
}

  if (done && orderId) {
    return (
      <main className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Заказ принят!</h2>
          <p className="text-gray-600 mb-6">
            Переведи оплату на Kaspi и отправь скриншот в WhatsApp
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold">Номер Kaspi:</p>
            <p className="text-2xl font-bold text-blue-600">+7 777 123 45 67</p>
            <p className="font-semibold mt-3">Сумма:</p>
            <p className="text-2xl font-bold text-green-600">1 990 тг</p>
          </div>
          <a
            href={`/templates/${params.id}/preview?order=${orderId}`}
            className="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-semibold mb-3 hover:bg-purple-700"
          >
            Посмотреть приглашение →
          </a>
          <a
            href="https://wa.me/77056388858"
            className="block w-full text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
          >
            Написать в WhatsApp
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <a href={`/templates/${params.id}`} className="text-blue-500 mb-6 block">
          ← Назад
        </a>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-6">Заполни данные</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ваше имя</label>
              <input
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Как вас зовут"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ваш телефон</label>
              <input
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+7 777 123 45 67"
              />
            </div>

            <hr className="my-4"/>

            <div>
              <label className="block text-sm font-medium mb-1">Имена на приглашении</label>
              <input
                name="guest_name"
                value={form.guest_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Алия & Берик"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Дата события</label>
              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Время</label>
              <input
                type="time"
                name="event_time"
                value={form.event_time}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Место проведения</label>
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ресторан Астана"
              />
            </div>
            <div>
  <label className="block text-sm font-medium mb-1">
    Фото (необязательно)
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={handlePhoto}
    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
  {uploading && (
    <p className="text-sm text-gray-500 mt-1">Загружаем фото...</p>
  )}
  {photoUrl && (
    <img
      src={photoUrl}
      alt="Превью"
      className="mt-3 w-full h-40 object-cover rounded-lg"
    />
  )}
</div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Отправляем...' : 'Оформить заказ'}
          </button>
        </div>
      </div>
    </main>
  )
}