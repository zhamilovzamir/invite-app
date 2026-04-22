import { supabase } from '@/lib/supabase'

export default async function TemplatePage({ params }) {
  const { id } = await params
  
  const { data: template } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single()

  if (!template) {
    return <div className="p-8">Шаблон не найден</div>
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-blue-500 mb-6 block">← Назад</a>
        
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-4">{template.name}</h1>
          <p className="text-gray-600 mb-6">{template.description}</p>
          
          <div className="flex gap-3 mb-8">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {template.category}
            </span>
            {template.is_premium && (
              <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded">
                Premium
              </span>
            )}
          </div>

          <a
            href={`/templates/${template.id}/edit`}
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Редактировать шаблон
          </a>
        </div>
      </div>
    </main>
  )
}