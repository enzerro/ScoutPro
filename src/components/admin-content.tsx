import React, { useState } from "react"
import { useAppContext } from "../lib/store"
import { cn } from "../lib/utils"
import type { Locale } from "../lib/i18n"
import type { Player } from "../lib/players-data"

type AdminTab = "language" | "content" | "players" | "settings"

// ─── Login ────────────────────────────────────────────────────────────────────

function AdminLogin() {
  const { t, setAdminAuth } = useAppContext()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = () => {
    if (password === "admin123") {
      setAdminAuth(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20">
      <div className="w-full rounded-2xl border border-border bg-card p-8">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
        </div>

        <h2 className="mb-1 text-center text-lg font-bold text-foreground">
          {t.admin.login_title}
        </h2>
        <p className="mb-6 text-center text-xs text-muted-foreground">
          Password: admin123
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder={t.admin.password}
            className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
          />
          {error && (
            <p className="text-xs text-destructive">{t.admin.login_error}</p>
          )}
          <button
            onClick={handleLogin}
            className="rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
          >
            {t.admin.login}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Language Tab ─────────────────────────────────────────────────────────────

function LanguageTab() {
  const { t, state, setLocale } = useAppContext()

  const locales: { value: Locale; label: string; flag: string }[] = [
    { value: "ru", label: "Русский", flag: "RU" },
    { value: "en", label: "English", flag: "EN" },
    { value: "ky", label: "Кыргызча", flag: "KY" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-1 text-sm font-semibold text-foreground">
          {t.admin.current_language}
        </h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Выберите язык интерфейса для всего сайта
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {locales.map((loc) => (
            <button
              key={loc.value}
              onClick={() => setLocale(loc.value)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                state.locale === loc.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-transparent hover:border-primary/30"
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-foreground">
                {loc.flag}
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {loc.label}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {loc.value.toUpperCase()}
                </div>
              </div>
              {state.locale === loc.value && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-auto shrink-0 text-primary"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Content Tab ──────────────────────────────────────────────────────────────

function ContentTab() {
  const { t, state, updateTranslation } = useAppContext()
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    "nav",
    "hero",
    "features",
    "players",
    "profile",
    "compare",
    "admin",
    "footer",
  ]

  const currentSection =
    state.translations[activeSection as keyof typeof state.translations]

  const entries: [string, string][] =
    currentSection && typeof currentSection === "object"
      ? (Object.entries(currentSection) as [string, string][]).filter(
          ([, v]) => typeof v === "string"
        )
      : []

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {t.admin.edit_texts}
          </h3>
          <button
            onClick={handleSave}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-all",
              saved
                ? "bg-primary/20 text-primary"
                : "bg-primary text-primary-foreground hover:bg-primary/80"
            )}
          >
            {saved ? t.admin.saved : t.admin.save}
          </button>
        </div>

        {/* Section selector */}
        <div className="mb-4 flex flex-wrap gap-1 rounded-lg border border-border bg-secondary p-1">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                activeSection === sec
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Text fields */}
        <div className="flex flex-col gap-3">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-1 rounded-lg bg-secondary/30 p-3 sm:flex-row sm:items-center sm:gap-3"
            >
              <div className="w-40 shrink-0">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {key}
                </span>
              </div>
              <input
                type="text"
                defaultValue={value}
                onBlur={(e) =>
                  updateTranslation(activeSection, key, e.target.value)
                }
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Players Tab ──────────────────────────────────────────────────────────────

type PlayerForm = {
  name: string
  age: string
  club: string
  position: Player["position"]
  nationality: string
  rating: string
}

const emptyForm: PlayerForm = {
  name: "",
  age: "20",
  club: "",
  position: "forward",
  nationality: "",
  rating: "7.0",
}

function PlayerFormFields({
  form,
  onChange,
  t,
}: {
  form: PlayerForm
  onChange: (form: PlayerForm) => void
  t: ReturnType<typeof useAppContext>["t"]
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label className="mb-1 block text-[10px] text-muted-foreground">
          {t.admin.player_name}
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-[10px] text-muted-foreground">
          {t.admin.player_age}
        </label>
        <input
          type="number"
          value={form.age}
          onChange={(e) => onChange({ ...form, age: e.target.value })}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-[10px] text-muted-foreground">
          {t.admin.player_club}
        </label>
        <input
          type="text"
          value={form.club}
          onChange={(e) => onChange({ ...form, club: e.target.value })}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-[10px] text-muted-foreground">
          {t.admin.player_position}
        </label>
        <select
          value={form.position}
          onChange={(e) =>
            onChange({ ...form, position: e.target.value as Player["position"] })
          }
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
        >
          <option value="forward">{t.players.forward}</option>
          <option value="midfielder">{t.players.midfielder}</option>
          <option value="defender">{t.players.defender}</option>
          <option value="goalkeeper">{t.players.goalkeeper}</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-[10px] text-muted-foreground">
          {t.admin.player_nationality}
        </label>
        <input
          type="text"
          value={form.nationality}
          onChange={(e) => onChange({ ...form, nationality: e.target.value })}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-[10px] text-muted-foreground">
          {t.admin.player_rating}
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={form.rating}
          onChange={(e) => onChange({ ...form, rating: e.target.value })}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
        />
      </div>
    </div>
  )
}

function PlayersTab() {
  const { t, state, addPlayer, updatePlayer, deletePlayer } = useAppContext()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<PlayerForm>(emptyForm)
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState<PlayerForm>(emptyForm)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleAdd = () => {
    if (!addForm.name.trim() || !addForm.club.trim()) return
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: addForm.name.trim(),
      age: parseInt(addForm.age) || 20,
      nationality: addForm.nationality.trim(),
      nationalityFlag: "",
      club: addForm.club.trim(),
      clubLogo: "",
      position: addForm.position,
      height: 180,
      weight: 75,
      foot: "Right",
      contractUntil: "2028",
      marketValue: "10M",
      image: "",
      stats: {
        pace: 70,
        shooting: 70,
        passing: 70,
        dribbling: 70,
        defending: 70,
        physical: 70,
      },
      seasonStats: {
        appearances: 0,
        goals: 0,
        assists: 0,
        cleanSheets: 0,
        rating: parseFloat(addForm.rating) || 7.0,
      },
      history: [],
    }
    addPlayer(newPlayer)
    setShowAdd(false)
    setAddForm(emptyForm)
  }

  const startEdit = (player: Player) => {
    setEditingId(player.id)
    setEditForm({
      name: player.name,
      age: String(player.age),
      club: player.club,
      position: player.position,
      nationality: player.nationality,
      rating: String(player.seasonStats.rating),
    })
  }

  const saveEdit = (id: string) => {
    updatePlayer(id, {
      name: editForm.name.trim(),
      age: parseInt(editForm.age) || 20,
      club: editForm.club.trim(),
      position: editForm.position,
      nationality: editForm.nationality.trim(),
      seasonStats: {
        ...state.players.find((p) => p.id === id)!.seasonStats,
        rating: parseFloat(editForm.rating) || 7.0,
      },
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    deletePlayer(id)
    setConfirmDeleteId(null)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {t.admin.players_management}
        </h3>
        <button
          onClick={() => {
            setShowAdd(!showAdd)
            setAddForm(emptyForm)
          }}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          + {t.admin.add_player}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="rounded-xl border border-primary/20 bg-card p-5">
          <h4 className="mb-3 text-xs font-semibold text-foreground">
            {t.admin.add_player}
          </h4>
          <PlayerFormFields form={addForm} onChange={setAddForm} t={t} />
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!addForm.name.trim() || !addForm.club.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
            >
              {t.admin.add_player}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-border bg-transparent px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.admin.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Edit form */}
      {editingId && (
        <div className="rounded-xl border border-primary/20 bg-card p-5">
          <h4 className="mb-3 text-xs font-semibold text-foreground">
            {t.admin.edit_player}
          </h4>
          <PlayerFormFields form={editForm} onChange={setEditForm} t={t} />
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => saveEdit(editingId)}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
            >
              {t.admin.save}
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="rounded-lg border border-border bg-transparent px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.admin.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Players table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">{t.admin.player_name}</th>
                <th className="px-4 py-3 font-medium">{t.admin.player_club}</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  {t.admin.player_position}
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  {t.admin.player_age}
                </th>
                <th className="px-4 py-3 font-medium">{t.admin.player_rating}</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {state.players.map((player) => (
                <tr
                  key={player.id}
                  className="border-b border-border/50 transition-colors hover:bg-secondary/30 last:border-0"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">
                      {player.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {player.club}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
                    {t.players[player.position]}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-foreground md:table-cell">
                    {player.age}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      {player.seasonStats.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          editingId === player.id
                            ? setEditingId(null)
                            : startEdit(player)
                        }
                        className={cn(
                          "rounded px-2 py-1 text-[10px] font-semibold transition-colors",
                          editingId === player.id
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        {t.admin.edit_player}
                      </button>

                      {confirmDeleteId === player.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(player.id)}
                            className="rounded bg-destructive px-2 py-1 text-[10px] font-semibold text-destructive-foreground"
                          >
                            {t.admin.confirm_delete}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground"
                          >
                            {t.admin.cancel}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(player.id)}
                          className="rounded px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:text-destructive"
                        >
                          {t.admin.delete_player}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab() {
  const { t } = useAppContext()
  const [siteTitle, setSiteTitle] = useState("ScoutPro")
  const [siteDescription, setSiteDescription] = useState(
    "Professional football scouting platform"
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        {t.admin.settings}
      </h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-[10px] text-muted-foreground">
            {t.admin.site_title}
          </label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] text-muted-foreground">
            {t.admin.site_description}
          </label>
          <textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={handleSave}
          className={cn(
            "self-start rounded-lg px-6 py-2.5 text-xs font-semibold transition-all",
            saved
              ? "bg-primary/20 text-primary"
              : "bg-primary text-primary-foreground hover:bg-primary/80"
          )}
        >
          {saved ? t.admin.saved : t.admin.save}
        </button>
      </div>
    </div>
  )
}

// ─── Admin Panel Shell ────────────────────────────────────────────────────────

export function AdminContent() {
  const { t, state, setAdminAuth } = useAppContext()
  const [activeTab, setActiveTab] = useState<AdminTab>("language")

  if (!state.isAdminAuthenticated) {
    return <AdminLogin />
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "language",
      label: t.admin.language,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      id: "content",
      label: t.admin.content,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
    },
    {
      id: "players",
      label: t.admin.players_management,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: t.admin.settings,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {t.admin.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.admin.current_language}: {state.locale.toUpperCase()}
          </p>
        </div>
        <button
          onClick={() => setAdminAuth(false)}
          className="rounded-lg border border-border bg-transparent px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
        >
          {t.admin.logout}
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar nav */}
        <nav className="flex shrink-0 gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 lg:w-56 lg:flex-col lg:overflow-x-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className="min-w-0 flex-1">
          {activeTab === "language" && <LanguageTab />}
          {activeTab === "content" && <ContentTab />}
          {activeTab === "players" && <PlayersTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}
