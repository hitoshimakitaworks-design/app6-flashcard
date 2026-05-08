'use client'
import { useI18n } from '@/lib/i18n'

// TODO: アプリ名を書き換える（2箇所）
const APP_NAME_JA = '【アプリ名（日本語）】'
const APP_NAME_EN = '[App Name (English)]'

export default function PrivacyPage() {
  const { lang } = useI18n()

  if (lang === 'en') return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
        <p className="text-sm text-gray-700">{APP_NAME_EN} processes all data locally in your browser. No personal data is sent to our servers unless you contact us by email.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">2. Cookies and Analytics</h2>
        <p className="text-sm text-gray-700">We may use Google Analytics and Google AdSense cookies to analyze usage and display relevant ads. You can manage these through your browser settings.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">3. Third-Party Services</h2>
        <p className="text-sm text-gray-700">We do not sell or share your personal information with third parties except as required by law.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">4. Contact</h2>
        <p className="text-sm text-gray-700">hitoshi.makita.works@gmail.com</p>
      </section>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
      <p className="text-sm text-gray-500 mb-8">最終更新：2026年5月</p>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">1. 収集する情報</h2>
        <p className="text-sm text-gray-700">本サービス（{APP_NAME_JA}）は、入力データをブラウザ上でのみ処理し、サーバーには送信しません。お問い合わせメール以外に個人情報をサーバーに送信することはありません。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">2. Cookieとアクセス解析</h2>
        <p className="text-sm text-gray-700">サービス改善のため、Google Analytics・Google AdSense等のCookieを利用する場合があります。Cookieの設定はブラウザから変更できます。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">3. 第三者への提供</h2>
        <p className="text-sm text-gray-700">法令に基づく場合を除き、個人情報を第三者に提供・販売することはありません。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">4. お問い合わせ</h2>
        <p className="text-sm text-gray-700">hitoshi.makita.works@gmail.com</p>
      </section>
    </main>
  )
}
