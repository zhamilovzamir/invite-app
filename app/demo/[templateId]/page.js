import { supabase } from '@/lib/supabase'
import DemoEditor from '@/components/DemoEditor'

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

  return <DemoEditor template={template} />
}