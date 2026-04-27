import React, { useState, useEffect } from 'react';

interface TimerProps {
  minutes: number;
  onTimerEnd?: () => void;
}

const Timer: React.FC<TimerProps> = ({ minutes, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimerEnd) {
        onTimerEnd();
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimerEnd]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>TEMPS RESTANT</h1>
      <div style={{ fontSize: '48px', margin: '20px' }}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;