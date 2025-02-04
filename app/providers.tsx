"use client"

import { SettingsProvider } from "@/contexts/SettingsContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>
}

