"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/lib/store"
import { StatRadar } from "./stat-radar"
import { StatBar } from "./stat-bar"
import { cn } from "@/lib/utils"

const positionColors: Record<string, string> = {
  forward: "bg-red-500/20 text-red-400",
  midfielder: "bg-emerald-500/20 text-emerald-400",
  defender: "bg-blue-500/20 text-blue-400",
  goalkeeper: "bg-amber-500/20 text-amber-400",
}

export function PlayerProfile() {
  const params = useParams()
  const { t, state, toggleCompare } = useAppContext()
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "history">("overview")

  const player = state.players.find((p) => p.id === params.id)
  const isInCompare = player ? state.compareList.includes(player.id) : false

  if (!player) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">Player not found</p>
          <Link href="/players" className="mt-4 inline-block text-sm text-primary hover:underline">
            {t.profile.back}
          </Link>
        </div>
      </div>
    )
  }

  const overall = Math.round(
    (player.stats.pace + player.stats.shooting + player.stats.passing + player.stats.dribbling + player.stats.defending + player.stats.physical) / 6
  )

  const radarStats = [
    { label: t.profile.pace, value: player.stats.pace },
    { label: t.profile.shooting, value: player.stats.shooting },
    { label: t.profile.passing, value: player.stats.passing },
    { label: t.profile.dribbling, value: player.stats.dribbling },
    { label: t.profile.defending, value: player.stats.defending },
    { label: t.profile.physical, value: player.stats.physical },
  ]

  const tabs = [
    { id: "overview" as const, label: t.profile.overview },
    { id: "stats" as const, label: t.profile.stats },
    { id: "history" as const, label: t.profile.history },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Link
        href="/players"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t.profile.back}
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-start md:p-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-secondary text-4xl font-bold text-muted-foreground">
          {player.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">{player.name}</h1>
            <span className={cn("rounded-lg px-3 py-1 text-xs font-bold uppercase", positionColors[player.position])}>
              {t.players[player.position as keyof typeof t.players]}
            </span>
            <span className="rounded-lg bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">{overall}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {player.club} &middot; {player.nationality}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {[
              { label: t.profile.age, value: `${player.age}` },
              { label: t.profile.height, value: `${player.height} cm` },
              { label: t.profile.weight, value: `${player.weight} kg` },
              { label: t.profile.foot, value: player.foot },
              { label: t.profile.contract_until, value: player.contractUntil },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-secondary/50 px-3 py-2">
                <div className="text-[10px] text-muted-foreground">{item.label}</div>
                <div className="text-sm font-semibold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2">
              <div className="text-[10px] text-muted-foreground">{t.profile.market_value}</div>
              <div className="text-lg font-bold text-primary">{player.marketValue}</div>
            </div>
            <button
              onClick={() => toggleCompare(player.id)}
              className={cn(
                "rounded-lg border px-4 py-2.5 text-xs font-semibold transition-colors",
                isInCompare
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {isInCompare ? "In comparison" : t.players.add_to_compare}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl border border-border bg-card p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t.profile.stats}</h3>
            <div className="flex justify-center">
              <StatRadar stats={radarStats} size={260} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Season 2024/25</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: t.profile.appearances, value: player.seasonStats.appearances },
                  { label: t.profile.goals, value: player.seasonStats.goals },
                  { label: t.profile.assists, value: player.seasonStats.assists },
                  { label: t.profile.rating, value: player.seasonStats.rating },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Attributes</h3>
              <div className="flex flex-col gap-3">
                {radarStats.map((stat) => (
                  <StatBar key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-6 text-sm font-semibold text-foreground">{t.profile.stats}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-medium text-muted-foreground">Technical</h4>
              <div className="flex flex-col gap-3">
                <StatBar label={t.profile.pace} value={player.stats.pace} />
                <StatBar label={t.profile.shooting} value={player.stats.shooting} />
                <StatBar label={t.profile.passing} value={player.stats.passing} />
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium text-muted-foreground">Physical</h4>
              <div className="flex flex-col gap-3">
                <StatBar label={t.profile.dribbling} value={player.stats.dribbling} />
                <StatBar label={t.profile.defending} value={player.stats.defending} />
                <StatBar label={t.profile.physical} value={player.stats.physical} />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <StatRadar stats={radarStats} size={300} />
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">{t.profile.history}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Season</th>
                  <th className="pb-3 pr-4 font-medium">{t.profile.club}</th>
                  <th className="pb-3 pr-4 font-medium text-center">{t.profile.appearances}</th>
                  <th className="pb-3 pr-4 font-medium text-center">{t.profile.goals}</th>
                  <th className="pb-3 font-medium text-center">{t.profile.assists}</th>
                </tr>
              </thead>
              <tbody>
                {player.history.map((h, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">{h.season}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{h.club}</td>
                    <td className="py-3 pr-4 text-center text-foreground">{h.appearances}</td>
                    <td className="py-3 pr-4 text-center text-foreground">{h.goals}</td>
                    <td className="py-3 text-center text-foreground">{h.assists}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
