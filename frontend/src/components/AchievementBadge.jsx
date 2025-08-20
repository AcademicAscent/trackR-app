import React from 'react';

function AchievementsPage() {
  // Static data - no state or effects to cause loops
  const achievements = [
    { 
      id: '1', 
      name: 'First Goal Complete',
      design: 'src/images/ant-cookie.png',
      earnedDate: '2025-08-10'
    },
    { 
      id: '2', 
      name: 'Study Master',
      design: 'src/images/ant-gem.png',
      earnedDate: '2025-08-09'
    }
  ];

  const unearnedBadges = [
    {
      id: 'daily_dynamo_3_day',
      name: 'Daily Dynamo',
      design: 'src/images/ant-pie.png',
      description: '3-day study streak'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Achievements 🏆</h1>
        <p className="text-lg text-gray-600">
          You've earned <span className="font-semibold text-blue-600">{achievements.length}</span> out of 3 total badges
        </p>
      </div>

      {/* Earned Badges */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          🌟 Earned Badges
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {achievements.map((badge) => (
            <div key={badge.id} className="bg-white rounded-xl shadow-lg p-6 text-center w-64 flex-shrink-0">
              <div className="text-6xl mb-3">{badge.design}</div>
              <p className="text-lg font-bold text-gray-800">{badge.name}</p>
              <p className="text-sm text-gray-500 mt-2">Earned {badge.earnedDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Unearned Badges */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          📈 Next Badges to Earn
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {unearnedBadges.map((badge) => (
            <div key={badge.id} className="bg-gray-100 rounded-xl shadow-md p-6 text-center w-64 flex-shrink-0">
              <div className="text-6xl mb-3 grayscale opacity-50">{badge.design}</div>
              <p className="text-lg font-bold text-gray-600">{badge.name}</p>
              <p className="text-sm text-gray-500 mt-2">{badge.description}</p>
              <div className="mt-4">
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">2/3 days completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Stats */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Statistics</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="text-center p-4 bg-blue-50 rounded-lg w-40 flex-shrink-0">
            <div className="text-3xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">Goals Completed</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg w-40 flex-shrink-0">
            <div className="text-3xl font-bold text-green-600">3.5h</div>
            <div className="text-sm text-gray-600">Longest Session</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg w-40 flex-shrink-0">
            <div className="text-3xl font-bold text-purple-600">2</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg w-40 flex-shrink-0">
            <div className="text-3xl font-bold text-orange-600">25h</div>
            <div className="text-sm text-gray-600">Total Study Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementsPage;