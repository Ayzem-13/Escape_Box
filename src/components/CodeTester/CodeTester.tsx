import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCodes } from '../../context/CodesContext';
import { useGame } from '../../context/GameContext';
import { CODE_LENGTH } from '../../config/codeSymbols';
import CodeInput from '../CodeInput/CodeInput';
import './CodeTester.css';
import correctSoundFile from '../../assets/sounds/Correct.mp3';
import falseSoundFile from '../../assets/sounds/False.mp3';

interface CodeTesterProps {
  testIdPrefix?: string;
}

const playSound = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  audio.currentTime = 0;
  const result = audio.play();
  if (result && typeof result.catch === 'function') {
    result.catch(() => {});
  }
};

const CodeTester: React.FC<CodeTesterProps> = ({ testIdPrefix = 'tester' }) => {
  const [code, setCode] = useState<string[]>([]);
  const { codes, foundCodes, markAsFound } = useCodes();
  const { setGameResult } = useGame();
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const falseAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctAudioRef.current = new Audio(correctSoundFile);
    falseAudioRef.current = new Audio(falseSoundFile);
    correctAudioRef.current.preload = 'auto';
    falseAudioRef.current.preload = 'auto';
    return () => {
      correctAudioRef.current?.pause();
      falseAudioRef.current?.pause();
      correctAudioRef.current = null;
      falseAudioRef.current = null;
    };
  }, []);

  const handleTest = () => {
    if (code.length !== CODE_LENGTH) return;

    const codeString = code.join('');
    const ufIndex = codes.findIndex((c, i) => c === codeString && !foundCodes[i]);

    if (ufIndex !== -1) {
      const isFinalCode = foundCodes.filter(Boolean).length + 1 === codes.length;
      markAsFound(ufIndex);
      playSound(correctAudioRef.current);
      toast.success('Code valide !');

      if (isFinalCode) {
        setGameResult('won');
      }
    } else if (codes.includes(codeString)) {
      toast.info('Ce code a déjà été trouvé !');
    } else {
      playSound(falseAudioRef.current);
      toast.error('Code incorrect ! -1 min ⏱️');
      window.dispatchEvent(new CustomEvent('chrono-penalty'));
    }

    setCode([]);
  };

  return (
    <div className="code-tester" data-testid={`${testIdPrefix}-code-tester`}>
      <h3 className="code-tester-title" style={{ color: 'white' }}>Testez un code :</h3>
      <CodeInput code={code} onChange={setCode} testIdPrefix={`${testIdPrefix}-input`} />
      <div className="code-tester-actions">
        <button
          onClick={() => setCode([])}
          disabled={code.length === 0}
          data-testid={`${testIdPrefix}-clear-btn`}
          className="button button--ghost"
        >
          Effacer
        </button>
        <button
          onClick={handleTest}
          disabled={code.length !== CODE_LENGTH}
          data-testid={`${testIdPrefix}-test-btn`}
          className="button button--primary"
        >
          Valider le code
        </button>
      </div>
    </div>
  );
};

export default CodeTester;
