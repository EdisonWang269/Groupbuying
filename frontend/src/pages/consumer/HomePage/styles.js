import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const moveCircle = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f0f7f5;
  position: relative;
  overflow-x: hidden;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: #6CB7AA;
  padding-bottom: 20px; /* 減少下方間距 */
  margin-bottom: 20px;
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
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-align: center;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  animation: ${float} 3s ease-in-out infinite;
  user-select: none;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TitleHighlight = styled.span`
  margin-left: 4px;
  color: white;
  user-select: none;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: none;
  border-radius: 999px;
  font-size: 0.95rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #88C5BA;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 24px 16px;
  }
`;