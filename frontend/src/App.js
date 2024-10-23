import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/history" element={<OrderHistory />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;