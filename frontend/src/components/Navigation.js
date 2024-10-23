import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <button
        className={location.pathname === '/' ? 'active' : ''}
        onClick={() => navigate('/')}
      >
        團購首頁
      </button>
      <button
        className={location.pathname === '/profile' ? 'active' : ''}
        onClick={() => navigate('/profile')}
      >
        個人資料
      </button>
      <button
        className={location.pathname === '/history' ? 'active' : ''}
        onClick={() => navigate('/history')}
      >
        歷史清單
      </button>
    </nav>
  );
};

export default Navigation;