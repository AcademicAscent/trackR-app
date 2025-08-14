import ProgressBar from "./ProgressBar.jsx"
import StatusPill from "./StatusPill.jsx"
import { useApp } from "../state/AppState.jsx"

export default function GoalCard({ id, title, description, progress = 0, status = "high", editable = false }) {
  const { updateGoalProgress } = useApp()
  const pct = clampPct(progress)

  const onSlide = (e) => editable && id && updateGoalProgress(id, Number(e.target.value))
  const markDone = () => id && updateGoalProgress(id, 100)
  const reset = () => id && updateGoalProgress(id, 0)

  return (
    <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-sm bg-[#0F172A]" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0F172A] dark:text-gray-100 leading-tight">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 -mt-0.5">{description}</p>
            </div>
            <StatusPill variant={status} />
          </div>

          <div className="mt-3">
            <ProgressBar value={pct} />
          </div>

          {editable && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input type="range" min={0} max={100} value={pct} onChange={onSlide} className="w-48" aria-label="Progress" />
              <span className="text-sm text-gray-600 dark:text-gray-300 tabular-nums w-12 text-right">{pct}%</span>
              <button type="button" onClick={markDone} className="px-3 py-1.5 rounded bg-[#10B981] text-white text-xs font-semibold">Mark done</button>
              <button type="button" onClick={reset} className="px-3 py-1.5 rounded bg-gray-200 text-[#0F172A] text-xs font-semibold dark:bg-gray-700 dark:text-gray-100">Reset</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function clampPct(v) {
  const n = Number(v) || 0
  return Math.max(0, Math.min(100, Math.round(n)))
}
