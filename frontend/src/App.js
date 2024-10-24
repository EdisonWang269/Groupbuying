// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import HomePage from './pages/consumer/views/HomePage';
import ProductDetail from './pages/consumer/views/ProductDetail';
import UserProfile from './pages/consumer/views/UserProfile';
import OrderHistory from './pages/consumer/views/OrderHistory';
import Navigation from './pages/consumer/components/Navigation';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<OrderHistory />} />
      </Routes>
      <Navigation />
    </AppContainer>
  );
};

export default App;