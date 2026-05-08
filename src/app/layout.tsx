import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import { HowToProvider } from '@/lib/howToContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { HowToDrawer } from '@/components/HowToDrawer'
import { HowToLayout } from '@/components/HowToLayout'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { PaywallBanner } from '@/components/PaywallBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// TODO: アプリ名・descriptionを書き換える
export const metadata: Metadata = {
  title: '【アプリ名】 | 無料ツール',
  description: '【SEO説明文（日本語＋English hybrid推奨）】',
  openGraph: {
    title: '【アプリ名】 | 無料ツール',
    description: '【OGP説明文】',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <I18nProvider>
          <HowToProvider>
            {/* HowToLayout：PCでパネルが開いたときにコンテンツを左に寄せる */}
            <HowToLayout>
              <Header />
              {children}
              <Footer />
            </HowToLayout>
            {/* 右側スライドインパネル */}
            <HowToDrawer />
            {/* フィードバックボタン（右下フローティング） */}
            <FeedbackWidget />
            {/* 使用量上限CTA（100ユーザー達成後に表示） */}
            <PaywallBanner />
            <CookieBanner />
          </HowToProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
