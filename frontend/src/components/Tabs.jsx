export default function Tabs({ tabs, activeTab, onChange }) {
    return (
      <div className="inline-flex rounded-md overflow-hidden border border-gray-200">
        {tabs.map((t, i) => {
          const active = t.id === activeTab
          return (
            <button
              key={t.id}
              onClick={() => onChange?.(t.id)}
              className={`px-4 py-2 text-sm font-semibold ${active ? "bg-[#E11D48] text-white" : "bg-gray-100 text-[#0F172A]"}`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
    )
  }
  