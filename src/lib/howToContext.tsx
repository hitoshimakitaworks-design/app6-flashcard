'use client'
import { createContext, useContext, useState } from 'react'

type HowToCtx = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const HowToContext = createContext<HowToCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
})

export function HowToProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <HowToContext.Provider value={{
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(v => !v),
    }}>
      {children}
    </HowToContext.Provider>
  )
}

export const useHowTo = () => useContext(HowToContext)
