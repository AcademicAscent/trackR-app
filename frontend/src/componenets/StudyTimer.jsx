import React, { useState, useEffect } from 'react';

function StudyTimer() {
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

  return (
    <div>
      <span>{('0' + Math.floor((seconds / 60) % 60)).slice(-2)}:</span>
      <span>{('0' + Math.floor(seconds % 60)).slice(-2)}</span>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
export default StudyTimer;
