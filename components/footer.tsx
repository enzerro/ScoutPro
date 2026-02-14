"use client"

import Link from "next/link"
import { useAppContext } from "@/lib/store"

export function Footer() {
  const { t } = useAppContext()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-bold text-foreground">ScoutPro</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t.footer.links}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/players" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {t.nav.players}
              </Link>
              <Link href="/compare" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {t.nav.compare}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t.footer.contact}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>info@scoutpro.com</span>
              <span>+7 (495) 123-45-67</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          2026 ScoutPro. {t.footer.rights}.
        </div>
      </div>
    </footer>
  )
}
