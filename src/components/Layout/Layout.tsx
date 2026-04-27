import { useState } from 'react';
import { Outlet } from 'react-router-dom';
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
      <div className="layout-header">
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
