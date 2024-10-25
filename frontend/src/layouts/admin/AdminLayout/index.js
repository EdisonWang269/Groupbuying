import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, Upload, Search, ChevronDown } from 'lucide-react';
import {
  Nav,
  Logo,
  MenuItem,
  SubMenuItem,
  MenuGroup,
  Content
} from './styles';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(true);

  const productPhases = [
    { path: '/admin/products/phase1', label: '團購中商品' },
    { path: '/admin/products/phase2', label: '等待到貨商品' },
    { path: '/admin/products/phase3', label: '取貨中商品' },
    { path: '/admin/products/phase4', label: '已完成商品' },
  ];

  return (
    <div className="flex">
      <Nav>
        <Logo>團購管理系統</Logo>
        
        <MenuGroup>
          <MenuItem 
            onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
            isActive={location.pathname.includes('/admin/products')}
          >
            <div className="flex items-center gap-2">
              <Package size={20} />
              <span>商品管理</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transform transition-transform ${
                isProductMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </MenuItem>
          
          {isProductMenuOpen && productPhases.map(phase => (
            <SubMenuItem
              key={phase.path}
              isActive={location.pathname === phase.path}
              onClick={() => navigate(phase.path)}
            >
              {phase.label}
            </SubMenuItem>
          ))}
        </MenuGroup>

        <MenuItem
          isActive={location.pathname === '/admin/create'}
          onClick={() => navigate('/admin/create')}
        >
          <Upload size={20} />
          <span>上架商品</span>
        </MenuItem>

        <MenuItem
          isActive={location.pathname === '/admin/orders'}
          onClick={() => navigate('/admin/orders')}
        >
          <Search size={20} />
          <span>訂單查詢</span>
        </MenuItem>
      </Nav>

      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default AdminLayout;