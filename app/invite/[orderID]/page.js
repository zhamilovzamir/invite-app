import { supabase } from '@/lib/supabase'
import WeddingClassic from '@/components/templates/wedding/classic'
import KyzUzatuClassic from '@/components/templates/kyz-uzatu/classic'
import KyzUzatuModern from '@/components/templates/kyz-uzatu/modern'
import TusauKeserClassic from '@/components/templates/tusau-keser/classic'

const templateMap = {
  'wedding-classic': WeddingClassic,
  'kyz-uzatu-classic': KyzUzatuClassic,
  'kyz-uzatu-modern': KyzUzatuModern,
  'tusau-keser-classic': TusauKeserClassic,
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
  }

  return <TemplateComponent data={templateData} />
}