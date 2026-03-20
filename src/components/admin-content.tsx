import React, { useState } from "react"
import { useAppContext } from "../lib/store"
import { cn } from "../lib/utils"
import type { Locale } from "../lib/i18n"
import type { Player } from "../lib/players-data"

// ─── Login ────────────────────────────────────────────────────────────────────

export function AdminLogin() {
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

export function LanguageTab() {
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

export function ContentTab() {
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
  // Basic info
  name: string
  age: string
  club: string
  position: Player["position"]
  nationality: string
  // Season stats
  appearances: string
  goals: string
  assists: string
  cleanSheets: string
  rating: string
  // Attributes
  pace: string
  shooting: string
  passing: string
  dribbling: string
  defending: string
  physical: string
}

const emptyForm: PlayerForm = {
  name: "",
  age: "20",
  club: "",
  position: "forward",
  nationality: "",
  appearances: "0",
  goals: "0",
  assists: "0",
  cleanSheets: "0",
  rating: "7.0",
  pace: "70",
  shooting: "70",
  passing: "70",
  dribbling: "70",
  defending: "70",
  physical: "70",
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </label>
  )
}

function FormInput({
  value,
  onChange,
  type = "text",
  step,
  min,
  max,
}: {
  value: string
  onChange: (v: string) => void
  type?: string
  step?: string
  min?: string
  max?: string
}) {
  return (
    <input
      type={type}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
    />
  )
}

function StatSlider({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const num = Math.min(99, Math.max(0, parseInt(value) || 0))
  const pct = (num / 99) * 100

  const color =
    num >= 85
      ? "bg-emerald-500"
      : num >= 70
      ? "bg-primary"
      : num >= 50
      ? "bg-amber-500"
      : "bg-red-500"

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-[11px] text-muted-foreground">{label}</span>
      <div className="relative flex-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full transition-all", color)}
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="99"
          value={num}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <input
        type="number"
        min="0"
        max="99"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 shrink-0 rounded-md border border-border bg-background px-2 py-1 text-center text-xs font-bold text-foreground outline-none focus:border-primary"
      />
    </div>
  )
}

type EditFormTab = "info" | "season" | "attributes"

function PlayerFormFields({
  form,
  onChange,
  t,
  mode = "add",
}: {
  form: PlayerForm
  onChange: (form: PlayerForm) => void
  t: ReturnType<typeof useAppContext>["t"]
  mode?: "add" | "edit"
}) {
  const [activeSection, setActiveSection] = useState<EditFormTab>("info")

  const sections: { id: EditFormTab; label: string }[] = [
    { id: "info", label: "Info" },
    { id: "season", label: "Season Stats" },
    { id: "attributes", label: "Attributes" },
  ]

  return (
    <div>
      {/* Section tabs — only show in edit mode for full control */}
      {mode === "edit" && (
        <div className="mb-4 flex gap-1 rounded-lg border border-border bg-secondary/50 p-1">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "flex-1 rounded-md py-1.5 text-[11px] font-semibold transition-all",
                activeSection === s.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      {(mode === "add" || activeSection === "info") && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <FieldLabel>{t.admin.player_name}</FieldLabel>
            <FormInput value={form.name} onChange={(v) => onChange({ ...form, name: v })} />
          </div>
          <div>
            <FieldLabel>{t.admin.player_age}</FieldLabel>
            <FormInput type="number" value={form.age} onChange={(v) => onChange({ ...form, age: v })} />
          </div>
          <div>
            <FieldLabel>{t.admin.player_club}</FieldLabel>
            <FormInput value={form.club} onChange={(v) => onChange({ ...form, club: v })} />
          </div>
          <div>
            <FieldLabel>{t.admin.player_position}</FieldLabel>
            <select
              value={form.position}
              onChange={(e) => onChange({ ...form, position: e.target.value as Player["position"] })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            >
              <option value="forward">{t.players.forward}</option>
              <option value="midfielder">{t.players.midfielder}</option>
              <option value="defender">{t.players.defender}</option>
              <option value="goalkeeper">{t.players.goalkeeper}</option>
            </select>
          </div>
          <div>
            <FieldLabel>{t.admin.player_nationality}</FieldLabel>
            <FormInput value={form.nationality} onChange={(v) => onChange({ ...form, nationality: v })} />
          </div>
          <div>
            <FieldLabel>{t.admin.player_rating}</FieldLabel>
            <FormInput type="number" step="0.1" min="0" max="10" value={form.rating} onChange={(v) => onChange({ ...form, rating: v })} />
          </div>
        </div>
      )}

      {/* Season Stats */}
      {mode === "edit" && activeSection === "season" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <FieldLabel>{t.profile.appearances}</FieldLabel>
            <FormInput type="number" min="0" value={form.appearances} onChange={(v) => onChange({ ...form, appearances: v })} />
          </div>
          <div>
            <FieldLabel>{t.profile.goals}</FieldLabel>
            <FormInput type="number" min="0" value={form.goals} onChange={(v) => onChange({ ...form, goals: v })} />
          </div>
          <div>
            <FieldLabel>{t.profile.assists}</FieldLabel>
            <FormInput type="number" min="0" value={form.assists} onChange={(v) => onChange({ ...form, assists: v })} />
          </div>
          <div>
            <FieldLabel>Clean Sheets</FieldLabel>
            <FormInput type="number" min="0" value={form.cleanSheets} onChange={(v) => onChange({ ...form, cleanSheets: v })} />
          </div>
          <div>
            <FieldLabel>{t.admin.player_rating}</FieldLabel>
            <FormInput type="number" step="0.1" min="0" max="10" value={form.rating} onChange={(v) => onChange({ ...form, rating: v })} />
          </div>
        </div>
      )}

      {/* Attributes */}
      {mode === "edit" && activeSection === "attributes" && (
        <div className="flex flex-col gap-3.5 rounded-xl border border-border bg-secondary/20 p-4">
          <StatSlider label={t.profile.pace}      value={form.pace}      onChange={(v) => onChange({ ...form, pace: v })} />
          <StatSlider label={t.profile.shooting}  value={form.shooting}  onChange={(v) => onChange({ ...form, shooting: v })} />
          <StatSlider label={t.profile.passing}   value={form.passing}   onChange={(v) => onChange({ ...form, passing: v })} />
          <StatSlider label={t.profile.dribbling} value={form.dribbling} onChange={(v) => onChange({ ...form, dribbling: v })} />
          <StatSlider label={t.profile.defending} value={form.defending} onChange={(v) => onChange({ ...form, defending: v })} />
          <StatSlider label={t.profile.physical}  value={form.physical}  onChange={(v) => onChange({ ...form, physical: v })} />
        </div>
      )}
    </div>
  )
}

// ─── Photo Uploader ───────────────────────────────────────────────────────────

function PhotoUploader({
  currentImage,
  preview,
  onSelect,
}: {
  currentImage: string
  preview: string | null
  onSelect: (dataUrl: string) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === "string") onSelect(result)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const displaySrc = preview ?? currentImage
  const hasPhoto = Boolean(displaySrc)

  return (
    <div className="flex items-start gap-4">
      {/* Preview */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-border bg-secondary">
        {hasPhoto ? (
          <img
            src={displaySrc}
            alt="Player photo"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Drop zone */}
      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-4 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-secondary/40"
          )}
          onClick={() => inputRef.current?.click()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="text-center">
            <p className="text-xs font-semibold text-foreground">Upload Photo</p>
            <p className="text-[10px] text-muted-foreground">
              {preview ? "Photo selected — click to replace" : "Click or drag & drop an image"}
            </p>
          </div>
        </div>
        {preview && (
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-primary">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            New photo selected — will save with player
          </p>
        )}
      </div>
    </div>
  )
}

// Icon helpers
function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function PlayersTab() {
  const { t, state, addPlayer, updatePlayer, deletePlayer } = useAppContext()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<PlayerForm>(emptyForm)
  const [editPhoto, setEditPhoto] = useState<string | null>(null)
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
        pace:      parseInt(addForm.pace)      || 70,
        shooting:  parseInt(addForm.shooting)  || 70,
        passing:   parseInt(addForm.passing)   || 70,
        dribbling: parseInt(addForm.dribbling) || 70,
        defending: parseInt(addForm.defending) || 70,
        physical:  parseInt(addForm.physical)  || 70,
      },
      seasonStats: {
        appearances: parseInt(addForm.appearances) || 0,
        goals:       parseInt(addForm.goals)       || 0,
        assists:     parseInt(addForm.assists)      || 0,
        cleanSheets: parseInt(addForm.cleanSheets) || 0,
        rating:      parseFloat(addForm.rating)    || 7.0,
      },
      history: [],
    }
    addPlayer(newPlayer)
    setShowAdd(false)
    setAddForm(emptyForm)
  }

  const startEdit = (player: Player) => {
    setEditingId(player.id)
    setConfirmDeleteId(null)
    setEditPhoto(null)
    setEditForm({
      name: player.name,
      age: String(player.age),
      club: player.club,
      position: player.position,
      nationality: player.nationality,
      appearances: String(player.seasonStats.appearances),
      goals: String(player.seasonStats.goals),
      assists: String(player.seasonStats.assists),
      cleanSheets: String(player.seasonStats.cleanSheets),
      rating: String(player.seasonStats.rating),
      pace: String(player.stats.pace),
      shooting: String(player.stats.shooting),
      passing: String(player.stats.passing),
      dribbling: String(player.stats.dribbling),
      defending: String(player.stats.defending),
      physical: String(player.stats.physical),
    })
  }

  const saveEdit = (id: string) => {
    const original = state.players.find((p) => p.id === id)
    if (!original) return
    updatePlayer(id, {
      name: editForm.name.trim() || original.name,
      age: parseInt(editForm.age) || original.age,
      club: editForm.club.trim() || original.club,
      position: editForm.position,
      nationality: editForm.nationality.trim() || original.nationality,
      ...(editPhoto ? { image: editPhoto } : {}),
      stats: {
        pace:      Math.min(99, Math.max(0, parseInt(editForm.pace)      || original.stats.pace)),
        shooting:  Math.min(99, Math.max(0, parseInt(editForm.shooting)  || original.stats.shooting)),
        passing:   Math.min(99, Math.max(0, parseInt(editForm.passing)   || original.stats.passing)),
        dribbling: Math.min(99, Math.max(0, parseInt(editForm.dribbling) || original.stats.dribbling)),
        defending: Math.min(99, Math.max(0, parseInt(editForm.defending) || original.stats.defending)),
        physical:  Math.min(99, Math.max(0, parseInt(editForm.physical)  || original.stats.physical)),
      },
      seasonStats: {
        appearances: parseInt(editForm.appearances)  || original.seasonStats.appearances,
        goals:       parseInt(editForm.goals)        || original.seasonStats.goals,
        assists:     parseInt(editForm.assists)      || original.seasonStats.assists,
        cleanSheets: parseInt(editForm.cleanSheets)  || original.seasonStats.cleanSheets,
        rating:      parseFloat(editForm.rating)     || original.seasonStats.rating,
      },
    })
    setEditingId(null)
    setEditPhoto(null)
  }

  const handleDelete = (id: string) => {
    if (editingId === id) setEditingId(null)
    deletePlayer(id)
    setConfirmDeleteId(null)
  }

  const POSITION_COLOR: Record<Player["position"], string> = {
    forward: "bg-orange-500/15 text-orange-400",
    midfielder: "bg-blue-500/15 text-blue-400",
    defender: "bg-green-500/15 text-green-400",
    goalkeeper: "bg-purple-500/15 text-purple-400",
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {t.admin.players_management}
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {state.players.length} players
          </p>
        </div>
        <button
          onClick={() => {
            setShowAdd((prev) => !prev)
            setAddForm(emptyForm)
            setEditingId(null)
          }}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
            showAdd
              ? "bg-secondary text-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/80"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t.admin.add_player}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="rounded-xl border border-primary/30 bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <h4 className="text-xs font-semibold text-foreground">{t.admin.add_player}</h4>
          </div>
          <PlayerFormFields form={addForm} onChange={setAddForm} t={t} />
          <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
            <button
              onClick={handleAdd}
              disabled={!addForm.name.trim() || !addForm.club.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconCheck />
              {t.admin.add_player}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconX />
              {t.admin.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Players table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">{t.admin.player_name}</th>
                <th className="px-4 py-3 font-medium">{t.admin.player_club}</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  {t.admin.player_position}
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  {t.admin.player_age}
                </th>
                <th className="px-4 py-3 font-medium">{t.admin.player_rating}</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.players.map((player, index) => (
                <React.Fragment key={player.id}>
                  {/* Player row */}
                  <tr
                    className={cn(
                      "border-b border-border/50 transition-colors",
                      index === state.players.length - 1 && editingId !== player.id && "border-0",
                      editingId === player.id
                        ? "bg-primary/5"
                        : "hover:bg-secondary/30"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {editingId === player.id && (
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          {player.image ? (
                            <img
                              src={player.image}
                              alt={player.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-muted-foreground">
                              {player.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-foreground">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{player.club}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold", POSITION_COLOR[player.position])}>
                        {t.players[player.position]}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-foreground md:table-cell">
                      {player.age}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">
                        {player.seasonStats.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit toggle */}
                        <button
                          onClick={() =>
                            editingId === player.id ? setEditingId(null) : startEdit(player)
                          }
                          title={t.admin.edit_player}
                          className={cn(
                            "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                            editingId === player.id
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <IconEdit />
                          {t.admin.edit_player}
                        </button>

                        {/* Delete / confirm */}
                        {confirmDeleteId === player.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(player.id)}
                              className="flex items-center gap-1 rounded-md bg-destructive px-2.5 py-1.5 text-[11px] font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
                            >
                              <IconCheck />
                              {t.admin.confirm_delete}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <IconX />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(player.id)}
                            title={t.admin.delete_player}
                            className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <IconTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Inline edit form row */}
                  {editingId === player.id && (
                    <tr className="border-b border-primary/20 bg-primary/5">
                      <td colSpan={6} className="px-4 pb-5 pt-1">
                        <div className="rounded-xl border border-primary/20 bg-card p-4 shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="text-xs font-semibold text-foreground">
                                {t.admin.edit_player}: {player.name}
                              </span>
                            </div>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <IconX />
                            </button>
                          </div>

                          <PlayerFormFields form={editForm} onChange={setEditForm} t={t} mode="edit" />

                          <div className="mt-4 border-t border-border pt-4">
                            <FieldLabel>Photo</FieldLabel>
                            <PhotoUploader
                              currentImage={player.image}
                              preview={editPhoto}
                              onSelect={setEditPhoto}
                            />
                          </div>

                          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                            <button
                              onClick={() => saveEdit(player.id)}
                              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
                            >
                              <IconCheck />
                              {t.admin.save}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <IconX />
                              {t.admin.cancel}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

export function SettingsTab() {
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


