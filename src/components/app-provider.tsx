import React, { useState, useCallback, useMemo } from "react"
import type { Locale } from "../lib/i18n"
import { translations } from "../lib/i18n"
import type { Player } from "../lib/players-data"
import { defaultPlayers } from "../lib/players-data"
import { AppContext, type AppState, type AppContextType } from "../lib/store"

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    locale: "ru",
    translations: translations.ru,
    customTranslations: {},
    players: defaultPlayers,
    compareList: [],
    isAdminAuthenticated: false,
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

  const setAdminAuth = useCallback((auth: boolean) => {
    setState((prev) => ({ ...prev, isAdminAuthenticated: auth }))
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
      t,
    }),
    [state, setLocale, setPlayers, addPlayer, updatePlayer, deletePlayer,
     toggleCompare, clearCompare, updateTranslation, setAdminAuth, t]
  )

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
