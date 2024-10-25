import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const Sidebar = styled.div`
  width: 240px;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 10;
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const SidebarTitle = styled.h1`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  background-color: ${props => 
    props.active ? `${props.theme.colors.primary}10` : 'transparent'};

  &:hover {
    background-color: ${props => 
      props.active ? `${props.theme.colors.primary}10` : props.theme.colors.backgroundLight};
  }

  svg {
    transition: color ${props => props.theme.transition.default};
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  }
`;

export const MainContent = styled.div`
  margin-left: 240px;
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  min-height: 100vh;
`;

export const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const HeaderTitle = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  font-weight: ${props => props.theme.typography.h1.fontWeight};
  color: ${props => props.theme.colors.text};
`;

// // RWD 支援
// const breakpoints = {
//   tablet: '768px',
// };

// @media (max-width: ${breakpoints.tablet}) {
//   ${Sidebar} {
//     transform: translateX(-100%);
//     transition: transform 0.3s ease;

//     &.open {
//       transform: translateX(0);
//     }
//   }

//   ${MainContent} {
//     margin-left: 0;
//   }
// }