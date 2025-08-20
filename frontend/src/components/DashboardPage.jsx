import React, { useState, useEffect } from 'react';
import GoalCard from "./GoalCard.jsx"
import { useApp } from "../state/AppState.jsx"
import { useNavigate } from "react-router";

function Dashboard() {
  const { goals } = useApp()
  
  const [checkIns, setCheckIns] = useState(2);
  const [totalStudyTime, setTotalStudyTime] = useState(8.2);
  const [lastCheckIn, setLastCheckIn] = useState('2025-08-17');
  
  // Timer state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let navigate = useNavigate();
  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastCheckIn !== today) {
      setCheckIns(prev => prev + 1);
      setTotalStudyTime(prev => prev + 2);
      setLastCheckIn(today);
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Navigate to goals page when Add Goal is clicked
  const handleAddGoal = () => {
    navigate("/goals/new");
  };

  // Weekly metrics calculation (from DashboardPage)
  const now = new Date()
  const day = now.getDay()
  const diffToMon = day === 0 ? -6 : 1 - day
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMon)
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)
  endOfWeek.setMilliseconds(-1)

  const toDate = (v) => {
    if (!v) return null
    const d = new Date(v)
    return isNaN(d.getTime()) ? null : d
  }
  const overlapsWeek = (g) => {
    const s = toDate(g.startDate)
    const e = toDate(g.endDate)
    if (s && e) return e >= startOfWeek && s <= endOfWeek
    if (s) return s >= startOfWeek && s <= endOfWeek
    if (e) return e >= startOfWeek && e <= endOfWeek
    const c = g.createdAt ? new Date(g.createdAt) : null
    return c ? c >= startOfWeek && c <= endOfWeek : false
  }
  const clampPct = (v) => {
    const n = Number(v)
    if (!isFinite(n)) return 0
    return Math.max(0, Math.min(100, Math.round(n)))
  }
  const num = (v) => (isFinite(Number(v)) ? Number(v) : 0)

  const metricGoals = goals.filter(overlapsWeek)

  const weeklyProgress = (() => {
    if (metricGoals.length === 0) return 0
    const list = metricGoals.map((g) => clampPct(g.progress))
    if (list.length === 0) return 0
    return Math.round(list.reduce((a, b) => a + b, 0) / list.length)
  })()

  const focusHours = (() => {
    if (metricGoals.length === 0) return 0
    return metricGoals.reduce((sum, g) => {
      const unit = String(g.unit || "").toLowerCase()
      if (!unit.includes("hour")) return sum
      const target = num(g.targetValue)
      const pct = clampPct(g.progress) / 100
      return sum + target * pct
    }, 0)
  })()

  const studyData = [
    { date: '2025-08-09', hours: 2.5 },
    { date: '2025-08-10', hours: 3.2 },
    { date: '2025-08-11', hours: 1.5 },
    { date: '2025-08-12', hours: 2.8 }
  ];

  const isCheckedInToday = lastCheckIn === new Date().toISOString().split('T')[0];
  const maxHours = Math.max(...studyData.map(d => d.hours));

  // Calculate sand timer fill percentage based on time (resets every 5 minutes)
  const sandTimerProgress = ((time % 300) / 300) * 100;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Progress Dashboard</h1>
        <button 
          onClick={handleAddGoal}
          className="bg-[#E11D48] hover:bg-[#E11D48] text-white px-6 py-3 rounded font-semibold shadow-lg transition-colors duration-200"
        >
          + Add Goal
        </button>
      </div>

      {/* Check In Button */}
      <div className="mb-8">
         <button 
          onClick={handleCheckIn}
          disabled={isCheckedInToday}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
            isCheckedInToday 
              ? 'bg-green-500 text-white cursor-not-allowed' 
              : 'bg-[#E11D48] hover:bg-[#E11D48] text-white hover:shadow-xl'
          }`}
        >
          {isCheckedInToday ? (
            <>
              THE ANTVENTURE BEGINS!<img src="src/images/antme.png" alt="Success" className="w-14 h-14" />
            </>) : (
            <>
              <img src="src/images/anthill.png" alt="Check In" className="w-12 h-10" />CHECK IN
            </>)}
        </button>
      </div>

      {/* Weekly Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-xs tracking-widest text-gray-500 dark:text-gray-300 mb-2">WEEKLY PROGRESS</div>
          <div className="text-5xl font-extrabold text-[#E11D48] leading-none">{weeklyProgress || 0}%</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-xs tracking-widest text-gray-500 dark:text-gray-300 mb-2">FOCUS TIME</div>
          <div className="text-5xl font-extrabold text-[#E11D48] leading-none">{(focusHours || 0).toFixed(1)}h</div>
        </div>
      </div>

      {/* Timer and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gamified Study Timer Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Study Timer</h3>
          <div className="text-center">
            {/* Animated Sand Timer */}
            <div className="flex justify-center mb-6 relative">
              <div className="relative">
                {/* Sand Timer Container */}
                <div className="w-20 h-24 relative">
                  {/* Top bulb */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-amber-100 border-4 border-amber-800 rounded-t-full"></div>
                  {/* Top sand */}
                  <div 
                    className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-amber-400 rounded-t-full transition-all duration-1000"
                    style={{
                      width: '56px',
                      height: `${Math.max(4, 28 - (sandTimerProgress * 0.24))}px`
                    }}
                  ></div>
                  {/* Middle neck */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-amber-800"></div>
                  {/* Falling sand stream */}
                  {isRunning && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-amber-400 animate-pulse"></div>
                  )}
                  {/* Bottom bulb */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-amber-100 border-4 border-amber-800 rounded-b-full"></div>
                  {/* Bottom sand */}
                  <div 
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-amber-400 rounded-b-full transition-all duration-1000"
                    style={{
                      width: '56px',
                      height: `${Math.min(24, 4 + (sandTimerProgress * 0.24))}px`
                    }}
                  ></div>
                </div>
                {/* Pulsing effect when running */}
                {isRunning && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-amber-200 opacity-20"></div>
                )}
              </div>
            </div>
            
            <div className="text-6xl font-bold text-blue-500 mb-6 font-mono">
              {formatTime(time)}
            </div>
            
            {/* Enhanced Ant Hill Progress Indicator */}
            <div className="mb-6 p-4 bg-gradient-to-b from-sky-100 to-amber-50 dark:from-sky-900 dark:to-amber-900 rounded-xl">
              <div className="relative">
                {/* Ant Hill */}
                <div className="flex justify-center items-end space-x-0.5 mb-2">
                  {[...Array(15)].map((_, i) => {
                    const isActive = i < Math.floor((time % 900) / 60);
                    const height = Math.max(3, 8 - Math.abs(i - 7));
                    return (
                      <div
                        key={i}
                        className={`transition-all duration-700 ease-out transform ${
                          isActive 
                            ? `bg-gradient-to-t from-amber-800 to-amber-500 shadow-lg scale-110` 
                            : 'bg-gray-300 dark:bg-gray-600'
                        } rounded-t-sm`}
                        style={{
                          width: '8px',
                          height: isActive ? `${height * 4}px` : '4px',
                        }}
                      ></div>
                    );
                  })}
                </div>
                {/* Animated red ants */}
                {isRunning && (
                  <>
                    <div className="absolute bottom-2 left-1/4 animate-bounce text-red-600 text-lg font-bold">🐜</div>
                    <div className="absolute bottom-2 right-1/3 animate-bounce text-red-600 text-lg font-bold" style={{animationDelay: '0.3s'}}>🐜</div>
                    <div className="absolute bottom-3 left-1/2 animate-bounce text-red-600 text-lg font-bold" style={{animationDelay: '0.6s'}}>🐜</div>
                  </>
                )}
              </div>
              <div className="text-center mt-2">
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">🏔️ Ant Hill Progress</p>
                <p className="text-xs text-slate-400">{Math.floor((time % 900) / 60)}/15 minutes</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setIsRunning(true)}
                disabled={isRunning}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  isRunning 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-lg'
                }`}
              >
                Start
              </button>
              <button 
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  !isRunning 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105 shadow-lg'
                }`}
              >
                Stop
              </button>
              <button 
                onClick={handleReset}
                className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Study Progress Chart Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Study Progress</h3>
          <div className="flex items-end justify-center h-48 gap-4">
            {studyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-red-500 w-12 transition-all duration-300 rounded-t hover:bg-red-400"
                  style={{ 
                    height: `${(day.hours / maxHours) * 160}px`,
                    minHeight: '12px'
                  }}
                ></div>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                  {day.date.slice(5)}
                </span>
                <span className="text-xs text-slate-400 text-center mt-1">
                  {day.hours}h
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mt-4">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-slate-600 dark:text-slate-300">Study Hours</span>
          </div>
        </div>
      </div>

      {/* Next Badge to Earn */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Next Badge to Earn</h3>
        <div className="flex items-center gap-6">
          <img 
            src="src/images/ant-pie.png" 
            alt="Daily Dynamo Badge" 
            className="w-28 h-38 grayscale opacity-50"
          />
          <div className="flex-1">
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">Daily Dynamo</h4>
            <p className="text-slate-600 dark:text-slate-300 mb-3">Complete 3-day study streak</p>
            <div className="w-full bg-red-200 dark:bg-red-900 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full w-2/3 transition-all duration-300"></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">2/3 days completed</p>
          </div>
        </div>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-gray-600 dark:text-gray-300">
          No goals yet. Click "Add Goal" to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              id={g.id}
              title={g.title}
              description={g.description || "Short description"}
              progress={clampPct(g.progress)}
              status={g.state === "earned" ? "track" : "high"}
              editable
            />
          ))}
        </div>
      )}
    </div>
  );
}
