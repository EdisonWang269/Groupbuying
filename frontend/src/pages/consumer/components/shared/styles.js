// src/components/shared/styles.js
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// 共享動畫
export const moveCircle = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 基礎容器
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f0f7f5;
  padding-bottom: 60px;
  position: relative;
`;

// 通用頁面頭部
export const PageHeader = styled.header`
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  top: ${props => props.sticky ? 0 : 'auto'};
  z-index: ${props => props.sticky ? 100 : 1};
  background: #6CB7AA;
  padding: ${props => props.theme.spacing.md} 0;
  margin-bottom: ${props => props.theme.spacing.xl};
  overflow: hidden;
  min-height: ${props => props.minHeight || 'auto'};
`;

// 頭部背景動畫
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
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || props.theme.spacing.md};
`;

export const PageTitle = styled.h1`
  color: white;
  font-size: ${props => props.size || props.theme.typography.h1.fontSize};
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: ${props => props.align || 'left'};
  user-select: none;
`;

// 通用卡片樣式
export const Card = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.shadow || props.theme.shadows.sm};
  transition: all ${props => props.theme.transition.default};

  &:hover {
    transform: ${props => props.hover ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.hover ? props.theme.shadows.md : props.shadow || props.theme.shadows.sm};
  }
`;

// 通用按鈕樣式
export const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.wide ? props.theme.spacing.xl : props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.size || props.theme.typography.body.fontSize};
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transition.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  ${props => {
    if (props.primary) {
      return `
        background: #6CB7AA;
        color: white;
        box-shadow: ${props.theme.shadows.sm};

        &:hover {
          background: #5BA99C;
          transform: translateY(-1px);
          box-shadow: ${props.theme.shadows.md};
        }
      `;
    } else if (props.outline) {
      return `
        background: transparent;
        border: 2px solid #6CB7AA;
        color: #6CB7AA;

        &:hover {
          background: rgba(108, 183, 170, 0.1);
        }
      `;
    } else {
      return `
        background: ${props.theme.colors.backgroundLight};
        color: ${props.theme.colors.text};

        &:hover {
          background: ${props.theme.colors.border};
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

// 彈出層樣式
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

// 通用網格布局
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '280px'}, 1fr));
  gap: ${props => props.gap || props.theme.spacing.md};
  padding: ${props => props.padding || 0};
  max-width: ${props => props.maxWidth || '1200px'};
  margin: ${props => props.margin || '0 auto'};
  animation: ${fadeIn} 0.3s ease-out;
`;