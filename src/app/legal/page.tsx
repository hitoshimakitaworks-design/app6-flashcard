'use client'
import { useI18n } from '@/lib/i18n'

// TODO: アプリ名を書き換える
const APP_NAME_JA = '【アプリ名（日本語）】'
const APP_NAME_EN = '[App Name (English)]'

export default function LegalPage() {
  const { lang } = useI18n()

  if (lang === 'en') return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Legal Notice (Japan Specified Commercial Transactions Act)</h1>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {([
            ['Service Name', APP_NAME_EN],
            ['Operator', 'Hitoshi Makita'],
            ['Email', 'hitoshi.makita.works@gmail.com'],
            ['Address', 'Available upon request'],
            ['Price', 'Free (paid features listed on pricing page)'],
            ['Payment Method', 'Credit card (Stripe)'],
            ['Service Start', 'Immediately after payment confirmation'],
            ['Cancellation Policy', 'Subscriptions can be cancelled anytime. No refunds for current billing period.'],
          ] as [string, string][]).map(([k, v]) => (
            <tr key={k} className="border-b border-gray-200">
              <td className="py-3 pr-4 font-medium text-gray-600 w-40 align-top">{k}</td>
              <td className="py-3 text-gray-800">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">特定商取引法に基づく表記</h1>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {([
            ['サービス名', APP_NAME_JA],
            ['販売事業者', '蒔田仁'],
            ['メールアドレス', 'hitoshi.makita.works@gmail.com'],
            ['所在地', '請求があった場合は遅滞なく開示します'],
            ['電話番号', '請求があった場合は遅滞なく開示します'],
            ['販売価格', '無料（有料機能は価格ページに記載）'],
            ['支払方法', 'クレジットカード（Stripe）'],
            ['サービス提供時期', '決済完了後、即時'],
            ['返品・解約', 'サブスクリプションはアカウント設定からいつでも解約可能。当月分の返金は行いません。'],
          ] as [string, string][]).map(([k, v]) => (
            <tr key={k} className="border-b border-gray-200">
              <td className="py-3 pr-4 font-medium text-gray-600 w-44 align-top">{k}</td>
              <td className="py-3 text-gray-800">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
