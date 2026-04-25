import { supabase } from '@/lib/supabase'
import WeddingClassic from '@/components/templates/wedding/classic'
import KyzUzatuClassic from '@/components/templates/kyz-uzatu/classic'
import KyzUzatuModern from '@/components/templates/kyz-uzatu/modern'
import TusauKeserClassic from '@/components/templates/tusau-keser/classic'

const templateMap = {
  'uilenu-toi-classic': WeddingClassic,
  'uilenu-toi-modern': WeddingClassic,
  'uzatu-toi-classic': KyzUzatuClassic,
  'uzatu-toi-modern': KyzUzatuModern,
  'sauilik-toi-classic': TusauKeserClassic,
  'sauilik-toi-colorful': TusauKeserClassic,
  'tugan-kun-classic': TusauKeserClassic,
  'tugan-kun-minimal': TusauKeserClassic,
}

export default async function InvitePage({ params }) {
  const { orderId } = await params

  const { data: order } = await supabase
    .from('orders')
    .select('*, templates(name, category_slug, slug)')
    .eq('id', orderId)
    .single()

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Приглашение не найдено</p>
      </div>
    )
  }

  const categorySlug = order.templates?.category_slug || 'wedding'
  const slug = order.templates?.slug || 'classic'
  const key = `${categorySlug}-${slug}`

  const TemplateComponent = templateMap[key] || WeddingClassic

  const templateData = {
    ...order.custom_data,
    orderId: order.id,
    isPaid: order.is_paid,
  }

  return (
    <div className="relative">
      <TemplateComponent data={templateData} />

      {/* Watermark если не оплачено */}
      {!order.is_paid && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Верхний баннер */}
          <div className="pointer-events-auto fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-center py-3 px-4 font-semibold text-sm z-50">
            ⚠️ Демо версия — оплатите для активации •{' '}
            <a
              href={`/pay/${order.id}`}
              className="underline font-bold hover:text-yellow-700"
            >
              Оплатить сейчас
            </a>
          </div>

          {/* Водяной знак по центру */}
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className="text-gray-300 text-6xl font-bold uppercase select-none"
              style={{
                transform: 'rotate(-45deg)',
                opacity: 0.15,
                fontSize: '80px',
                whiteSpace: 'nowrap'
              }}
            >
              DEMO
            </div>
          </div>
        </div>
      )}
    </div>
  )
}