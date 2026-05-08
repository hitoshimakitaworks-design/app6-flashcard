'use client'
import { useI18n } from '@/lib/i18n'

const APP_NAME_JA = '【アプリ名（日本語）】'
const APP_NAME_EN = '[App Name (English)]'

export default function TermsPage() {
  const { lang } = useI18n()

  if (lang === 'en') return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">1. Service Overview</h2>
        <p className="text-sm text-gray-700">{APP_NAME_EN} is a free browser-based tool. No registration is required for basic use.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">2. Prohibited Use</h2>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Using the service for fraudulent, illegal, or harmful purposes</li>
          <li>Attempting to reverse-engineer or disrupt the service</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">3. Disclaimer</h2>
        <p className="text-sm text-gray-700">This service is provided "as is." We are not responsible for any damages arising from use.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">4. Changes</h2>
        <p className="text-sm text-gray-700">We may update these terms at any time. Continued use constitutes acceptance.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">5. Contact</h2>
        <p className="text-sm text-gray-700">hitoshi.makita.works@gmail.com</p>
      </section>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">利用規約</h1>
      <p className="text-sm text-gray-500 mb-8">最終更新：2026年5月</p>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">1. サービス概要</h2>
        <p className="text-sm text-gray-700">{APP_NAME_JA}は、ブラウザ上で無料で利用できるツールです。基本機能の利用に登録は不要です。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">2. 禁止事項</h2>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>不正・違法・有害な目的でのサービス利用</li>
          <li>サービスのリバースエンジニアリングまたは妨害行為</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">3. 免責事項</h2>
        <p className="text-sm text-gray-700">本サービスは現状有姿で提供されます。利用により生じた損害について当方は責任を負いません。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">4. 規約の変更</h2>
        <p className="text-sm text-gray-700">本規約はいつでも更新される場合があります。変更後も継続利用した場合、新しい規約に同意したものとみなします。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">5. お問い合わせ</h2>
        <p className="text-sm text-gray-700">hitoshi.makita.works@gmail.com</p>
      </section>
    </main>
  )
}
