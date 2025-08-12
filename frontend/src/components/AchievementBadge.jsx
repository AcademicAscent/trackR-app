import React from 'react';

function AchievementBadge({ badge }) {
  // Handle both badge.id and badge.badgeType for flexibility
  const badgeId = badge.id || badge.badgeType || 'default';
  const badgeName = badge.name || badge.badgeType || 'Achievement';
  
  return (
    <div className="p-4 text-center bg-yellow-50 rounded-lg border-2 border-yellow-200">
      {/* Using emoji as fallback since badge images might not exist */}
      <div className="text-4xl mb-2">🏆</div>
      <p className="text-sm font-medium text-gray-700">{badgeName}</p>
      {badge.earnedDate && (
        <p className="text-xs text-gray-500 mt-1">
          {new Date(badge.earnedDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default AchievementBadge;