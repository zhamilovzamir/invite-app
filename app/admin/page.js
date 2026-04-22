import { supabase } from '@/lib/supabase'
import StatusButton from './StatusButton'

export default async function AdminPage() {
  const { data: orders } = await supabase
    .from('orders')
    .select('*, templates(name)')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Админка — Заказы</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Клиент</th>
                <th className="text-left p-4">Телефон</th>
                <th className="text-left p-4">Шаблон</th>
                <th className="text-left p-4">Данные</th>
                <th className="text-left p-4">Статус</th>
                <th className="text-left p-4">Дата</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{order.customer_name}</td>
                  <td className="p-4">{order.customer_phone}</td>
                  <td className="p-4">{order.templates?.name}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>{order.custom_data?.guest_name}</div>
                    <div>{order.custom_data?.event_date}</div>
                    <div>{order.custom_data?.venue}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'done'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status === 'paid' ? 'Оплачен'
                        : order.status === 'done' ? 'Готово'
                        : 'Ожидает'}
                    </span>
                    <StatusButton orderId={order.id} status={order.status} />
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('ru-RU')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders?.length === 0 && (
            <div className="text-center p-12 text-gray-500">
              Заказов пока нет
            </div>
          )}
        </div>
      </div>
    </main>
  )
}