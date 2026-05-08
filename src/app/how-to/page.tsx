// スマホで「使い方」ボタンを押したとき、別タブで開くページ
import type { Metadata } from 'next'
import { ja } from '@/messages/ja'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: `使い方 | ${ja.appName}`,
}

export default function HowToPage() {
  const t = ja
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-blue-600 px-6 py-5 flex items-center gap-2">
        <BookOpen size={20} className="text-white" />
        <h1 className="text-white font-bold text-base">{t.howToTitle}</h1>
      </div>

      {/* コンテンツ */}
      <div className="max-w-lg mx-auto px-6 py-8 space-y-8">
        {t.howToSteps.map((step, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <div className="space-y-1.5">
              <h2 className="font-bold text-gray-800 text-sm">{step.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}

        {t.howToNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm text-amber-800 leading-relaxed">{t.howToNote}</p>
          </div>
        )}
      </div>
    </div>
  )
}
