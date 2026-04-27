import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCodes } from '../../context/CodesContext';
import { CODE_LENGTH } from '../../config/codeSymbols';
import CodeInput from '../CodeInput/CodeInput';
import './CodeTester.css';
import correctSoundFile from '../../assets/sounds/Correct.mp3';
import falseSoundFile from '../../assets/sounds/False.mp3';

interface CodeTesterProps {
  testIdPrefix?: string;
}

const CodeTester: React.FC<CodeTesterProps> = ({ testIdPrefix = 'tester' }) => {
  const [code, setCode] = useState<string[]>([]);
  const { codes, foundCodes, markAsFound } = useCodes();

  const handleTest = () => {
    if (code.length !== CODE_LENGTH) return;
    
    const codeString = code.join('');
    const ufIndex = codes.findIndex((c, i) => c === codeString && !foundCodes[i]);

    if (ufIndex !== -1) {
      markAsFound(ufIndex);
      toast.success('Code valide !', {
        onOpen: () => new Audio(correctSoundFile).play().catch(() => {})
      });
    } else if (codes.includes(codeString)) {
      toast.info('Ce code a déjà été trouvé !');
    } else {
      toast.error('Code incorrect ! -1 min ⏱️', {
        onOpen: () => new Audio(falseSoundFile).play().catch(() => {})
      });
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
