import React, { useState, useEffect } from 'react';
import AchievementBadge from '../components/AchievementBadge';

function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // This useEffect hook runs when the component first loads
  useEffect(() => {
    // This is where you would fetch the achievements from your backend API
    const fetchAchievements = async () => {
      try {
        // (Cooperation with Niko: Replace with your actual API call)
        // For now, we'll use a simulated API response.
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([
              { _id: '1', badgeType: 'first_goal_complete', earnedDate: '2025-08-10T10:00:00Z' },
              { _id: '2', badgeType: 'five_hours_study', earnedDate: '2025-08-09T14:30:00Z' },
            ]),
          });
        }, 1000));

        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []); // The empty array [] ensures this effect runs only once

  if (isLoading) {
    return <div className="text-center p-8">Loading achievements...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Your Achievements 🏆</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {achievements.length > 0 ? (
          achievements.map((badge) => (
            <AchievementBadge key={badge._id} badge={badge} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">You haven't earned any achievements yet. Keep up the great work!</p>
        )}
      </div>
    </div>
  );
}

export default AchievementsPage;