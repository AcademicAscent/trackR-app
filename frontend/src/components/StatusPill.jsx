export default function StatusPill({ variant = "high" }) {
    if (variant === "track") {
      return (
        <span className="text-xs font-bold tracking-wider bg-[#E1F6EF] text-[#0F172A] px-2 py-1 rounded">
          ON TRACK
        </span>
      )
    }
    return (
      <span className="text-xs font-bold tracking-wider text-[#E11D48]">
        HIGH PRIORITY
      </span>
    )
  }
  