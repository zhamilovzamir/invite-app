'use client'

import { updateOrderStatus, activateOrder } from './actions'

export default function StatusButton({ orderId, status, isPaid, customerPhone }) {
  if (isPaid) {
    return (
      <span className="text-green-600 text-sm font-medium">✅ Активно</span>
    )
  }

  return (
    <button
      onClick={() => activateOrder(orderId, customerPhone)}
      className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 font-medium"
    >
      ✅ Подтвердить оплату
    </button>
  )
}