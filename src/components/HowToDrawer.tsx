'use client'
import { X, BookOpen } from 'lucide-react'
import { useHowTo } from '@/lib/howToContext'
import { useI18n } from '@/lib/i18n'

export function HowToDrawer() {
  const { isOpen, close } = useHowTo()
  const { t } = useI18n()

  return (
    <>
      {/* スマホ用オーバーレイ（パネル外クリックで閉じる） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={close}
        />
      )}

      {/* サイドパネル本体 */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-full md:w-[420px]
          bg-white shadow-2xl z-30
          flex flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-hidden={!isOpen}
      >
        {/* パネルヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-700 bg-blue-600 flex-shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-white" />
            <span className="font-bold text-white text-sm">{t.howToTitle}</span>
          </div>
          <button
            onClick={close}
            aria-label={t.howToClose}
            className="text-white hover:bg-blue-700 rounded-full p-1.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* スクロール可能なコンテンツ */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {t.howToSteps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-sm">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}

          {t.howToNote && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 leading-relaxed">{t.howToNote}</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
