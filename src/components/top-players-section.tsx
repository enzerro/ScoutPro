import { Link } from "react-router-dom"
import { useAppContext } from "../lib/store"
import { PlayerCard } from "./player-card"

export function TopPlayersSection() {
  const { t, state } = useAppContext()
  const topPlayers = state.players
    .sort((a, b) => b.seasonStats.rating - a.seasonStats.rating)
    .slice(0, 4)

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Top Rated</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.features.subtitle}</p>
          </div>
          <Link
            to="/players"
            className="rounded-lg border border-border bg-transparent px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {t.nav.players} &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  )
}
