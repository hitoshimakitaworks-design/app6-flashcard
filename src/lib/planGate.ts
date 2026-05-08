// 有料プランの判定ユーティリティ
// NEXT_PUBLIC_ENABLE_PAID=true にするまで、有料化UIはすべて非表示

export const isPaidEnabled = process.env.NEXT_PUBLIC_ENABLE_PAID === 'true'

// 将来：Supabaseのusersテーブルからユーザープランを取得する関数
// plan カラム: 'free' | 'pro'
export type Plan = 'free' | 'pro'

// クライアント側で使用量制限をチェックするためのキー（localStorage）
export const USAGE_KEY = 'app_usage_count'
export const FREE_LIMIT = 10  // TODO: アプリに合わせて変更

export function getUsageCount(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(USAGE_KEY) ?? '0', 10)
}

export function incrementUsage(): number {
  const count = getUsageCount() + 1
  localStorage.setItem(USAGE_KEY, String(count))
  return count
}

export function isOverFreeLimit(): boolean {
  if (!isPaidEnabled) return false  // 有料化OFF時は制限なし
  return getUsageCount() >= FREE_LIMIT
}
