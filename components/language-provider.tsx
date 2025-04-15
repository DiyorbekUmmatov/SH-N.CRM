"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "uz"

interface LanguageContextType {
  currentLanguage: Language
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
  }

  return <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
