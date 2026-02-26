"use client"

import type React from "react"

import { useAppSelector } from "@/store/hooks"
import { selectTheme } from "@/store/slices/themeSlice"
import { useEffect } from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}
