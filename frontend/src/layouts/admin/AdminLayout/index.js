import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from './styles';

const AdminLayout = () => {
  return (
    <Container>
      {/* 這裡可以加入管理者頁面的共用元素，如頁首、側邊欄等 */}
      <Outlet />
    </Container>
  );
};

export default AdminLayout;