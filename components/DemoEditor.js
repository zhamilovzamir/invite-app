'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'

const templateComponents = {
  'uilenu-toi-red': dynamic(() => import('./templates/wedding/red')),
  'uilenu-toi-classic': dynamic(() => import('./templates/wedding/classic')),
  'uzatu-toi-classic': dynamic(() => import('./templates/uzatu/classic')),
  'uzatu-toi-modern': dynamic(() => import('./templates/uzatu/modern')),
  'sauilik-toi-classic': dynamic(() => import('./templates/sauilik/classic')),
  'sauilik-toi-colorful': dynamic(() => import('./templates/sauilik/colorful')),
  'tugan-kun-classic': dynamic(() => import('./templates/tugan-kun/classic')),
  'tugan-kun-minimal': dynamic(() => import('./templates/tugan-kun/classic')),
}

export default function DemoEditor({ template }) {
  const router = useRouter()
  const [tab, setTab] = useState('preview')
  const [uploading, setUploading] = useState(false)
  const [data, setData] = useState({
    guest_name: 'Мади & Камила',
    hosts: 'Оразхановтар отбасы',
    event_date: '2026-06-15',
    event_time: '18:00',
    venue: 'Астана Палас мейрамханасы',
    map_url: '',
    telegram_channel: '',
    photo_url: '',
    music_url: '',
    orderId: 'demo',
  })

  const key = `${template.category_slug}-${template.slug}`
  const TemplateComponent = templateComponents[key]

  function update(field, value) {
    setData(prev => ({ ...prev, [field]: value }))
  }

  async function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('photos').upload(fileName, file)
    if (!error) {
      const { data: urlData } = supabase.storage.from('photos').getPublicUrl(fileName)
      update('photo_url', urlData.publicUrl)
    }
    setUploading(false)
  }

  function handleOrder() {
    const prefill = encodeURIComponent(JSON.stringify(data))
    router.push(`/templates/${template.id}/edit?prefill=${prefill}`)
  }

  const fields = [
    { key: 'guest_name', label: 'Шақырудағы есімдер', placeholder: 'Мади & Камила' },
    { key: 'hosts', label: 'Той иелері', placeholder: 'Оразхановтар отбасы' },
    { key: 'event_date', label: 'Той күні', type: 'date' },
    { key: 'event_time', label: 'Уақыты', type: 'time' },
    { key: 'venue', label: 'Мекенжайы', placeholder: 'Астана Палас мейрамханасы' },
    { key: 'map_url', label: 'Карта сілтемесі', placeholder: 'https://maps.google.com/...' },
    { key: 'telegram_channel', label: 'Telegram канал', placeholder: 'https://t.me/...' },
    { key: 'music_url', label: 'Музыка (MP3)', placeholder: 'https://...mp3' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Шапка */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-purple-600 font-medium text-sm">
          ← Артқа
        </button>
        <h1 className="font-bold text-gray-800 text-sm">{template.name}</h1>
        <button
          onClick={handleOrder}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700"
        >
          Таңдау →
        </button>
      </div>

      {/* Мобильные табы */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-white border-b flex lg:hidden">
        <button
          onClick={() => setTab('edit')}
          className={`flex-1 py-2 text-sm font-semibold ${tab === 'edit' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
        >
          ✏️ Өзгерту
        </button>
        <button
          onClick={() => setTab('preview')}
          className={`flex-1 py-2 text-sm font-semibold ${tab === 'preview' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
        >
          👁 Қарау
        </button>
      </div>

      {/* Основной контент */}
      <div className="pt-24 lg:pt-16 flex h-screen">

        {/* Левая панель — форма */}
        <div className={`w-full lg:w-2/5 bg-white overflow-y-auto border-r ${tab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="p-6 space-y-4">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Деректерді өзгертіңіз</h2>
            <p className="text-gray-500 text-sm mb-6">Өзгерістер оң жақта бірден көрінеді</p>

            {fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  value={data[field.key] || ''}
                  onChange={e => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            ))}

            {/* Фото */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Фото</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              />
              {uploading && <p className="text-purple-500 text-xs mt-1">Жүктелуде...</p>}
              {data.photo_url && (
                <img src={data.photo_url} alt="Фото" className="mt-2 w-full h-32 object-cover rounded-xl" />
              )}
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition mt-4"
            >
              Осы үлгіні таңдау →
            </button>

            <p className="text-center text-gray-400 text-xs">
              Таңдағаннан кейін төлем жасауыңыз қажет
            </p>
          </div>
        </div>

        {/* Правая панель — превью */}
        <div className={`w-full lg:w-3/5 overflow-y-auto bg-gray-100 ${tab === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <div className="scale-90 origin-top">
            {TemplateComponent && <TemplateComponent data={data} />}
          </div>
        </div>

      </div>
    </div>
  )
}