import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../layouts/consumer/Navigation';

// 消費者頁面
import HomePage from '../pages/consumer/HomePage';
import ProductDetail from '../pages/consumer/ProductDetail';
import OrderHistory from '../pages/consumer/OrderHistory';
import UserProfile from '../pages/consumer/UserProfile';

const ConsumerRoutes = () => {
  return (
    <>
      {/* Navigation 在所有消費者頁面都會顯示 */}
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default ConsumerRoutes;