import { Link, useLocation } from "react-router-dom"
import { useAppContext } from "../lib/store"
import { cn } from "../lib/utils"
import { useState } from "react"
import type { Locale } from "../lib/i18n"

const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  ky: "KY",
}

export function Navbar() {
  const { t, state, setLocale } = useAppContext()
  const location = useLocation()
  const pathname = location.pathname
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/players", label: t.nav.players },
    { href: "/compare", label: t.nav.compare },
    { href: "/admin", label: t.nav.admin },
  ]

  return (
    <header className="animate-fade-down sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-foreground">ScoutPro</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-[1.02]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-secondary p-0.5">
            {(Object.keys(localeLabels) as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200",
                  state.locale === loc
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className="transition-transform duration-300"
              style={{ transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-down border-t border-border bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "animate-slide-in-left rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  i === 0 && "delay-75",
                  i === 1 && "delay-100",
                  i === 2 && "delay-150",
                  i === 3 && "delay-200",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
