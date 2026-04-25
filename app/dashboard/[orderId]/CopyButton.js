'use client'

export default function CopyButton({ orderId }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(`${window.location.origin}/invite/${orderId}`)}
      className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition text-sm"
    >
      📋 Көшіру
    </button>
  )
}