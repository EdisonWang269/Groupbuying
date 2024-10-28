// index.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, Upload, Search, ChevronDown, Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import {
  Nav,
  Logo,
  MenuGroup,
  MenuItem,
  SubMenuItem,
  Content,
  MobileMenuButton,
  NavOverlay,
  LogoContainer,
  MobileHeader,
  CloseButton
} from './styles';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(true);
  const [hoveredPath, setHoveredPath] = React.useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const productPhases = [
    { path: '/admin/products/phase1', label: '團購中商品' },
    { path: '/admin/products/phase2', label: '等待到貨商品' },
    { path: '/admin/products/phase3', label: '取貨中商品' },
    { path: '/admin/products/phase4', label: '已完成商品' },
  ];

  // Close mobile nav when route changes
  React.useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  // Close nav when clicking outside on mobile
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsMobileNavOpen(false);
    }
  };

  return (
    <div className="flex relative">
      {/* Mobile Header */}
      <MobileHeader>
        <MobileMenuButton onClick={() => setIsMobileNavOpen(true)} aria-label="開啟選單">
          <Menu size={24} />
        </MobileMenuButton>
        <span>團購管理系統</span>
      </MobileHeader>

      {/* Navigation Overlay for Mobile */}
      {isMobileNavOpen && (
        <NavOverlay onClick={handleOverlayClick}>
          <Nav className={isMobileNavOpen ? 'open' : ''}>
            <LogoContainer>
              <Logo>團購管理系統</Logo>
              <CloseButton
                onClick={() => setIsMobileNavOpen(false)}
                aria-label="關閉選單"
              >
                <X size={20} />
              </CloseButton>
            </LogoContainer>
            
            <MenuGroup>
              <MenuItem 
                onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                isActive={location.pathname.includes('/admin/products')}
                onMouseEnter={() => setHoveredPath('/admin/products')}
                onMouseLeave={() => setHoveredPath(null)}
                isHovered={hoveredPath === '/admin/products'}
              >
                <div>
                  <Package size={30} />
                  <span>商品管理</span>
                </div>
                <ChevronDown 
                  size={26} 
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
                  onMouseEnter={() => setHoveredPath(phase.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  isHovered={hoveredPath === phase.path}
                >
                  {phase.label}
                </SubMenuItem>
              ))}
            </MenuGroup>

            <MenuGroup>
              <MenuItem
                isActive={location.pathname === '/admin/create'}
                onClick={() => navigate('/admin/create')}
                onMouseEnter={() => setHoveredPath('/admin/create')}
                onMouseLeave={() => setHoveredPath(null)}
                isHovered={hoveredPath === '/admin/create'}
              >
                <div>
                  <Upload size={30} />
                  <span>上架商品</span>
                </div>
              </MenuItem>

              <MenuItem
                isActive={location.pathname === '/admin/orders'}
                onClick={() => navigate('/admin/orders')}
                onMouseEnter={() => setHoveredPath('/admin/orders')}
                onMouseLeave={() => setHoveredPath(null)}
                isHovered={hoveredPath === '/admin/orders'}
              >
                <div>
                  <Search size={30} />
                  <span>訂單查詢</span>
                </div>
              </MenuItem>
            </MenuGroup>
          </Nav>
        </NavOverlay>
      )}

      {/* Desktop Navigation */}
      <Nav className="desktop">
        <Logo>團購管理系統</Logo>
        
        <MenuGroup>
          <MenuItem 
            onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
            isActive={location.pathname.includes('/admin/products')}
            onMouseEnter={() => setHoveredPath('/admin/products')}
            onMouseLeave={() => setHoveredPath(null)}
            isHovered={hoveredPath === '/admin/products'}
          >
            <div>
              <Package size={30} />
              <span>商品管理</span>
            </div>
            <ChevronDown 
              size={26} 
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
              onMouseEnter={() => setHoveredPath(phase.path)}
              onMouseLeave={() => setHoveredPath(null)}
              isHovered={hoveredPath === phase.path}
            >
              {phase.label}
            </SubMenuItem>
          ))}
        </MenuGroup>

        <MenuGroup>
          <MenuItem
            isActive={location.pathname === '/admin/create'}
            onClick={() => navigate('/admin/create')}
            onMouseEnter={() => setHoveredPath('/admin/create')}
            onMouseLeave={() => setHoveredPath(null)}
            isHovered={hoveredPath === '/admin/create'}
          >
            <div>
              <Upload size={30} />
              <span>上架商品</span>
            </div>
          </MenuItem>

          <MenuItem
            isActive={location.pathname === '/admin/orders'}
            onClick={() => navigate('/admin/orders')}
            onMouseEnter={() => setHoveredPath('/admin/orders')}
            onMouseLeave={() => setHoveredPath(null)}
            isHovered={hoveredPath === '/admin/orders'}
          >
            <div>
              <Search size={30} />
              <span>訂單查詢</span>
            </div>
          </MenuItem>
        </MenuGroup>
      </Nav>

      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default AdminLayout;