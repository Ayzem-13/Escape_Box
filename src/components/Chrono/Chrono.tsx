import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useGame } from '../../context/GameContext';
import bipSound from '../../assets/sounds/bip.mp3';
import './Chrono.css';

interface ChronoProps {
  initialTime: number; // in seconds
}

const Chrono: React.FC<ChronoProps> = ({ initialTime }) => {
  const { session } = useGame();
  const [time, setTime] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const warningInterval = 900; // 15 minutes in seconds

  useEffect(() => {
    setTime(initialTime);
  }, [session, initialTime]);

  useEffect(() => {
    audioRef.current = new Audio(bipSound);
    audioRef.current.preload = 'auto';
  }, []);

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      if (time % warningInterval === 0 && audioRef.current) {
        audioRef.current.currentTime = 0;
        const playResult = audioRef.current.play();
        if (playResult && typeof playResult.catch === 'function') {
          playResult.catch(() => {});
        }
        setIsWarning(true);
        setTimeout(() => setIsWarning(false), 3000); // Flash for 3 seconds
      }

      return () => clearTimeout(timerId);
    }
  }, [time, initialTime]);

  useEffect(() => {
    const handlePenalty = () => {
      setTime(prevTime => Math.max(0, prevTime - 60));
    };
    
    window.addEventListener('chrono-penalty', handlePenalty as EventListener);
    return () => {
      window.removeEventListener('chrono-penalty', handlePenalty as EventListener);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`chrono-container ${isWarning ? 'warning' : ''}`}
      data-testid="chrono"
    >
      <div className="chrono-display" data-testid="chrono-display">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Chrono;
