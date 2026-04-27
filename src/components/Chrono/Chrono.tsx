import React, { useState, useEffect } from 'react';
import './Chrono.css';

interface ChronoProps {
  initialTime: number; // in seconds
}

const Chrono: React.FC<ChronoProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="chrono-container" data-testid="chrono">
      <div className="chrono-display" data-testid="chrono-display">{formatTime(time)}</div>
    </div>  
  );
};

export default Chrono;
