'use client'
import { GraduationCap, BookOpen } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useHowTo } from '@/lib/howToContext'

export function Header() {
  const { t, lang, toggle } = useI18n()
  const { isOpen, toggle: toggleHowTo } = useHowTo()

  const handleHowTo = () => {
    // スマホ（768px未満）は別タブで開く、PCはサイドパネルを開く
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.open('/how-to', '_blank')
    } else {
      toggleHowTo()
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 no-print">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-purple-600" size={22} />
          <span className="font-bold text-gray-800 text-sm md:text-base">{t.appName}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 使い方ボタン */}
          <button
            onClick={handleHowTo}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 min-h-[44px] rounded-full border transition-colors ${
              isOpen
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen size={13} />
            {t.howToButton}
          </button>
          {/* 言語切替ボタン */}
          <button
            onClick={toggle}
            className="text-xs font-medium px-3 min-h-[44px] rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>
        </div>
      </div>
    </header>
  )
}
