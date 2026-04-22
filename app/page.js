import { supabase } from '@/lib/supabase'

export default async function Home() {
  // Получаем шаблоны из базы
  const { data: templates, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('Templates data:', templates)
  console.log('Error:', error)

  if (error) {
    console.error('Error fetching templates:', error)
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Шаблоны приглашений</h1>
          <p className="text-red-500">Ошибка загрузки данных: {error.message}</p>
        </div>
      </main>
    )
  }

  if (!templates || templates.length === 0) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Шаблоны приглашений</h1>
          <p>Нет доступных шаблонов.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Шаблоны приглашений</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates?.map((template) => (
            <a key={template.id} href={`/templates/${template.id}`} className="bg-white rounded-lg shadow p-6 block hover:shadow-lg transition-shadow">

              <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {template.category}
                </span>
                {template.is_premium && (
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}