'use client'
import { useState } from 'react'
import { MessageCircle, X, Send, CheckCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

type State = 'idle' | 'open' | 'sending' | 'done'

export function FeedbackWidget() {
  const { t } = useI18n()
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!message.trim()) return
    setState('sending')
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          url: window.location.href,
          appName: document.title,
        }),
      })
      setState('done')
      setMessage('')
    } catch {
      setState('open')
    }
  }

  const close = () => {
    setState('idle')
    setMessage('')
  }

  return (
    <>
      {/* フローティングボタン（PaywallBannerが出ていても重ならない位置） */}
      {state === 'idle' && (
        <button
          onClick={() => setState('open')}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all no-print"
        >
          <MessageCircle size={14} />
          {t.feedbackButton}
        </button>
      )}

      {/* モーダルオーバーレイ */}
      {(state === 'open' || state === 'sending' || state === 'done') && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 no-print">
          {/* 背景（クリックで閉じる） */}
          <div className="absolute inset-0 bg-black/20" onClick={close} />

          {/* モーダル本体 */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100">
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-600" />
                <span className="font-bold text-gray-800 text-sm">{t.feedbackTitle}</span>
              </div>
              <button onClick={close} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* コンテンツ */}
            <div className="p-5">
              {state === 'done' ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <CheckCircle size={40} className="text-green-500" />
                  <p className="text-sm text-gray-700 leading-relaxed">{t.feedbackSuccess}</p>
                  <button
                    onClick={close}
                    className="mt-2 text-xs text-gray-500 underline hover:text-gray-700"
                  >
                    {t.feedbackClose}
                  </button>
                </div>
              ) : (
                <>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={t.feedbackPlaceholder}
                    rows={4}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    disabled={state === 'sending'}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!message.trim() || state === 'sending'}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={14} />
                    {state === 'sending' ? '送信中...' : t.feedbackSubmit}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
