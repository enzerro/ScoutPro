import { Link } from "react-router-dom"
import { useAppContext } from "../lib/store"

export function HeroSection() {
  const { t } = useAppContext()

  const stats = [
    { value: "12,000+", label: t.hero.stats_players },
    { value: "850+", label: t.hero.stats_clubs },
    { value: "120+", label: t.hero.stats_countries },
    { value: "3,200+", label: t.hero.stats_scouts },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(145,65%,42%,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/players"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <span className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
