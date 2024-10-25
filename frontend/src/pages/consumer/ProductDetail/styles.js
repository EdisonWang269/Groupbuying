// src/pages/ProductDetail/styles.js
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
  background: #f0f7f5;
  padding-bottom: 60px;
  position: relative;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #6CB7AA;
  padding: ${props => props.theme.spacing.md} 0;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${props => props.theme.transition.default};

  &:hover {
    transform: translateX(-2px);
  }
`;

export const HeaderTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: white;
  margin: 0 auto;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, #f0f7f5, transparent);
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Content = styled.div`
  margin: -${props => props.theme.spacing.xl} ${props => props.theme.spacing.md} 0;
  position: relative;
  z-index: 2;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    margin: -${props => props.theme.spacing.xl} auto 0;
    max-width: 600px;
  }
`;

export const ProductInfo = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
`;

export const ProductTitle = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const Price = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  margin: ${props => props.theme.spacing.md} 0;
`;

export const StatementDate = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin: ${props => props.theme.spacing.md} 0;
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const Description = styled.div`
  margin: ${props => props.theme.spacing.lg} 0;
`;

export const DescriptionTitle = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const DescriptionText = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  white-space: pre-line;
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.xl} 0;

  button {
    width: 40px;
    height: 40px;
    border: 2px solid #6CB7AA;
    border-radius: ${props => props.theme.borderRadius.full};
    background: white;
    color: #6CB7AA;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ${props => props.theme.transition.default};

    &:hover:not(:disabled) {
      background: #6CB7AA;
      color: white;
    }

    &:disabled {
      border-color: ${props => props.theme.colors.border};
      color: ${props => props.theme.colors.border};
      cursor: not-allowed;
    }
  }

  span {
    min-width: 40px;
    text-align: center;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text};
    user-select: none;
  }
`;

export const OrderButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: #6CB7AA;
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    background: #5BA99C;
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;