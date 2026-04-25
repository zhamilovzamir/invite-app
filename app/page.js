import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const categoryIcons = {
  'uilenu-toi': '💍',
  'uzatu-toi': '🌺',
  'sauilik-toi': '👶',
  'tugan-kun': '🎂',
}

const categoryColors = {
  'uilenu-toi': 'from-pink-400 to-rose-500',
  'uzatu-toi': 'from-red-400 to-red-600',
  'sauilik-toi': 'from-blue-400 to-indigo-500',
  'tugan-kun': 'from-amber-400 to-orange-500',
}

export default async function Home() {
  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: true })

  // Группируем по категориям
  const categories = {}
  templates?.forEach((t) => {
    if (!categories[t.category_slug]) {
      categories[t.category_slug] = {
        name: t.category,
        slug: t.category_slug,
        templates: [],
      }
    }
    categories[t.category_slug].templates.push(t)
  })

  return (
    <main className="min-h-screen bg-white">

      {/* Навигация */}
      <nav className="border-b px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-40">
        <h1 className="text-2xl font-bold text-purple-600">InviteApp</h1>
        <a href="/find" className="text-sm text-gray-500 hover:text-purple-600">
          Сілтемені табу
        </a>
      </nav>

      {/* Герой */}
      <section className="text-center py-24 px-8 bg-gradient-to-b from-purple-50 to-white">
        <h2 className="text-5xl font-bold mb-6 text-gray-900">
          Әдемі шақырулар<br/>
          <span className="text-purple-600">5 минутта</span>
        </h2>
        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
          Үлгіні таңдаңыз, деректеріңізді енгізіңіз және қонақтарыңызбен бөлісіңіз
        </p>
        <a
          href="#categories"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
        >
          Үлгіні таңдау
        </a>
      </section>
      
      {/* Как это работает */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Қалай жұмыс істейді</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Үлгіні таңдаңыз', desc: 'Той түріңізге сәйкес үлгіні таңдаңыз' },
              { step: '2', title: 'Деректерді толтырыңыз', desc: 'Аты-жөн, күні, орны және фотосуретті қосыңыз' },
              { step: '3', title: 'Сілтемемен бөлісіңіз', desc: 'Қонақтарыңызға бірегей сілтемені жіберіңіз' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Категории */}
      <section id="categories" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">Той түрін таңдаңыз</h3>
          <p className="text-center text-gray-500 mb-12">Әр той үшін арнайы үлгілер</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(categories).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${categoryColors[category.slug] || 'from-purple-400 to-purple-600'} p-10 text-white`}>
                  <div className="text-6xl mb-4">
                    {categoryIcons[category.slug] || '🎉'}
                  </div>
                  <h4 className="text-3xl font-bold mb-2">{category.name}</h4>
                  <p className="opacity-80 text-sm">
                    {category.templates.length} үлгі қол жетімді
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium group-hover:bg-opacity-30 transition">
                    Үлгілерді қарау →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t py-8 px-8 text-center text-gray-400 text-sm">
        © 2025 InviteApp — Әдемі шақырулар онлайн
      </footer>
    </main>
  )
}