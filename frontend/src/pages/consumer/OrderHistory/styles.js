import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const moveCircle = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f0f7f5;
  padding-bottom: 60px;
`;

export const Header = styled.header`
  position: relative;
  background: #6CB7AA;
  padding: ${props => props.theme.spacing.lg} 0;
  margin-bottom: ${props => props.theme.spacing.xl};
  overflow: hidden;
  min-height: 180px;
  display: flex;
  flex-direction: column;
`;

export const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  .circle-1 {
    width: 100px;
    height: 100px;
    top: -20px;
    right: 10%;
    animation: ${moveCircle} 7s ease-in-out infinite;
  }

  .circle-2 {
    width: 60px;
    height: 60px;
    top: 40px;
    right: 20%;
    animation: ${moveCircle} 5s ease-in-out infinite reverse;
  }

  .circle-3 {
    width: 40px;
    height: 40px;
    top: 60px;
    right: 25%;
    animation: ${moveCircle} 6s ease-in-out infinite;
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg} 
          ${props => props.theme.spacing.lg};
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  color: white;
  font-size: 1.75rem;
  margin: 0;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  margin-top: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const TabButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  min-width: 100px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.85)'};
  color: #6CB7AA;
  font-size: ${props => props.theme.typography.body.fontSize};
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  box-shadow: ${props => props.isActive ? props.theme.shadows.md : props.theme.shadows.sm};
  opacity: ${props => props.isActive ? 1 : 0.85};
  user-select: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.small.fontSize};
    min-width: 80px;
  }
`;

export const OrdersList = styled.div`
  max-width: 800px;
  margin: ${props => props.theme.spacing.lg} auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.md} auto;
  }
`;

export const OrderCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform ${props => props.theme.transition.default},
              box-shadow ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
  }
`;

export const OrderImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
  }
`;

export const OrderDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.typography.body.fontSize};
    color: ${props => props.theme.colors.text};
    font-weight: 400;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    user-select: none;
  }

  p {
    margin: ${props => props.theme.spacing.xs} 0;
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.typography.small.fontSize};
    user-select: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    h3 {
      font-size: ${props => props.theme.typography.small.fontSize};
    }
  }
`;

export const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin-top: ${props => props.theme.spacing.sm};
  font-weight: 500;
  user-select: none;
  
  ${props => {
    switch (props.status) {
      case '待領取':
        return `
          background-color: #FFF3E0;
          color: #FB8C00;
        `;
      case '已領取':
        return `
          background-color: #E8F5E9;
          color: #43A047;
        `;
      case '已結單':
        return `
          background-color: #ECEFF1;
          color: #607D8B;
        `;
      default:
        return `
          background-color: #ECEFF1;
          color: #607D8B;
        `;
    }
  }}
`;

export const NoOrders = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.textLight};
  box-shadow: ${props => props.theme.shadows.sm};
  animation: ${fadeIn} 0.3s ease-out;
  user-select: none;

  p {
    margin: 0;
    font-size: ${props => props.theme.typography.body.fontSize};
  }
`;