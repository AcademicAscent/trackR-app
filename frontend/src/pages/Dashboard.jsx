import React, { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import StudyTimer from '../components/StudyTimer';
import ProgressChart from '../components/ProgressChart';
import AchievementBadgeDisplay from '../components/AchievementBadgeDisplay';

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for testing - replace with real API calls later
  const loadMockData = () => {
    setIsLoading(true);
    
    // Mock goals data
    const mockGoals = [
      {
        _id: '1',
        title: 'Study JavaScript',
        description: 'Practice JavaScript fundamentals daily',
        progress: [
          { date: '2025-08-10T10:00:00Z', completed: true },
          { date: '2025-08-09T10:00:00Z', completed: true }
        ]
      },
      {
        _id: '2',
        title: 'Read Technical Books',
        description: 'Read for 30 minutes each day',
        progress: [
          { date: '2025-08-09T10:00:00Z', completed: true }
        ]
      }
    ];

    // Mock study sessions for chart
    const mockSessions = [
      { date: '2025-08-07', hours: 2.5 },
      { date: '2025-08-08', hours: 1.8 },
      { date: '2025-08-09', hours: 3.2 },
      { date: '2025-08-10', hours: 2.1 },
      { date: '2025-08-11', hours: 1.5 }
    ];

    // Mock achievements
    const mockAchievements = [
      { 
        _id: '1', 
        badgeType: 'first_goal_complete', 
        name: 'First Goal Completed',
        earnedDate: '2025-08-10T10:00:00Z' 
      },
      { 
        _id: '2', 
        badgeType: 'five_hours_study', 
        name: 'Five Hours of Study',
        earnedDate: '2025-08-09T14:30:00Z' 
      }
    ];

    setGoals(mockGoals);
    setStudySessions(mockSessions);
    setAchievements(mockAchievements);
    setIsLoading(false);
  };

  // Function to handle the daily check-in
  const handleDailyCheckin = (goalId) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal._id === goalId) {
          const today = new Date().toISOString();
          return {
            ...goal,
            progress: [...goal.progress, { date: today, completed: true }]
          };
        }
        return goal;
      })
    );
  };

  // Function to handle study session end
  const handleSessionEnd = (sessionData) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    
    setStudySessions(prevSessions => {
      const existingSessionIndex = prevSessions.findIndex(session => session.date === today);
      
      if (existingSessionIndex >= 0) {
        // Update existing session
        const updatedSessions = [...prevSessions];
        updatedSessions[existingSessionIndex].hours += sessionData.hours;
        return updatedSessions;
      } else {
        // Add new session
        return [...prevSessions, { date: today, hours: sessionData.hours }];
      }
    });

    console.log("Study session saved:", sessionData);
  };

  // Load data when component mounts
  useEffect(() => {
    loadMockData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Dashboard</h1>

      {/* Achievements Section */}
      <AchievementBadgeDisplay achievements={achievements} />

      {/* Grid for main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Study Timer Component */}
        <div className="md:col-span-1 lg:col-span-1">
          <StudyTimer onSessionEnd={handleSessionEnd} goals={goals} />
        </div>

        {/* Progress Chart Component */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Progress</h3>
            <ProgressChart data={studySessions} />
          </div>
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