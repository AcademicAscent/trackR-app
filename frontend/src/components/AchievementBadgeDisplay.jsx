// frontend/src/components/AchievementBadgeDisplay.jsx

import React from 'react';
import AchievementBadge from './AchievementBadge';

function AchievementBadgeDisplay({ achievements }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 m-4 text-gray-800">
      <h3 className="text-2xl font-semibold mb-4">Your Badges</h3>
      <div className="flex flex-wrap gap-4">
        {achievements.length > 0 ? (
          achievements.map((badge) => (
            <AchievementBadge key={badge._id} badge={badge} />
          ))
        ) : (
          <p className="text-gray-500">You haven't earned any badges yet.</p>
        )}
      </div>
    </div>
  );
}

export default AchievementBadgeDisplay;