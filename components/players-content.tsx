"use client"

import { useState, useMemo } from "react"
import { useAppContext } from "@/lib/store"
import { PlayerCard } from "./player-card"
import { cn } from "@/lib/utils"

type PositionFilter = "all" | "forward" | "midfielder" | "defender" | "goalkeeper"
type SortKey = "rating" | "age" | "name"

export function PlayersContent() {
  const { t, state } = useAppContext()
  const [search, setSearch] = useState("")
  const [position, setPosition] = useState<PositionFilter>("all")
  const [sort, setSort] = useState<SortKey>("rating")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const positions: { value: PositionFilter; label: string }[] = [
    { value: "all", label: t.players.all },
    { value: "forward", label: t.players.forward },
    { value: "midfielder", label: t.players.midfielder },
    { value: "defender", label: t.players.defender },
    { value: "goalkeeper", label: t.players.goalkeeper },
  ]

  const filteredPlayers = useMemo(() => {
    let result = [...state.players]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.club.toLowerCase().includes(q) ||
          p.nationality.toLowerCase().includes(q)
      )
    }

    if (position !== "all") {
      result = result.filter((p) => p.position === position)
    }

    switch (sort) {
      case "rating":
        result.sort((a, b) => b.seasonStats.rating - a.seasonStats.rating)
        break
      case "age":
        result.sort((a, b) => a.age - b.age)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [state.players, search, position, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">{t.players.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.players.subtitle}</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.players.search_placeholder}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1">
            {positions.map((pos) => (
              <button
                key={pos.value}
                onClick={() => setPosition(pos.value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  position === pos.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          >
            <option value="rating">{t.players.sort_rating}</option>
            <option value="age">{t.players.sort_age}</option>
            <option value="name">{t.players.sort_name}</option>
          </select>

          <div className="flex rounded-lg border border-border bg-card p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
              aria-label="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
              aria-label="List view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 text-xs text-muted-foreground">
        {filteredPlayers.length} {t.hero.stats_players.toLowerCase()}
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredPlayers.map((player) => (
            <PlayerListRow key={player.id} player={player} />
          ))}
        </div>
      )}

      {filteredPlayers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <p className="mt-4 text-sm">No players found</p>
        </div>
      )}
    </div>
  )
}

function PlayerListRow({ player }: { player: import("@/lib/players-data").Player }) {
  const { t, state, toggleCompare } = useAppContext()
  const isInCompare = state.compareList.includes(player.id)
  const overall = Math.round(
    (player.stats.pace + player.stats.shooting + player.stats.passing + player.stats.dribbling + player.stats.defending + player.stats.physical) / 6
  )

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-muted-foreground">
        {player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{player.name}</span>
          <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">{overall}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {player.club} &middot; {player.age} {t.players.years} &middot; {player.nationality}
        </div>
      </div>
      <div className="hidden items-center gap-6 text-center md:flex">
        <div>
          <div className="text-sm font-bold text-foreground">{player.seasonStats.goals}</div>
          <div className="text-[10px] text-muted-foreground">{t.profile.goals}</div>
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">{player.seasonStats.assists}</div>
          <div className="text-[10px] text-muted-foreground">{t.profile.assists}</div>
        </div>
        <div>
          <div className="text-sm font-bold text-primary">{player.seasonStats.rating}</div>
          <div className="text-[10px] text-muted-foreground">{t.profile.rating}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <a
          href={`/players/${player.id}`}
          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          {t.players.view_profile}
        </a>
        <button
          onClick={() => toggleCompare(player.id)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
            isInCompare
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-transparent text-muted-foreground hover:border-primary/40"
          )}
        >
          {isInCompare ? "+" : t.players.add_to_compare}
        </button>
      </div>
    </div>
  )
}
