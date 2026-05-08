'use client'
import { useHowTo } from '@/lib/howToContext'

// PCでパネルが開いたときにメインコンテンツを左に寄せる（スプリットビュー）
export function HowToLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useHowTo()
  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'md:pr-[420px]' : ''}`}>
      {children}
    </div>
  )
}
