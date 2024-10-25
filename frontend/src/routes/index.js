import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // 移除 BrowserRouter
import ConsumerRoutes from './ConsumerRoutes';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  // 這裡應該加入登入狀態和角色的判斷
  const isAuthenticated = true; // 暫時寫死，實際應該從 auth context 獲取
  const userRole = 'admin'; // 暫時寫死，實際應該從 auth context 獲取

  return (
    <Routes>
      {/* 消費者路由 */}
      <Route path="/*" element={<ConsumerRoutes />} />
      
      {/* 管理者路由，需要驗證和角色檢查 */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated && userRole === 'admin' ? (
            <AdminRoutes />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;