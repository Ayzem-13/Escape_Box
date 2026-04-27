import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import CodePopup from '../Code/CodePopup';
import './Layout.css';

const Layout = () => {
  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);
  const t = useTheme();

  const handleOpenCodePopup = () => {
    setIsCodePopupOpen(true);
  };

  const handleCloseCodePopup = () => {
    setIsCodePopupOpen(false);
  };

  return (
    <div style={{ backgroundColor: t.color.bg, color: t.color.text, minHeight: '100vh' }}>
      <div className="layout-header" style={{ top: t.spacing.sm, right: t.spacing.sm }}>
        <button onClick={handleOpenCodePopup} className="button">
          Définir le code
        </button>
      </div>
      <main>
        <Outlet />
      </main>
      {isCodePopupOpen && <CodePopup onClose={handleCloseCodePopup} />}
    </div>
  );
};

export default Layout;
