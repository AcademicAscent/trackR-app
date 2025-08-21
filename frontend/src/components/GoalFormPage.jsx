import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../state/AppState.jsx"

export default function GoalFormPage() {
  const { createGoal, user } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    targetValue: "",
    unit: "",
  })
  const [dateError, setDateError] = useState("")
  const today = new Date().toISOString().split("T")[0]

  function update(k, v) { setForm((prev) => ({ ...prev, [k]: v })) }

  function handleStartDate(v) {
    setDateError("")
    update("startDate", v)
    if (form.endDate && v && form.endDate < v) update("endDate", "")
  }

  function handleEndDate(v) {
    setDateError("")
    if (form.startDate && v < form.startDate) {
      setDateError("End date cannot be before start date.")
      return
    }
    update("endDate", v)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setDateError("End date cannot be before start date.")
      return
    }
    createGoal(form)
    navigate("/dashboard")
  }

  return (
    <div className="p-6">
      {!user && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          (Tip: Log in from the sidebar to keep your goals saved to this browser.)
        </div>
      )}

      <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
        <h2 className="text-3xl font-extrabold text-[#0F172A] dark:text-gray-100 mb-4">Create Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A]" placeholder="Title" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          <textarea className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A]" rows={4} placeholder="Description (multiline)" value={form.description} onChange={(e) => update("description", e.target.value)} />
          <select className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A] text-gray-600 dark:text-gray-200" value={form.category} onChange={(e) => update("category", e.target.value)}>
            <option value="">Category (select)</option>
            <option>Study</option>
            <option>Project</option>
            <option>Habit</option>
          </select>

          <label className="block">
            <span className="sr-only">Start Date</span>
            <input type="date" className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A]" value={form.startDate} onChange={(e) => handleStartDate(e.target.value)} min={today} max={form.endDate || undefined} required />
          </label>

          <label className="block">
            <span className="sr-only">End Date</span>
            <input type="date" className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A]" value={form.endDate} onChange={(e) => handleEndDate(e.target.value)} min={form.startDate || today} required />
          </label>

          {dateError && <p className="text-sm text-[#E11D48]">{dateError}</p>}

          <input className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A]" placeholder="Target Value" value={form.targetValue} onChange={(e) => update("targetValue", e.target.value)} />
          <select className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A] text-gray-600 dark:text-gray-200" value={form.unit} onChange={(e) => update("unit", e.target.value)}>
            <option value="">Unit (select)</option>
            <option>hours</option>
            <option>pages</option>
            <option>problems</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-gray-200 text-[#0F172A] font-semibold dark:bg-gray-700 dark:text-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-[#E11D48] text-white font-semibold">Save Goal</button>
          </div>
        </form>
      </div>
    </div>
  )
}
