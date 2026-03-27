import { Link } from "react-router-dom"
import { useAppContext } from "../lib/store"
import { useInView } from "../lib/use-in-view"
import { cn } from "../lib/utils"
import { PlayerCard } from "./player-card"

const staggerDelays = ["delay-100", "delay-200", "delay-300", "delay-400"]

export function TopPlayersSection() {
  const { t, state } = useAppContext()
  const [headingRef, headingVisible] = useInView<HTMLDivElement>()
  const [gridRef, gridVisible] = useInView<HTMLDivElement>({ threshold: 0.05 })

  const topPlayers = state.players
    .sort((a, b) => b.seasonStats.rating - a.seasonStats.rating)
    .slice(0, 4)

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div
          ref={headingRef}
          className={cn(
            "mb-8 flex items-center justify-between transition-all duration-500",
            headingVisible ? "animate-fade-up opacity-100" : "opacity-0 translate-y-4"
          )}
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground">Top Rated</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.features.subtitle}</p>
          </div>
          <Link
            to="/players"
            className="rounded-lg border border-border bg-transparent px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:-translate-y-0.5"
          >
            {t.nav.players} &rarr;
          </Link>
        </div>
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topPlayers.map((player, i) => (
            <div
              key={player.id}
              className={cn(
                gridVisible ? `animate-fade-up ${staggerDelays[i]}` : "opacity-0"
              )}
            >
              <PlayerCard player={player} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
