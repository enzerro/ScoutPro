import { cn } from "../lib/utils"

interface StatBarProps {
  label: string
  value: number
  maxValue?: number
  className?: string
}

export function StatBar({ label, value, maxValue = 100, className }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)

  const getColor = (val: number) => {
    if (val >= 85) return "bg-primary"
    if (val >= 70) return "bg-chart-2"
    if (val >= 50) return "bg-chart-3"
    return "bg-destructive"
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-24 text-xs text-muted-foreground">{label}</span>
      <div className="flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full transition-all duration-700", getColor(value))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="w-8 text-right text-xs font-semibold text-foreground">{value}</span>
    </div>
  )
}
