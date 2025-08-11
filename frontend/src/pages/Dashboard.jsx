import React, { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import StudyTimer from '../components/StudyTimer';
import ProgressChart from '../components/ProgressChart';
import AchievementBadge from '../components/AchievementBadge'; // Assuming you have an AchievementsPage too
import AchievementBadgeDisplay from '../components/AchievementBadgeDisplay'; // A wrapper for multiple badges

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch goals from your backend API
  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      // (Cooperation with Niko: Replace with your actual API call)
      const response = await fetch('/api/goals'); 
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      setGoals([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the daily check-in
  const handleDailyCheckin = async (goalId) => {
    try {
      const response = await fetch(`/api/goals/${goalId}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: new Date().toISOString() })
      });

      if (response.ok) {
        // After a successful check-in, refresh the goals list to update the UI
        fetchGoals();
      } else {
        console.error('Failed to log daily check-in');
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  // Function to handle the study session end
  const handleSessionEnd = async (sessionData) => {
    try {
      // (Cooperation with Niko: This is where you call the API to save the session)
      const response = await fetch('/api/study-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });
      if (response.ok) {
        console.log("Study session saved successfully!");
      } else {
        console.error("Failed to save study session.");
      }
    } catch (error) {
      console.error("API error while saving session:", error);
    }
  };

  // Fetch goals when the component first loads
  useEffect(() => {
    fetchGoals();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Dashboard</h1>

      {/* Grid for main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Study Timer Component */}
        <div className="md:col-span-1 lg:col-span-1">
          <StudyTimer onSessionEnd={handleSessionEnd} goals={goals} />
        </div>

        {/* Progress Chart Component */}
        <div className="md:col-span-1 lg:col-span-2">
          <ProgressChart goals={goals} />
        </div>
      </div>
      
      {/* Goals Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Active Goals</h2>
      <div className="space-y-4">
        {goals.length > 0 ? (
          goals.map(goal => (
            <GoalCard 
              key={goal._id} 
              goal={goal} 
              onDailyCheckin={handleDailyCheckin} 
            />
          ))
        ) : (
          <p className="text-gray-500">You have no goals set up yet. Time to create one!</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;