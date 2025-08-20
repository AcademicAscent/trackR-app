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
<<<<<<< HEAD
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Goals</h1>
        <Link to="/goals/new" className="px-3 py-2 rounded bg-black text-white">
=======
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <img src="src/images/ant-cookie2.png" alt="Goals" className="w-24 h-34" />
            My Goals
            </h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
>>>>>>> 8e1765a (Ant added onto every page and mr=ore gamification aspects)
          + Add New Goal
        </Link>
      </div>

<<<<<<< HEAD
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
=======
      {/* Add Goal Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleAddGoal}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your goal..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Describe your goal..."
                rows="3"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Save Goal
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
                <p className="text-gray-600 mt-1">{goal.description}</p>
              </div>
              <button
                onClick={() => handleDeleteGoal(goal._id)}
                className="text-red-500 hover:text-red-700 font-medium text-sm"
              >
                Delete
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Progress: {goal.progress.length} check-ins
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(goal.progress.length * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl">No goals yet!</p>
            <p>Click "Add New Goal" to get started.</p>
          </div>
>>>>>>> 8e1765a (Ant added onto every page and mr=ore gamification aspects)
        )}
      </div>
    </div>
  );
}
