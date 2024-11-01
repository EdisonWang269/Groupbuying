import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import ConsumerRoutes from './ConsumerRoutes';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 消費者路由 */}
      <Route path="/*" element={<ConsumerRoutes />} />
      
      {/* 管理者路由 */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requireAdmin>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;