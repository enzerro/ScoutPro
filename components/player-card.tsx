"use client"

import Link from "next/link"
import { useAppContext } from "@/lib/store"
import type { Player } from "@/lib/players-data"
import { cn } from "@/lib/utils"

interface PlayerCardProps {
  player: Player
}

const positionColors: Record<string, string> = {
  forward: "bg-red-500/20 text-red-400",
  midfielder: "bg-emerald-500/20 text-emerald-400",
  defender: "bg-blue-500/20 text-blue-400",
  goalkeeper: "bg-amber-500/20 text-amber-400",
}

const positionAbbr: Record<string, string> = {
  forward: "FW",
  midfielder: "MF",
  defender: "DF",
  goalkeeper: "GK",
}

function PlayerInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-full w-full items-center justify-center bg-secondary text-2xl font-bold text-muted-foreground">
      {initials}
    </div>
  )
}

export function PlayerCard({ player }: PlayerCardProps) {
  const { t, state, toggleCompare } = useAppContext()
  const isInCompare = state.compareList.includes(player.id)

  const overallRating = Math.round(
    (player.stats.pace + player.stats.shooting + player.stats.passing + player.stats.dribbling + player.stats.defending + player.stats.physical) / 6
  )

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <PlayerInitials name={player.name} />
        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold uppercase", positionColors[player.position])}>
            {positionAbbr[player.position]}
          </span>
          <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            {overallRating}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent p-3 pt-8">
          <h3 className="text-base font-bold text-foreground">{player.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{player.club}</span>
            <span className="opacity-40">|</span>
            <span>{player.age} {t.players.years}</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { label: t.profile.pace, value: player.stats.pace },
            { label: t.profile.shooting, value: player.stats.shooting },
            { label: t.profile.passing, value: player.stats.passing },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{player.seasonStats.goals}</div>
            <div className="text-[10px] text-muted-foreground">{t.profile.goals}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{player.seasonStats.assists}</div>
            <div className="text-[10px] text-muted-foreground">{t.profile.assists}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{player.seasonStats.appearances}</div>
            <div className="text-[10px] text-muted-foreground">{t.profile.appearances}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-primary">{player.seasonStats.rating}</div>
            <div className="text-[10px] text-muted-foreground">{t.profile.rating}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/players/${player.id}`}
            className="flex-1 rounded-lg bg-primary py-2 text-center text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
          >
            {t.players.view_profile}
          </Link>
          <button
            onClick={() => toggleCompare(player.id)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors",
              isInCompare
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {isInCompare ? "+" : t.players.add_to_compare}
          </button>
        </div>
      </div>
    </div>
  )
}
