"use client"

import { cn } from "@/lib/utils"

interface StatRadarProps {
  stats: {
    label: string
    value: number
  }[]
  size?: number
  className?: string
  color?: string
}

export function StatRadar({ stats, size = 200, className, color = "hsl(145, 65%, 42%)" }: StatRadarProps) {
  const center = size / 2
  const radius = size / 2 - 20
  const angleStep = (2 * Math.PI) / stats.length

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2
    const r = (value / 100) * radius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    }
  }

  const gridLevels = [20, 40, 60, 80, 100]

  const dataPoints = stats.map((s, i) => getPoint(i, s.value))
  const pathD = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <div className={cn("relative", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridLevels.map((level) => {
          const points = stats
            .map((_, i) => {
              const p = getPoint(i, level)
              return `${p.x},${p.y}`
            })
            .join(" ")
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="hsl(220, 14%, 18%)"
              strokeWidth="1"
            />
          )
        })}

        {stats.map((_, i) => {
          const p = getPoint(i, 100)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="hsl(220, 14%, 18%)"
              strokeWidth="1"
            />
          )
        })}

        <polygon
          points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="2"
        />

        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
        ))}

        {stats.map((s, i) => {
          const labelPoint = getPoint(i, 120)
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {s.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
