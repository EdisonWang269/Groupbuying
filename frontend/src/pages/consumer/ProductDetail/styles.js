// src/pages/ProductDetail/styles.js
import styled from '@emotion/styled';
import { 
  PageContainer, 
  PageHeader, 
  HeaderBackground, 
  HeaderContent,
  Button,
  Card
} from '../components/shared/styles';

// 基礎容器
export const Container = styled(PageContainer)``;

// 頭部區域
export const Header = styled(PageHeader)`
  padding: ${props => props.theme.spacing.md} 0;
`;

// 修改頭部內容布局
export const StyledHeaderContent = styled(HeaderContent)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  padding: 0 ${props => props.theme.spacing.md};
  max-width: 800px;
`;

export const BackButton = styled(Button)`
  background: none;
  padding: ${props => props.theme.spacing.xs};
  grid-column: 1;
  
  &:hover {
    background: none;
    transform: translateX(-2px);
  }
`;

export const HeaderTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: white;
  margin: 0;
  text-align: center;
  grid-column: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

// 主要內容區
export const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  animation: ${props => props.theme.animations?.fadeIn || 'none'} 0.5s ease-out;
`;

// 圖片區域
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

// 內容區域
export const Content = styled.div`
  margin: -${props => props.theme.spacing.xl} ${props => props.theme.spacing.md} 0;
  position: relative;
  z-index: 2;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    margin: -${props => props.theme.spacing.xl} auto 0;
    max-width: 600px;
  }
`;

export const ProductInfo = styled(Card)`
  padding: ${props => props.theme.spacing.xl};
`;

export const ProductTitle = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 600;
  line-height: 1.4;
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

// 商品描述區
export const Description = styled.div`
  margin: ${props => props.theme.spacing.lg} 0;
`;

export const DescriptionTitle = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 600;
`;

export const DescriptionText = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  white-space: pre-line;
  font-size: ${props => props.theme.typography.body.fontSize};
`;

// 數量選擇器
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
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      border-color: ${props => props.theme.colors.border};
      color: ${props => props.theme.colors.border};
      cursor: not-allowed;
      background: ${props => props.theme.colors.backgroundLight};
    }
  }

  span {
    min-width: 40px;
    text-align: center;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text};
    user-select: none;
    font-weight: 500;
  }
`;

// 訂購按鈕
export const OrderButton = styled(Button)`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  font-size: 1.1rem;
  font-weight: 600;
  height: 48px;

  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }
`;

// Badge 樣式
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.small.fontSize};
  font-weight: 500;
  
  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background-color: ${props.theme.colors.success}15;
          color: ${props.theme.colors.success};
        `;
      case 'warning':
        return `
          background-color: ${props.theme.colors.warning}15;
          color: ${props.theme.colors.warning};
        `;
      default:
        return `
          background-color: ${props.theme.colors.primary}15;
          color: ${props.theme.colors.primary};
        `;
    }
  }}
`;

// 分享按鈕
export const ShareButton = styled(Button)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  
  &:hover {
    background: white;
  }
`;

// 導出共享組件
export { HeaderBackground };