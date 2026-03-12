import { createContext, useContext } from "react"
import type { Locale, Translations } from "./i18n"
import type { Player } from "./players-data"

export interface User {
  id: string
  email: string
  name: string
  passwordHash: string // stored as plain text for client-only demo (no backend)
  role: "admin"
  createdAt: string
}

export interface AppState {
  locale: Locale
  translations: Translations
  customTranslations: Record<string, Record<string, string>>
  players: Player[]
  compareList: string[]
  isAdminAuthenticated: boolean
  currentUser: User | null
  users: User[]
}

export interface AppContextType {
  state: AppState
  setLocale: (locale: Locale) => void
  setPlayers: (players: Player[]) => void
  addPlayer: (player: Player) => void
  updatePlayer: (id: string, player: Partial<Player>) => void
  deletePlayer: (id: string) => void
  toggleCompare: (playerId: string) => void
  clearCompare: () => void
  updateTranslation: (section: string, key: string, value: string) => void
  setAdminAuth: (auth: boolean) => void
  registerUser: (email: string, name: string, password: string) => { ok: boolean; error?: string }
  loginUser: (email: string, password: string) => { ok: boolean; error?: string }
  logoutUser: () => void
  t: Translations
}

export const AppContext = createContext<AppContextType | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
