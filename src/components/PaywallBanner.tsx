'use client'
import { isPaidEnabled, isOverFreeLimit, FREE_LIMIT } from '@/lib/planGate'
import { Zap } from 'lucide-react'

// 使用量制限に達したときに表示するCTAバナー
// NEXT_PUBLIC_ENABLE_PAID=false のときは何も表示しない（100ユーザー達成まで非表示）
export function PaywallBanner() {
  if (!isPaidEnabled) return null
  if (!isOverFreeLimit()) return null

  const handleUpgrade = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-yellow-300 flex-shrink-0" />
          <p className="text-sm font-medium">
            無料プランの利用上限（{FREE_LIMIT}回）に達しました。プロプランで無制限に使えます。
          </p>
        </div>
        <button
          onClick={handleUpgrade}
          className="flex-shrink-0 bg-white text-blue-600 font-bold text-sm px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
        >
          アップグレード
        </button>
      </div>
    </div>
  )
}
