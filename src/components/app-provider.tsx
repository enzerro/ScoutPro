import React, { useState, useCallback, useMemo } from "react"
import type { Locale } from "../lib/i18n"
import { translations } from "../lib/i18n"
import type { Player } from "../lib/players-data"
import { defaultPlayers } from "../lib/players-data"
import { AppContext, type AppState, type AppContextType, type User } from "../lib/store"

// ─── Seed users ───────────────────────────────────────────────────────────────
// One default admin account is pre-seeded so the panel is accessible out of the box.
const SEED_USERS: User[] = [
  {
    id: "seed-admin",
    email: "admin@scoutpro.com",
    name: "Administrator",
    passwordHash: "admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
]

// ─── Session persistence helpers ─────────────────────────────────────────────
const SESSION_KEY = "sp_admin_user_id"

function getPersistedUserId(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

function persistUserId(id: string | null) {
  try {
    if (id) sessionStorage.setItem(SESSION_KEY, id)
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(SEED_USERS)

  const [state, setState] = useState<AppState>(() => {
    // Restore session from sessionStorage on first render
    const persistedId = getPersistedUserId()
    const restoredUser = persistedId
      ? SEED_USERS.find((u) => u.id === persistedId) ?? null
      : null
    return {
      locale: "ru",
      translations: translations.ru,
      customTranslations: {},
      players: defaultPlayers,
      compareList: [],
      isAdminAuthenticated: restoredUser !== null,
      currentUser: restoredUser,
      users: SEED_USERS,
    }
  })

  const setLocale = useCallback((locale: Locale) => {
    setState((prev) => ({ ...prev, locale, translations: translations[locale] }))
  }, [])

  const setPlayers = useCallback((players: Player[]) => {
    setState((prev) => ({ ...prev, players }))
  }, [])

  const addPlayer = useCallback((player: Player) => {
    setState((prev) => ({ ...prev, players: [...prev.players, player] }))
  }, [])

  const updatePlayer = useCallback((id: string, updates: Partial<Player>) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  }, [])

  const deletePlayer = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
      compareList: prev.compareList.filter((cid) => cid !== id),
    }))
  }, [])

  const toggleCompare = useCallback((playerId: string) => {
    setState((prev) => {
      const exists = prev.compareList.includes(playerId)
      if (exists) return { ...prev, compareList: prev.compareList.filter((id) => id !== playerId) }
      if (prev.compareList.length >= 2) return { ...prev, compareList: [prev.compareList[1], playerId] }
      return { ...prev, compareList: [...prev.compareList, playerId] }
    })
  }, [])

  const clearCompare = useCallback(() => {
    setState((prev) => ({ ...prev, compareList: [] }))
  }, [])

  const updateTranslation = useCallback((section: string, key: string, value: string) => {
    setState((prev) => {
      const newCustom = { ...prev.customTranslations }
      if (!newCustom[section]) newCustom[section] = {}
      newCustom[section][key] = value

      const newTranslations = { ...prev.translations }
      const sectionObj = newTranslations[section as keyof typeof newTranslations]
      if (sectionObj && typeof sectionObj === "object") {
        ;(sectionObj as Record<string, string>)[key] = value
      }
      return { ...prev, customTranslations: newCustom, translations: newTranslations }
    })
  }, [])

  // Legacy password-only auth (kept for backward compat)
  const setAdminAuth = useCallback((auth: boolean) => {
    setState((prev) => ({ ...prev, isAdminAuthenticated: auth }))
  }, [])

  // ── registerUser ────────────────────────────────────────────────────────────
  const registerUser = useCallback(
    (email: string, name: string, password: string): { ok: boolean; error?: string } => {
      const trimEmail = email.trim().toLowerCase()
      const trimName = name.trim()

      if (!trimEmail || !trimName || !password) {
        return { ok: false, error: "auth.all_fields_required" }
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
        return { ok: false, error: "auth.invalid_email" }
      }
      if (password.length < 6) {
        return { ok: false, error: "auth.password_too_short" }
      }

      const existingUser = users.find((u) => u.email === trimEmail)
      if (existingUser) {
        return { ok: false, error: "auth.email_taken" }
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: trimEmail,
        name: trimName,
        passwordHash: password,
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      setUsers((prev) => [...prev, newUser])
      setState((prev) => ({
        ...prev,
        users: [...prev.users, newUser],
        isAdminAuthenticated: true,
        currentUser: newUser,
      }))
      persistUserId(newUser.id)

      return { ok: true }
    },
    [users]
  )

  // ── loginUser ───────────────────────────────────────────────────────────────
  const loginUser = useCallback(
    (email: string, password: string): { ok: boolean; error?: string } => {
      const trimEmail = email.trim().toLowerCase()

      if (!trimEmail || !password) {
        return { ok: false, error: "auth.all_fields_required" }
      }

      const user = users.find((u) => u.email === trimEmail)
      if (!user) {
        return { ok: false, error: "auth.not_found" }
      }
      if (user.passwordHash !== password) {
        return { ok: false, error: "auth.wrong_password" }
      }

      setState((prev) => ({
        ...prev,
        isAdminAuthenticated: true,
        currentUser: user,
      }))
      persistUserId(user.id)

      return { ok: true }
    },
    [users]
  )

  // ── logoutUser ───────────────────────────────────────────────────────────────
  const logoutUser = useCallback(() => {
    persistUserId(null)
    setState((prev) => ({
      ...prev,
      isAdminAuthenticated: false,
      currentUser: null,
    }))
  }, [])

  const t = state.translations

  const value: AppContextType = useMemo(
    () => ({
      state,
      setLocale,
      setPlayers,
      addPlayer,
      updatePlayer,
      deletePlayer,
      toggleCompare,
      clearCompare,
      updateTranslation,
      setAdminAuth,
      registerUser,
      loginUser,
      logoutUser,
      t,
    }),
    [
      state, setLocale, setPlayers, addPlayer, updatePlayer, deletePlayer,
      toggleCompare, clearCompare, updateTranslation, setAdminAuth,
      registerUser, loginUser, logoutUser, t,
    ]
  )

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
