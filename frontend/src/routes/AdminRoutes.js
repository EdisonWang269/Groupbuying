import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/admin/AdminLayout';

// 管理者頁面
import ProductPhaseOne from '../pages/admin/ProductManagement/components/PhaseOne';
import ProductPhaseTwo from '../pages/admin/ProductManagement/components/PhaseTwo';
import ProductPhaseThree from '../pages/admin/ProductManagement/components/PhaseThree';
import ProductPhaseFour from '../pages/admin/ProductManagement/components/PhaseFour';
import CreateProduct from '../pages/admin/CreateProduct';
import OrderSearch from '../pages/admin/OrderSearch';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* 商品管理路由 */}
        <Route path="products/phase1" element={<ProductPhaseOne />} />
        <Route path="products/phase2" element={<ProductPhaseTwo />} />
        <Route path="products/phase3" element={<ProductPhaseThree />} />
        <Route path="products/phase4" element={<ProductPhaseFour />} />
        
        {/* 上架商品路由 */}
        <Route path="create" element={<CreateProduct />} />
        
        {/* 訂單查詢路由 */}
        <Route path="orders" element={<OrderSearch />} />

        {/* 預設路由 */}
        <Route index element={<ProductPhaseOne />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;