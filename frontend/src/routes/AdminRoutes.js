import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/admin/AdminLayout';
import ProductManagement from '../pages/admin/ProductManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* 管理者首頁直接導向商品管理 */}
        <Route index element={<Navigate to="products" replace />} />
        
        {/* 商品管理頁面 */}
        <Route path="products" element={<ProductManagement />} />
        
        {/* 可以在這裡添加更多管理者頁面路由 */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;