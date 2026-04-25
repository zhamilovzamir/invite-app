import { supabase } from '@/lib/supabase'
import CopyButton from './CopyButton'

export default async function DashboardPage({ params }) {
  const { orderId } = await params

  const { data: order } = await supabase
    .from('orders')
    .select('*, templates(name)')
    .eq('id', orderId)
    .single()

  const { data: responses } = await supabase
    .from('guest_responses')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: false })

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Заказ не найден</p>
      </div>
    )
  }

  const coming = responses?.filter(r => r.answer === 'yes') || []
  const notComing = responses?.filter(r => r.answer === 'no') || []

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Шапка */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-1">Менің тойым</h1>
          <p className="text-gray-500">{order.templates?.name}</p>
          <p className="text-gray-500 text-sm">{order.custom_data?.guest_name}</p>

          <div className="flex gap-3 mt-4">
            <a
              href={`/invite/${orderId}`}
              target="_blank"
              className="flex-1 text-center bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition text-sm"
            >
              🔗 Шақыру сілтемесі
            </a>
            <CopyButton orderId={orderId} />
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-gray-800">{responses?.length || 0}</p>
            <p className="text-gray-500 text-sm mt-1">Барлығы</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{coming.length}</p>
            <p className="text-gray-500 text-sm mt-1">Келеді</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-500">{notComing.length}</p>
            <p className="text-gray-500 text-sm mt-1">Келмейді</p>
          </div>
        </div>

        {/* Список гостей */}
        {responses?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="text-4xl mb-3">👥</div>
            <p className="text-gray-500">Әлі жауап жоқ</p>
            <p className="text-gray-400 text-sm mt-1">Қонақтар жауап бергенде осында көрінеді</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-700 px-1">Қонақтар жауабы</h2>
            {responses?.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow p-4 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                  r.answer === 'yes' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {r.answer === 'yes' ? '✅' : '❌'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-800">{r.guest_name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  {r.comment && (
                    <p className="text-gray-500 text-sm mt-1">💬 {r.comment}</p>
                  )}
                  <p className={`text-sm mt-1 font-medium ${
                    r.answer === 'yes' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {r.answer === 'yes' ? 'Келемін' : 'Келе алмаймын'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Футер */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-xs">
            Создано на <span className="text-purple-500 font-medium">InviteApp</span>
          </p>
        </div>
      </div>
    </main>
  )
}