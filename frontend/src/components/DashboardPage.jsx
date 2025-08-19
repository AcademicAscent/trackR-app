import GoalCard from "./GoalCard.jsx"
import { useApp } from "../state/AppState.jsx"

export default function DashboardPage() {
  const { goals } = useApp()

  const now = new Date()
  const day = now.getDay()
  const diffToMon = day === 0 ? -6 : 1 - day
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMon)
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)
  endOfWeek.setMilliseconds(-1)

  const toDate = (v) => {
    if (!v) return null
    const d = new Date(v)
    return isNaN(d.getTime()) ? null : d
  }
  const overlapsWeek = (g) => {
    const s = toDate(g.startDate)
    const e = toDate(g.endDate)
    if (s && e) return e >= startOfWeek && s <= endOfWeek
    if (s) return s >= startOfWeek && s <= endOfWeek
    if (e) return e >= startOfWeek && e <= endOfWeek
    const c = g.createdAt ? new Date(g.createdAt) : null
    return c ? c >= startOfWeek && c <= endOfWeek : false
  }
  const clampPct = (v) => {
    const n = Number(v)
    if (!isFinite(n)) return 0
    return Math.max(0, Math.min(100, Math.round(n)))
  }
  const num = (v) => (isFinite(Number(v)) ? Number(v) : 0)

  const metricGoals = goals.filter(overlapsWeek)

  const weeklyProgress = (() => {
    if (metricGoals.length === 0) return 0
    const list = metricGoals.map((g) => clampPct(g.progress))
    if (list.length === 0) return 0
    return Math.round(list.reduce((a, b) => a + b, 0) / list.length)
  })()

  const focusHours = (() => {
    if (metricGoals.length === 0) return 0
    return metricGoals.reduce((sum, g) => {
      const unit = String(g.unit || "").toLowerCase()
      if (!unit.includes("hour")) return sum
      const target = num(g.targetValue)
      const pct = clampPct(g.progress) / 100
      return sum + target * pct
    }, 0)
  })()

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5">
          <div className="text-xs tracking-widest text-gray-500 dark:text-gray-300">WEEKLY PROGRESS</div>
          <div className="text-[48px] font-extrabold text-[#E11D48] leading-none mt-1">{weeklyProgress || 0}%</div>
        </div>
        <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5">
          <div className="text-xs tracking-widest text-gray-500 dark:text-gray-300">FOCUS TIME</div>
          <div className="text-[48px] font-extrabold text-[#E11D48] leading-none mt-1">{(focusHours || 0).toFixed(1)}h</div>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-gray-600 dark:text-gray-300">
          No goals yet.
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              id={g.id}
              title={g.title}
              description={g.description || "Short description"}
              progress={clampPct(g.progress)}
              status={g.state === "earned" ? "track" : "high"}
              editable
            />
          ))}
        </div>
      )}
    </div>
  )
}
