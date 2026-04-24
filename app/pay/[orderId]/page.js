import { supabase } from '@/lib/supabase'

export default async function PayPage({ params }) {
  const { orderId } = await params

  const { data: order } = await supabase
    .from('orders')
    .select('*, templates(name)')
    .eq('id', orderId)
    .single()

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Заказ не найден</p>
      </div>
    )
  }

  if (order.is_paid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow p-8 max-w-sm w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Уже оплачено!</h2>
          <a
            href={`/invite/${orderId}`}
            className="block mt-4 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700"
          >
            Открыть приглашение →
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Оплата</h1>
        <p className="text-gray-500 text-center mb-8">
          {order.templates?.name}
        </p>

        {/* Сумма */}
        <div className="bg-purple-50 rounded-2xl p-6 text-center mb-6">
          <p className="text-gray-500 text-sm mb-1">К оплате</p>
          <p className="text-4xl font-bold text-purple-600">1 990 ₸</p>
        </div>

        {/* Kaspi инструкция */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3">
          <p className="font-semibold text-gray-800">Как оплатить:</p>
          <div className="flex items-start gap-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
            <p className="text-gray-600 text-sm">Откройте Kaspi.kz или приложение Kaspi</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
            <p className="text-gray-600 text-sm">Переведите <strong>1 990 ₸</strong> на номер:</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-purple-100">
            <p className="text-2xl font-bold text-purple-600">+7 777 123 45 67</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
            <p className="text-gray-600 text-sm">Отправьте скриншот оплаты в WhatsApp</p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="space-y-3">
          <a
            href="https://wa.me/77771234567?text=Оплатил приглашение. ID заказа: ${orderId}"
            className="block w-full text-center bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition"
          >
            📱 Отправить скриншот в WhatsApp
          </a>
          <a
            href={`/invite/${orderId}`}
            className="block w-full text-center bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            ← Вернуться к приглашению
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          После подтверждения оплаты приглашение активируется в течение 15 минут
        </p>
      </div>
    </main>
  )
}