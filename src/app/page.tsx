'use client'
import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'

type Card = { front: string; back: string }
type Mode = 'create' | 'study'

const STORAGE_KEY = 'flashcards-v1'

export default function Home() {
  const { t, lang } = useI18n()
  const [mode, setMode] = useState<Mode>('create')
  const [cards, setCards] = useState<Card[]>([])
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setCards(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
    } catch {}
  }, [cards, loaded])

  const addCard = () => {
    if (!front.trim() || !back.trim()) return
    setCards(prev => [...prev, { front: front.trim(), back: back.trim() }])
    setFront('')
    setBack('')
  }

  const removeCard = (i: number) => {
    setCards(prev => prev.filter((_, idx) => idx !== i))
  }

  const startStudy = () => {
    if (cards.length === 0) return
    setCurrentIdx(0)
    setIsFlipped(false)
    setResults([])
    setFinished(false)
    setMode('study')
  }

  const judge = (correct: boolean) => {
    const newResults = [...results, correct]
    setResults(newResults)
    if (currentIdx + 1 >= cards.length) {
      setFinished(true)
    } else {
      setCurrentIdx(i => i + 1)
      setIsFlipped(false)
    }
  }

  const correctCount = results.filter(Boolean).length

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t.appName}</h1>
        <p className="text-base text-gray-500">{t.tagline}</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode('create'); setFinished(false) }}
          className={`flex-1 min-h-[44px] rounded-full font-medium text-sm transition-colors ${mode === 'create' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {lang === 'ja' ? '作成' : 'Create'}
        </button>
        <button
          onClick={startStudy}
          disabled={cards.length === 0}
          className={`flex-1 min-h-[44px] rounded-full font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${mode === 'study' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {lang === 'ja' ? `学習（${cards.length}枚）` : `Study (${cards.length})`}
        </button>
      </div>

      {mode === 'create' && (
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {lang === 'ja' ? '表（問題）' : 'Front (Question)'}
              </label>
              <textarea
                value={front}
                onChange={e => setFront(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={lang === 'ja' ? '例：photosynthesis' : 'e.g. photosynthesis'}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {lang === 'ja' ? '裏（答え）' : 'Back (Answer)'}
              </label>
              <textarea
                value={back}
                onChange={e => setBack(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={lang === 'ja' ? '例：光合成' : 'e.g. Process of converting light to energy'}
              />
            </div>
            <button
              onClick={addCard}
              disabled={!front.trim() || !back.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium min-h-[44px] rounded-lg transition-colors text-sm"
            >
              {lang === 'ja' ? '+ カードを追加' : '+ Add Card'}
            </button>
          </div>

          {cards.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-gray-500 px-1">
                {lang === 'ja' ? `登録済み：${cards.length}枚` : `${cards.length} cards saved`}
              </div>
              {cards.map((card, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-800 truncate">{card.front}</div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">{card.back}</div>
                  </div>
                  <button
                    onClick={() => removeCard(i)}
                    className="text-gray-400 hover:text-red-500 text-xl leading-none flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50"
                    aria-label="delete"
                  >×</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {mode === 'study' && !finished && cards.length > 0 && (
        <>
          <div className="text-center text-sm text-gray-500 mb-4">
            {currentIdx + 1} / {cards.length}
          </div>

          <div
            onClick={() => setIsFlipped(f => !f)}
            className="cursor-pointer bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6 min-h-[220px] flex flex-col items-center justify-center text-center select-none hover:border-purple-300 transition-colors"
          >
            {!isFlipped ? (
              <>
                <div className="text-xs text-purple-500 font-medium mb-3 uppercase tracking-wider">
                  {lang === 'ja' ? '表（タップで答え）' : 'Front (tap to reveal)'}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-pre-wrap">{cards[currentIdx]?.front}</div>
              </>
            ) : (
              <>
                <div className="text-xs text-green-500 font-medium mb-3 uppercase tracking-wider">
                  {lang === 'ja' ? '裏（答え）' : 'Back (Answer)'}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-pre-wrap">{cards[currentIdx]?.back}</div>
              </>
            )}
          </div>

          {isFlipped && (
            <div className="flex gap-3">
              <button
                onClick={() => judge(false)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold min-h-[52px] rounded-xl text-lg transition-colors"
              >✗ {lang === 'ja' ? '不正解' : 'Wrong'}</button>
              <button
                onClick={() => judge(true)}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-bold min-h-[52px] rounded-xl text-lg transition-colors"
              >✓ {lang === 'ja' ? '正解' : 'Correct'}</button>
            </div>
          )}
        </>
      )}

      {mode === 'study' && finished && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {correctCount} / {cards.length}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {lang === 'ja' ? '正解率' : 'Accuracy'}
          </div>
          <div className="text-5xl font-bold text-purple-600 mb-5">
            {Math.round(correctCount / cards.length * 100)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(correctCount / cards.length * 100)}%` }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setMode('create'); setFinished(false) }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium min-h-[44px] rounded-lg transition-colors"
            >
              {lang === 'ja' ? '編集に戻る' : 'Back to Edit'}
            </button>
            <button
              onClick={startStudy}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium min-h-[44px] rounded-lg transition-colors"
            >
              {lang === 'ja' ? 'もう一度' : 'Try Again'}
            </button>
          </div>
        </div>
      )}

      {mode === 'study' && cards.length === 0 && (
        <p className="text-center text-sm text-gray-400 mt-4">
          {lang === 'ja' ? 'まずはカードを作成してください' : 'Create cards first'}
        </p>
      )}
    </main>
  )
}
