import styled from '@emotion/styled';

export const Nav = styled.div`
  width: 250px;
  min-height: 100vh;
  background: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} 0;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
`;

export const Logo = styled.div`
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const MenuGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
    color: ${props => props.theme.colors.primary};
  }

  > div {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const SubMenuItem = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  padding-left: 60px;
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.textLight};
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  font-size: ${props => props.theme.typography.small.fontSize};

  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
    color: ${props => props.theme.colors.primary};
  }
`;

export const Content = styled.main`
  margin-left: 250px;
  padding: ${props => props.theme.spacing.lg};
  min-height: 100vh;
  background: ${props => props.theme.colors.backgroundLight};
  flex: 1;
`;