'use client'
import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export function CookieBanner() {
  const { lang } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  const text = {
    ja: { message: 'このサイトはCookieを使用しています。サービス改善・アクセス解析のためにCookieを利用する場合があります。', accept: '同意する', details: 'プライバシーポリシー' },
    en: { message: 'This site uses cookies to improve your experience and analyze traffic.', accept: 'Accept', details: 'Privacy Policy' },
  }[lang]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 no-print">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm flex-1">{text.message}</p>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/privacy" className="text-sm text-gray-300 underline hover:text-white whitespace-nowrap">
            {text.details}
          </Link>
          <button
            onClick={accept}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded whitespace-nowrap"
          >
            {text.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
