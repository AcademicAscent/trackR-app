import { useEffect } from "react"

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.()
    if (isOpen) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-xl shadow-lg p-6">
        {title ? <h3 className="text-xl font-bold mb-3">{title}</h3> : null}
        {children}
      </div>
    </div>
  )
}
