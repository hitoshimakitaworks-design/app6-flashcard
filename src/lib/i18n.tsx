'use client'
import { createContext, useContext, useState } from 'react'
import { ja } from '@/messages/ja'
import { en } from '@/messages/en'

type Lang = 'ja' | 'en'
const messages = { ja, en }

type I18nCtx = { lang: Lang; t: typeof ja; toggle: () => void }
const I18nContext = createContext<I18nCtx>({ lang: 'ja', t: ja, toggle: () => {} })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja')
  const toggle = () => setLang(l => (l === 'ja' ? 'en' : 'ja'))
  return (
    <I18nContext.Provider value={{ lang, t: messages[lang], toggle }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
