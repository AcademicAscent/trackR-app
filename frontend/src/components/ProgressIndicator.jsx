import React from 'react';

function ProgressIndicator({ badge, userStats }) {
  const getProgress = (badgeId) => {
    switch (badgeId) {
      case 'first_goal_complete':
        return {
          current: userStats.completedGoals || 0,
          required: 1,
          percentage: Math.min((userStats.completedGoals || 0) / 1 * 100, 100)
        };
      case 'study_five_hours':
        return {
          current: userStats.longestSession || 0,
          required: 5,
          percentage: Math.min((userStats.longestSession || 0) / 5 * 100, 100)
        };
      case 'daily_dynamo_3_day':
        return {
          current: userStats.currentStreak || 0,
          required: 3,
          percentage: Math.min((userStats.currentStreak || 0) / 3 * 100, 100)
        };
      default:
        return { current: 0, required: 1, percentage: 0 };
    }
  };

  const progress = getProgress(badge.id);

  const BADGE_DESIGNS = {
    first_goal_complete: '🐜🍪',
    study_five_hours: '🐜💎', 
    daily_dynamo_3_day: '🐜🥧'
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2 grayscale opacity-50">
          {BADGE_DESIGNS[badge.id] || '🏆'}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{badge.name}</h3>
        <p className="text-sm text-gray-600">{badge.description}</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress.current}/{progress.required}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-sm text-gray-500">{badge.requirement}</span>
      </div>
    </div>
  );
}

export default ProgressIndicator;
