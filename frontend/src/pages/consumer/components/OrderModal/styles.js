// src/components/OrderModal/styles.js
import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Content = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  width: 90%;
  max-width: 400px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 95%;
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Title = styled.h3`
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.text};
`;

export const OrderDetails = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const PhoneInput = styled.div`
  margin-top: ${props => props.theme.spacing.md};

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.typography.body.fontSize};
    outline: none;

    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

export const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  background: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.text};
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};

  &:hover {
    background: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.backgroundLight};
  }
`;