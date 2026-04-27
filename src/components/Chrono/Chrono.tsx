import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import './Chrono.css';

interface ChronoProps {
  initialTime: number; // in seconds
}

const Chrono: React.FC<ChronoProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const t = useTheme();

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
    <div
      className="chrono-container"
      data-testid="chrono"
      style={{
        backgroundColor: t.color.bgInverse,
        color: t.color.textInverse,
        borderColor: t.color.primary,
        boxShadow: t.shadow.md,
        borderRadius: t.radius.lg,
      }}
    >
      <div
        className="chrono-display"
        data-testid="chrono-display"
        style={{ color: t.color.primary, fontFamily: t.font.mono }}
      >
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Chrono;
