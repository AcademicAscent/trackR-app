import React from 'react';

function QuickActionButtons({ onStartStreak, onStart5Hour, currentStreak, longestStreak }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Challenges</h3>
      
      {/* Streak Stats */}
      <div className="flex justify-between items-center mb-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{longestStreak}</div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onStartStreak}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          🔥 Start 3-Day Streak Challenge
        </button>
        
        <button
          onClick={onStart5Hour}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          💎 Begin 5-Hour Study Session
        </button>
      </div>
    </div>
  );
}

export default QuickActionButtons;