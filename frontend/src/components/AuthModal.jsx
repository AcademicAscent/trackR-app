import { useState } from "react"
import Modal from "./Modal.jsx"
import Tabs from "./Tabs.jsx"
import { useApp } from "../state/AppState.jsx"

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("login")
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login / Registration">
      <Tabs
        tabs={[{ id: "login", label: "Login" }, { id: "register", label: "Registration" }]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div className="mt-4">
        {activeTab === "login" ? <LoginForm onDone={onClose} /> : <RegisterForm onDone={onClose} />}
      </div>
    </Modal>
  )
}

function LoginForm({ onDone }) {
  const { login } = useApp()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setTimeout(() => {
      login({ email })
      setLoading(false)
      setSuccess(true)
      setTimeout(() => onDone?.(), 900)
    }, 1200)
  }

  const disabled = loading || success
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${disabled ? "opacity-90" : ""}`}>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded px-3 py-2"
        disabled={disabled}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded px-3 py-2"
        disabled={disabled}
        required
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Forgot password?</span>
        <button
          type="submit"
          disabled={disabled}
          className={`px-4 py-2 rounded text-sm font-semibold text-white ${success ? "bg-[#10B981]" : "bg-[#E11D48]"}`}
        >
          {loading ? (
            <span className="inline-flex items-center">
              <span className="inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin mr-2" />
              Logging in…
            </span>
          ) : success ? "Logged in!" : "Log in"}
        </button>
      </div>
    </form>
  )
}

function RegisterForm({ onDone }) {
  const { login } = useApp()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setTimeout(() => {
      login({ name, email })
      setLoading(false)
      setSuccess(true)
      setTimeout(() => onDone?.(), 900)
    }, 1400)
  }

  const disabled = loading || success
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${disabled ? "opacity-90" : ""}`}>
      <input
        type="text"
        placeholder="Name"
        className="w-full border border-gray-300 rounded px-3 py-2"
        disabled={disabled}
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded px-3 py-2"
        disabled={disabled}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded px-3 py-2"
        disabled={disabled}
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={disabled}
          className={`px-4 py-2 rounded text-sm font-semibold text-white ${success ? "bg-[#10B981]" : "bg-[#E11D48]"}`}
        >
          {loading ? (
            <span className="inline-flex items-center">
              <span className="inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin mr-2" />
              Creating account…
            </span>
          ) : success ? "Account created!" : "Register"}
        </button>
      </div>
    </form>
  )
}
