// frontend/src/components/GoalCard.jsx

import React from 'react';

function GoalCard({ goal, onDailyCheckin }) {
  // Check if there is a check-in for today
  const todayCheckedIn = goal.progress.some(p => {
    const progressDate = new Date(p.date);
    const today = new Date();
    return (
      progressDate.getFullYear() === today.getFullYear() &&
      progressDate.getMonth() === today.getMonth() &&
      progressDate.getDate() === today.getDate()
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
        <p className="text-gray-500 mt-1">{goal.description}</p>
      </div>

      {/* The circular check-in button */}
      <button
        onClick={() => onDailyCheckin(goal._id)}
        disabled={todayCheckedIn}
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-200
          ${todayCheckedIn
            ? 'bg-green-500 border-green-500 text-white'
            : 'bg-white border-gray-400 hover:bg-gray-100'
          } `}
      >
        {todayCheckedIn && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default GoalCard;