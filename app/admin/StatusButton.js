'use client'

import { updateOrderStatus } from './actions'

export default function StatusButton({ orderId, status }) {
  if (status === 'paid' || status === 'done') {
    return (
      <button
        onClick={() => updateOrderStatus(orderId, 'pending')}
        className="text-xs text-gray-400 hover:text-red-500 mt-1 block"
      >
        Отменить
      </button>
    )
  }

  return (
    <button
      onClick={() => updateOrderStatus(orderId, 'paid')}
      className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
    >
      Подтвердить оплату
    </button>
  )
}