import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AppContext = createContext(null)
const LS_KEY = "trackr_state_v1"

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [goals, setGoals] = useState([])
  const [settings, setSettings] = useState({
    darkMode: false,
    bgmEnabled: false,
    bgmProvider: "url",   // "url" | "spotify" | "apple"
    bgmUrl: "",
    bgmSpotifyUrl: "",
    bgmAppleUrl: "",
    bgmVolume: 0.4,
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const p = JSON.parse(raw)
        setUser(p.user ?? null)
        setGoals(p.goals ?? [])
        setSettings({
          darkMode: p.settings?.darkMode ?? false,
          bgmEnabled: p.settings?.bgmEnabled ?? false,
          bgmProvider: p.settings?.bgmProvider ?? "url",
          bgmUrl: p.settings?.bgmUrl ?? "",
          bgmSpotifyUrl: p.settings?.bgmSpotifyUrl ?? "",
          bgmAppleUrl: p.settings?.bgmAppleUrl ?? "",
          bgmVolume: p.settings?.bgmVolume ?? 0.4,
        })
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ user, goals, settings }))
  }, [user, goals, settings])

  const login = ({ name, email }) => {
    const id = (crypto?.randomUUID?.() ?? String(Date.now()))
    setUser({ id, name: name || "", email })
  }
  const logout = () => setUser(null)

  const createGoal = (g) => {
    const id = (crypto?.randomUUID?.() ?? String(Date.now()))
    const newGoal = {
      id,
      title: g.title,
      description: g.description || "",
      category: g.category || "",
      startDate: g.startDate || "",
      endDate: g.endDate || "",
      targetValue: g.targetValue || "",
      unit: g.unit || "",
      progress: 0,
      state: "locked",
      createdAt: Date.now(),
    }
    setGoals((prev) => [newGoal, ...prev])
    return newGoal
  }

  const updateGoalProgress = (id, progress) => {
    const pct = Math.max(0, Math.min(100, Number(progress) || 0))
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, progress: pct, state: pct >= 100 ? "earned" : "locked" } : g
      )
    )
  }

  const setDarkMode      = (v) => setSettings((s) => ({ ...s, darkMode: !!v }))
  const setBgmEnabled    = (v) => setSettings((s) => ({ ...s, bgmEnabled: !!v }))
  const setBgmProvider   = (v) => setSettings((s) => ({ ...s, bgmProvider: v }))
  const setBgmUrl        = (v) => setSettings((s) => ({ ...s, bgmUrl: String(v || "") }))
  const setBgmSpotifyUrl = (v) => setSettings((s) => ({ ...s, bgmSpotifyUrl: String(v || "") }))
  const setBgmAppleUrl   = (v) => setSettings((s) => ({ ...s, bgmAppleUrl: String(v || "") }))
  const setBgmVolume     = (v) => {
    let n = Number(v); if (!isFinite(n)) n = 0.4
    setSettings((s) => ({ ...s, bgmVolume: Math.min(1, Math.max(0, n)) }))
  }

  const value = useMemo(() => ({
    user, goals, settings,
    login, logout, createGoal, updateGoalProgress,
    setDarkMode, setBgmEnabled, setBgmProvider, setBgmUrl, setBgmSpotifyUrl, setBgmAppleUrl, setBgmVolume,
  }), [user, goals, settings])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
