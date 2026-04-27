import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CodePopup from '../Code/CodePopup';
import './Layout.css';

const Layout = () => {
  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);

  const handleOpenCodePopup = () => {
    setIsCodePopupOpen(true);
  };

  const handleCloseCodePopup = () => {
    setIsCodePopupOpen(false);
  };

  return (
    <div>
          <div className="layout-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <button onClick={handleOpenCodePopup} className="button">
          Définir le code
        </button>
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <Link to="/" className="button" data-testid="demo-back-link-game">RETOUR AU MENU</Link>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
      {isCodePopupOpen && <CodePopup onClose={handleCloseCodePopup} />}
    </div>
  );
};

export default Layout;
