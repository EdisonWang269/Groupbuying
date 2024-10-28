// styles.js
import styled from '@emotion/styled';

const theme = {
  colors: {
    primary: '#00A67E',        
    hover: '#008F6C',          
    activeText: '#00875B',     
    background: '#FFFFFF',     
    text: '#2D3748',          
    subText: '#4A5568',       
    divider: '#E2E8F0',       
    activeBackground: '#F0FDF9',
    hoverBackground: '#E6FAF5',
    buttonHover: 'rgba(0, 166, 126, 0.1)'
  },
  shadows: {
    nav: '0 2px 8px rgba(0, 0, 0, 0.05)',
    hover: '0 4px 12px rgba(0, 166, 126, 0.1)',
    button: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  breakpoints: {
    mobile: '768px'
  }
};

export const NavOverlay = styled.div`
  @media (max-width: ${theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
    display: flex;
  }
`;

export const Nav = styled.div`
  width: 300px;
  min-height: 100vh;
  background: ${theme.colors.background};
  border-right: 1px solid ${theme.colors.divider};
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  box-shadow: ${theme.shadows.nav};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  z-index: 50;

  @media (max-width: ${theme.breakpoints.mobile}) {
    &.desktop {
      display: none;
    }
    
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    
    &.open {
      transform: translateX(0);
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 0;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.divider};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 8px 0 0;
  }
`;

export const Logo = styled.div`
  padding: 28px 24px;
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.primary};
  letter-spacing: 0.5px;
  background: ${theme.colors.background};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 20px 24px;
    font-size: 24px;
  }
`;

export const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: ${theme.colors.background};
    border-bottom: 1px solid ${theme.colors.divider};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    height: 64px;
    
    span {
      margin-left: 16px;
      font-size: 20px;
      font-weight: 600;
      color: ${theme.colors.primary};
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 10px;
  color: ${theme.colors.primary};
  background: ${theme.colors.background};
  border: 1.5px solid ${theme.colors.divider};
  transition: all 0.2s ease-in-out;
  box-shadow: ${theme.shadows.button};
  
  &:hover {
    background: ${theme.colors.buttonHover};
    border-color: ${theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.hover};
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const CloseButton = styled(MobileMenuButton)`
  position: relative;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  box-shadow: none;
  color: ${theme.colors.subText};

  &:hover {
    background: ${theme.colors.hoverBackground};
    color: ${theme.colors.primary};
    box-shadow: none;
    transform: none;
  }

  &:active {
    background: ${theme.colors.activeBackground};
    transform: scale(0.95);
  }
`;

export const MenuGroup = styled.div`
  margin-bottom: 20px;
  padding: 0 12px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  margin-bottom: 6px;
  color: ${props => 
    props.isActive 
      ? theme.colors.activeText 
      : props.isHovered 
        ? theme.colors.primary 
        : theme.colors.text};
  background: ${props => 
    props.isActive 
      ? theme.colors.activeBackground 
      : props.isHovered 
        ? theme.colors.hoverBackground 
        : 'transparent'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  border-radius: 14px;
  font-size: 18px;

  @media (min-width: ${theme.breakpoints.mobile}) {
    transform: translateX(${props => props.isHovered ? '6px' : '0'});
    box-shadow: ${props => props.isHovered ? theme.shadows.hover : 'none'};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  svg {
    width: 26px;
    height: 26px;
    color: ${props => 
      props.isActive || props.isHovered 
        ? theme.colors.primary 
        : theme.colors.subText};
    transition: all 0.3s ease;
    transform: scale(${props => props.isHovered ? '1.1' : '1'});
  }

  &:active {
    transform: translateX(6px) scale(0.98);
  }
`;

export const SubMenuItem = styled.div`
  padding: 14px 20px 14px 58px;
  margin: 4px 0;
  color: ${props => 
    props.isActive 
      ? theme.colors.primary 
      : props.isHovered 
        ? theme.colors.primary 
        : theme.colors.subText};
  background: ${props => 
    props.isActive 
      ? theme.colors.activeBackground 
      : props.isHovered 
        ? theme.colors.hoverBackground 
        : 'transparent'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
  font-weight: 500;
  border-radius: 14px;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    transform: translateX(${props => props.isHovered ? '6px' : '0'});
    box-shadow: ${props => props.isHovered ? theme.shadows.hover : 'none'};
  }

  &:active {
    transform: translateX(6px) scale(0.98);
  }
`;

export const Content = styled.main`
  margin-left: 300px;
  padding: 28px;
  min-height: 100vh;
  background: #F9FAFB;
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: 0;
    padding-top: 80px;
  }
`;