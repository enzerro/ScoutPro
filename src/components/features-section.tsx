"use client"

import { useAppContext } from "@/lib/store"

const featureIcons = [
  <svg key="analytics" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18" />
    <path d="M7 16l4-8 4 4 4-10" />
  </svg>,
  <svg key="database" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
  </svg>,
  <svg key="compare" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 3h5v5M8 3H3v5M21 3L14 10M3 3l7 7M16 21h5v-5M8 21H3v-5M21 21l-7-7M3 21l7-7" />
  </svg>,
  <svg key="reports" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>,
]

export function FeaturesSection() {
  const { t } = useAppContext()

  const features = [
    { title: t.features.analytics_title, desc: t.features.analytics_desc, icon: featureIcons[0] },
    { title: t.features.database_title, desc: t.features.database_desc, icon: featureIcons[1] },
    { title: t.features.compare_title, desc: t.features.compare_desc, icon: featureIcons[2] },
    { title: t.features.reports_title, desc: t.features.reports_desc, icon: featureIcons[3] },
  ]

  return (
    <section className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">{t.features.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.features.subtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
