import React, { useState, useEffect } from 'react';

function StudyTimer({ onSessionEnd, goals }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleStop = () => {
    if (seconds > 0 && onSessionEnd) {
      // Convert seconds to hours and call the session end handler
      const hours = seconds / 3600;
      onSessionEnd({
        duration: seconds,
        hours: hours,
        date: new Date().toISOString()
      });
    }
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Timer</h3>
      <div className="text-center">
        <div className="text-4xl font-mono font-bold text-blue-600 mb-4">
          {formatTime(seconds)}
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-2 rounded-lg font-medium ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium"
          >
            Reset
          </button>
          {seconds > 0 && (
            <button
              onClick={handleStop}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            >
              Save Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyTimer;