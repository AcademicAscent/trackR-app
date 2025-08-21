export default function ProgressBar({ value = 0 }) {
    const pct = Math.max(0, Math.min(100, Number(value) || 0))
    return (
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-[#E11D48]" style={{ width: `${pct}%` }} />
      </div>
    )
  }
  