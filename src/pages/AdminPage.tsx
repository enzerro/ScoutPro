import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../lib/store'
import { cn } from '../lib/utils'
import {
  AdminLogin,
  LanguageTab,
  ContentTab,
  PlayersTab,
  SettingsTab,
} from '../components/admin-content'
import type { Locale } from '../lib/i18n'

type AdminTab = 'players' | 'language' | 'content' | 'settings'

const localeLabels: Record<Locale, string> = { ru: 'RU', en: 'EN', ky: 'KY' }

function SidebarIcon({ d, viewBox = '0 0 24 24' }: { d: string | React.ReactNode; viewBox?: string }) {
  return (
    <svg width="18" height="18" viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {typeof d === 'string' ? <path d={d} /> : d}
    </svg>
  )
}

export default function AdminPage() {
  const { t, state, setAdminAuth, setLocale } = useAppContext()
  const [activeTab, setActiveTab] = useState<AdminTab>('players')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (!state.isAdminAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <AdminLogin />
      </div>
    )
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'players',
      label: t.admin.players_management,
      icon: (
        <SidebarIcon d={
          <>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </>
        } />
      ),
    },
    {
      id: 'language',
      label: t.admin.language,
      icon: (
        <SidebarIcon d={
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </>
        } />
      ),
    },
    {
      id: 'content',
      label: t.admin.content,
      icon: (
        <SidebarIcon d={
          <>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </>
        } />
      ),
    },
    {
      id: 'settings',
      label: t.admin.settings,
      icon: (
        <SidebarIcon d={
          <>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </>
        } />
      ),
    },
  ]

  const tabLabels: Record<AdminTab, string> = {
    players: t.admin.players_management,
    language: t.admin.language,
    content: t.admin.content,
    settings: t.admin.settings,
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Mobile overlay ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 md:static md:translate-x-0',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">ScoutPro</p>
            <p className="text-[10px] text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Menu
          </p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileSidebarOpen(false) }}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground/70" />
              )}
            </button>
          ))}

          {/* Divider */}
          <div className="my-3 border-t border-border" />

          {/* Back to site */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Back to site</span>
          </Link>
        </nav>

        {/* Bottom: locale + logout */}
        <div className="border-t border-border p-4 space-y-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-0.5">
            {(Object.keys(localeLabels) as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={cn(
                  'flex-1 rounded-md py-1 text-xs font-semibold transition-all',
                  state.locale === loc
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>

          {/* User row + logout */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">Administrator</p>
              <p className="text-[10px] text-muted-foreground">admin123</p>
            </div>
            <button
              onClick={() => setAdminAuth(false)}
              title={t.admin.logout}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-card px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary md:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground">{tabLabels[activeTab]}</h1>
              <p className="hidden text-[11px] text-muted-foreground sm:block">
                {t.admin.title} &middot; {state.locale.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <span>ScoutPro</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Admin</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="font-medium text-foreground">{tabLabels[activeTab]}</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
            {activeTab === 'players'  && <PlayersTab />}
            {activeTab === 'language' && <LanguageTab />}
            {activeTab === 'content'  && <ContentTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  )
}
