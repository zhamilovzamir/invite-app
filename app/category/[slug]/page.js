import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const categoryIcons = {
  'uilenu-toi': '💍',
  'uzatu-toi': '🌺',
  'sauilik-toi': '👶',
  'tugan-kun': '🎂',
}

export default async function CategoryPage({ params }) {
  const { slug } = await params

  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .eq('category_slug', slug)
    .order('is_premium', { ascending: true })

  if (!templates || templates.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Үлгілер табылмады</p>
      </div>
    )
  }

  const categoryName = templates[0]?.category

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Шапка */}
      <div className="bg-white border-b px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-purple-600 text-sm mb-4 block">
            ← Артқа
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{categoryIcons[slug] || '🎉'}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
              <p className="text-gray-500">{templates.length} үлгі қол жетімді</p>
            </div>
          </div>
        </div>
      </div>

      {/* Шаблоны */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/demo/${template.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
            >
              {/* Превью */}
              <div className={`h-48 flex items-center justify-center text-6xl
                ${slug === 'uilenu-toi' ? 'bg-gradient-to-br from-pink-100 to-rose-200' :
                  slug === 'uzatu-toi' ? 'bg-gradient-to-br from-red-100 to-red-200' :
                  slug === 'sauilik-toi' ? 'bg-gradient-to-br from-blue-100 to-indigo-200' :
                  'bg-gradient-to-br from-amber-100 to-orange-200'}`}>
                {categoryIcons[slug] || '🎉'}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition">
                    {template.name}
                  </h3>
                  {template.is_premium && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-4">{template.description}</p>
                <span className="text-purple-600 text-sm font-medium group-hover:underline">
                  Үлгіні қарау →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}