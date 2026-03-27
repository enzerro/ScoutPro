import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

interface StatBarProps {
  label: string
  value: number
  maxValue?: number
  className?: string
}

export function StatBar({ label, value, maxValue = 100, className }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  const barRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const getColor = (val: number) => {
    if (val >= 85) return "bg-primary"
    if (val >= 70) return "bg-chart-2"
    if (val >= 50) return "bg-chart-3"
    return "bg-destructive"
  }

  return (
    <div ref={barRef} className={cn("flex items-center gap-3", className)}>
      <span className="w-24 shrink-0 text-xs text-muted-foreground">{label}</span>
      <div className="flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full", getColor(value))}
            style={{
              width: animated ? `${percentage}%` : "0%",
              transition: animated ? "width 0.9s cubic-bezier(0.4,0,0.2,1)" : "none",
            }}
          />
        </div>
      </div>
      <span className="w-8 shrink-0 text-right text-xs font-semibold text-foreground">{value}</span>
    </div>
  )
}
