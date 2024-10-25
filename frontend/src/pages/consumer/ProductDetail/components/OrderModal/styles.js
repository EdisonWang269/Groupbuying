// src/components/OrderModal/styles.js
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

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
  padding: ${props => props.theme.spacing.md};
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 360px;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
`;

export const Content = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  z-index: 1;
  transition: all ${props => props.theme.transition.default};
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
    transform: scale(1.1);
  }
`;

export const Title = styled.h3`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

export const OrderDetails = styled.div`
  background: #f8f9fa;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};

  &:last-of-type {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  font-weight: bold;
  color: #6CB7AA;
  font-size: 1.2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

export const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.body.fontSize};
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};

  ${props => props.primary ? `
    background: #6CB7AA;
    color: white;
    box-shadow: ${props.theme.shadows.sm};

    &:hover {
      background: #5BA99C;
      transform: translateY(-1px);
      box-shadow: ${props.theme.shadows.md};
    }
  ` : `
    background: ${props.theme.colors.backgroundLight};
    color: ${props.theme.colors.text};

    &:hover {
      background: ${props.theme.colors.border};
    }
  `}
`;