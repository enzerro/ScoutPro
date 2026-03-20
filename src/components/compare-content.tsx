import { useState } from "react"
import { useAppContext } from "../lib/store"
import { StatRadar } from "./stat-radar"
import { cn } from "../lib/utils"
import type { Player } from "../lib/players-data"

function PlayerSelector({
  label,
  selected,
  onSelect,
  players,
}: {
  label: string
  selected: Player | null
  onSelect: (id: string) => void
  players: Player[]
}) {
  const { t } = useAppContext()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative">
      <div className="mb-2 text-xs font-medium text-muted-foreground">{label}</div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/30"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
              {selected.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{selected.name}</div>
              <div className="text-[10px] text-muted-foreground">{selected.club}</div>
            </div>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">{t.compare.select_player}</span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.players.search_placeholder}
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary"
            />
          </div>
          <div className="max-h-48 overflow-y-auto p-1">
            {filtered.map((player) => (
              <button
                key={player.id}
                onClick={() => {
                  onSelect(player.id)
                  setOpen(false)
                  setSearch("")
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground">
                  {player.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">{player.name}</div>
                  <div className="text-[10px] text-muted-foreground">{player.club}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CompareBar({ valueA, valueB }: { label: string; valueA: number; valueB: number }) {
  const widthA = (valueA / 100) * 100
  const widthB = (valueB / 100) * 100

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 text-right text-xs font-bold text-foreground">{valueA}</div>
      <div className="flex-1">
        <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
          <div className="flex flex-1 justify-end overflow-hidden rounded-l-full bg-secondary">
            <div
              className={cn(
                "h-full rounded-l-full transition-all duration-700",
                valueA >= valueB ? "bg-primary" : "bg-chart-2"
              )}
              style={{ width: `${widthA}%` }}
            />
          </div>
          <div className="flex flex-1 overflow-hidden rounded-r-full bg-secondary">
            <div
              className={cn(
                "h-full rounded-r-full transition-all duration-700",
                valueB >= valueA ? "bg-primary" : "bg-chart-2"
              )}
              style={{ width: `${widthB}%` }}
            />
          </div>
        </div>
      </div>
      <div className="w-8 text-left text-xs font-bold text-foreground">{valueB}</div>
    </div>
  )
}

export function CompareContent() {
  const { t, state } = useAppContext()
  const [playerAId, setPlayerAId] = useState(state.compareList[0] || "")
  const [playerBId, setPlayerBId] = useState(state.compareList[1] || "")

  const playerA = state.players.find((p) => p.id === playerAId) || null
  const playerB = state.players.find((p) => p.id === playerBId) || null

  const overallA = playerA
    ? Math.round(
        (playerA.stats.pace +
          playerA.stats.shooting +
          playerA.stats.passing +
          playerA.stats.dribbling +
          playerA.stats.defending +
          playerA.stats.physical) /
          6
      )
    : 0
  const overallB = playerB
    ? Math.round(
        (playerB.stats.pace +
          playerB.stats.shooting +
          playerB.stats.passing +
          playerB.stats.dribbling +
          playerB.stats.defending +
          playerB.stats.physical) /
          6
      )
    : 0

  const statsLabels = [
    { key: "pace" as const, label: t.profile.pace },
    { key: "shooting" as const, label: t.profile.shooting },
    { key: "passing" as const, label: t.profile.passing },
    { key: "dribbling" as const, label: t.profile.dribbling },
    { key: "defending" as const, label: t.profile.defending },
    { key: "physical" as const, label: t.profile.physical },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">{t.compare.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.compare.subtitle}</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <PlayerSelector
          label={t.compare.player_a}
          selected={playerA}
          onSelect={setPlayerAId}
          players={state.players}
        />
        <PlayerSelector
          label={t.compare.player_b}
          selected={playerB}
          onSelect={setPlayerBId}
          players={state.players}
        />
      </div>

      {playerA && playerB ? (
        <div className="flex flex-col gap-6">
          {/* Overall comparison */}
          <div className="flex items-center justify-center gap-8 rounded-2xl border border-border bg-card p-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{overallA}</div>
              <div className="mt-1 text-xs text-muted-foreground">{playerA.name}</div>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">{t.compare.vs}</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{overallB}</div>
              <div className="mt-1 text-xs text-muted-foreground">{playerB.name}</div>
            </div>
          </div>

          {/* Stats comparison bars */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-center text-sm font-semibold text-foreground">Attributes</h3>
            <div className="flex flex-col gap-4">
              {statsLabels.map((stat) => (
                <div key={stat.key}>
                  <div className="mb-1 text-center text-[10px] text-muted-foreground">{stat.label}</div>
                  <CompareBar
                    label={stat.label}
                    valueA={playerA.stats[stat.key]}
                    valueB={playerB.stats[stat.key]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Radar overlay */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-center text-sm font-semibold text-foreground">Radar Comparison</h3>
            <div className="relative flex justify-center">
              <div className="relative">
                <StatRadar
                  stats={statsLabels.map((s) => ({ label: s.label, value: playerA.stats[s.key] }))}
                  size={280}
                  color="hsl(145, 65%, 42%)"
                />
                <div className="absolute inset-0">
                  <StatRadar
                    stats={statsLabels.map((s) => ({ label: "", value: playerB.stats[s.key] }))}
                    size={280}
                    color="hsl(200, 70%, 50%)"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">{playerA.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-xs text-muted-foreground">{playerB.name}</span>
              </div>
            </div>
          </div>

          {/* Season stats table */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-center text-sm font-semibold text-foreground">Season 2024/25</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">{playerA.name}</th>
                    <th className="pb-3 font-medium">Stat</th>
                    <th className="pb-3 font-medium">{playerB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t.profile.appearances, a: playerA.seasonStats.appearances, b: playerB.seasonStats.appearances },
                    { label: t.profile.goals, a: playerA.seasonStats.goals, b: playerB.seasonStats.goals },
                    { label: t.profile.assists, a: playerA.seasonStats.assists, b: playerB.seasonStats.assists },
                    { label: t.profile.rating, a: playerA.seasonStats.rating, b: playerB.seasonStats.rating },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-border/50">
                      <td
                        className={cn(
                          "py-3 font-semibold",
                          row.a >= row.b ? "text-primary" : "text-foreground"
                        )}
                      >
                        {row.a}
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{row.label}</td>
                      <td
                        className={cn(
                          "py-3 font-semibold",
                          row.b >= row.a ? "text-primary" : "text-foreground"
                        )}
                      >
                        {row.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
            <path d="M16 3h5v5M8 3H3v5M21 3L14 10M3 3l7 7M16 21h5v-5M8 21H3v-5M21 21l-7-7M3 21l7-7" />
          </svg>
          <p className="mt-4 text-sm text-muted-foreground">{t.compare.no_selection}</p>
        </div>
      )}
    </div>
  )
}
