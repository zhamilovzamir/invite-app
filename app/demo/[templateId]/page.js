import { supabase } from '@/lib/supabase'
import WeddingClassic from '@/components/templates/wedding/classic'
import WeddingRed from '@/components/templates/wedding/red'
import UzatuClassic from '@/components/templates/uzatu/classic'
import UzatuModern from '@/components/templates/uzatu/modern'
import SauilikClassic from '@/components/templates/sauilik/classic'
import SauilikColorful from '@/components/templates/sauilik/colorful'
import TuganKunClassic from '@/components/templates/tugan-kun/classic'



const templateMap = {
  'uilenu-toi-classic': WeddingClassic,
  'uilenu-toi-red': WeddingRed,
  'uzatu-toi-classic': UzatuClassic,
  'sauilik-toi-classic': SauilikClassic,
  'sauilik-toi-colorful': SauilikClassic,
  'tugan-kun-classic': SauilikClassic,
  'tugan-kun-minimal': SauilikClassic,
  'uzatu-toi-modern': UzatuModern,
  'sauilik-toi-colorful': SauilikColorful,
  'tugan-kun-classic': TuganKunClassic,

}

// Тестовые данные для демо
const demoData = {
  guest_name: 'Айгүл & Берік',
  hosts: 'Қасымов Берік және Айгүл',
  event_date: '2025-06-15',
  event_time: '18:00',
  venue: 'Астана Палас мейрамханасы',
  map_url: 'https://maps.google.com',
  telegram_channel: '',
  photo_url: '',
  orderId: 'demo',
}

export default async function DemoPage({ params }) {
  const { templateId } = await params

  const { data: template } = await supabase
    .from('templates')
    .select('*')
    .eq('id', templateId)
    .single()

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Үлгі табылмады</p>
      </div>
    )
  }

  const key = `${template.category_slug}-${template.slug}`
  const TemplateComponent = templateMap[key] || UzatuClassic

  return (
    <div className="relative">
      <TemplateComponent data={demoData} />

      {/* Демо баннер */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-yellow-900 text-center py-3 px-4">
        <span className="font-semibold text-sm">
          ⭐ Демо режим — бұл сіздің деректеріңізбен көрінеді
        </span>
      </div>

      {/* Кнопка выбрать */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto flex gap-3">
          <a
            href={`/category/${template.category_slug}`}
            className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            ← Артқа
          </a>
          <a
            href={`/templates/${templateId}`}
            className="flex-1 text-center bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            Осы үлгіні таңдау →
          </a>
        </div>
      </div>
    </div>
  )
}