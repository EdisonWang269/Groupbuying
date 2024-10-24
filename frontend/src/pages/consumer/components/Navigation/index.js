// src/components/Navigation/index.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav, NavButton } from './styles';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Nav>
      <NavButton
        isActive={location.pathname === '/'}
        onClick={() => navigate('/')}
      >
        團購首頁
      </NavButton>
      <NavButton
        isActive={location.pathname === '/profile'}
        onClick={() => navigate('/profile')}
      >
        個人資料
      </NavButton>
      <NavButton
        isActive={location.pathname === '/history'}
        onClick={() => navigate('/history')}
      >
        歷史清單
      </NavButton>
    </Nav>
  );
};

export default Navigation;