import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-white">
      {/* Навигация */}
      <nav className="border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">InviteApp</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <a href="#templates" className="hover:text-purple-600">Шаблоны</a>
          <a href="#how" className="hover:text-purple-600">Как это работает</a>
        </div>
      </nav>

      {/* Герой секция */}
      <section className="text-center py-24 px-8 bg-gradient-to-b from-purple-50 to-white">
        <h2 className="text-5xl font-bold mb-6 text-gray-900">
          Красивые приглашения<br/>
          <span className="text-purple-600">за 5 минут</span>
        </h2>
        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
          Выбери шаблон, добавь свои данные и поделись ссылкой с гостями
        </p>
        <a
          href="#templates"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
        >
          Выбрать шаблон
        </a>
      </section>

      {/* Как это работает */}
      <section id="how" className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Как это работает</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Выбери шаблон', desc: 'Более 10 красивых дизайнов для любого события' },
              { step: '2', title: 'Заполни данные', desc: 'Добавь имена, дату, место и своё фото' },
              { step: '3', title: 'Поделись ссылкой', desc: 'Отправь гостям уникальную ссылку на приглашение' },
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

      {/* Шаблоны */}
      <section id="templates" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">Шаблоны</h3>
          <p className="text-center text-gray-500 mb-12">Выбери подходящий дизайн для твоего события</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates?.map((template) => (
              <a
                key={template.id}
                href={`/templates/${template.id}`}
                className="group block rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow"
              >
                {/* Превью шаблона */}
                <div className={`h-48 flex items-center justify-center text-white text-6xl
                  ${template.category === 'wedding' ? 'bg-gradient-to-br from-pink-400 to-rose-500' :
                    template.category === 'birthday' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                    'bg-gradient-to-br from-blue-400 to-indigo-500'}`}>
                  {template.category === 'wedding' ? '💍' :
                   template.category === 'birthday' ? '🎂' : '🎉'}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
                      {template.name}
                    </h4>
                    {template.is_premium && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{template.description}</p>
                  <span className="text-purple-600 text-sm font-medium group-hover:underline">
                    Использовать →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t py-8 px-8 text-center text-gray-400 text-sm">
        © 2025 InviteApp — Красивые приглашения онлайн
      </footer>
    </main>
  )
}