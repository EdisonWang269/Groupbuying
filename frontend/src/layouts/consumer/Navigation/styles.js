// src/components/Navigation/styles.js
import styled from '@emotion/styled';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-around;
  padding: ${props => props.theme.spacing.sm};
  border-top: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};
  flex: 1;
  text-align: center;
  transition: color ${props => props.theme.transition.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;