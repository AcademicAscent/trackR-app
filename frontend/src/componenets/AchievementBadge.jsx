import React from 'react';

function AchievementBadge({ badge }) {
  return (
    <div className="p-4 text-center">
      <img src={`/badges/${badge.id}.png`} alt={badge.name} />
      <p className="mt-2 text-sm">{badge.name}</p>
    </div>
  );
}
export default AchievementBadge;
