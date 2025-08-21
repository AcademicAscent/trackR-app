import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../components/GoalCard.jsx";
import { getGoals } from "../api/goals";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const data = await getGoals();
      const list = Array.isArray(data) ? data : Array.isArray(data?.goals) ? data.goals : [];
      setGoals(list);
    } catch (e) {
      setErr(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleDeleted(deletedId) {
    setGoals((gs) => gs.filter((x) => String(x.id ?? x._id) !== String(deletedId)));
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Goals</h1>
        <Link to="/goals/new" className="px-3 py-2 rounded bg-black text-white">
          + Add New Goal
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">{err}</p>}

      <div className="space-y-3">
        {goals.map((g) => {
          const id = g.id ?? g._id;
          return (
            <GoalCard
              key={String(id)}
              id={id}
              title={g.title}
              description={g.description}
              progress={g.progressPct ?? 0}
              status={g.status ?? "high"}
              onDeleted={handleDeleted}
            />
          );
        })}
        {!loading && goals.length === 0 && !err && (
          <p className="text-sm text-gray-500">No goals yet. Click “Add New Goal”.</p>
        )}
      </div>
    </div>
  );
}
