// src/pages/OrderHistory/styles.js
import styled from '@emotion/styled';
import { 
  PageContainer, 
  PageHeader, 
  HeaderBackground, 
  HeaderContent,
  PageTitle,
  Card,
  Button
} from '../components/shared/styles';

// 基礎容器
export const Container = styled(PageContainer)``;

// 頭部區域 - 縮小整體大小
export const Header = styled(PageHeader)`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md}; // 從 xl 改為 md
  padding: ${props => props.theme.spacing.sm} 0; // 添加較小的上下內邊距
`;

export const Title = styled(PageTitle)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm}; // 從 lg 改為 sm，縮小與tabs的距離
  font-size: 2.5rem; // 從 2.5rem 改小

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem; // 從 2rem 改小
  }
`;

// 標籤欄
export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const TabButton = styled(Button)`
  min-width: 100px;
  background: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.85)'};
  color: #6CB7AA;
  opacity: ${props => props.isActive ? 1 : 0.85};
  font-weight: ${props => props.isActive ? '600' : '500'};
  box-shadow: ${props => props.isActive ? props.theme.shadows.md : props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};

  &:hover {
    background: white;
    opacity: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: 80px;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md}; // 縮小按鈕padding
    font-size: ${props => props.theme.typography.small.fontSize};
  }
`;

// 訂單列表
export const OrdersList = styled.div`
  max-width: 800px;
  margin: ${props => props.theme.spacing.md} auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  animation: ${props => props.theme.animations?.fadeIn || 'none'} 0.3s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.sm};
    margin: ${props => props.theme.spacing.sm} auto;
    gap: ${props => props.theme.spacing.sm};
  }
`;

// 訂單卡片
export const OrderCard = styled(Card)`
  padding: 0;
  background: white;
  transition: transform ${props => props.theme.transition.default},
              box-shadow ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.md};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const OrderImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 80px;
    height: 80px;
  }
`;

export const OrderDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  padding-right: 100px;

  h3 {
    margin: 0;
    font-size: ${props => props.theme.typography.body.fontSize};
    color: ${props => props.theme.colors.text};
    font-weight: 600;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    user-select: none;
  }

  p {
    margin: 0;
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

// 狀態標籤
export const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.small.fontSize};
  font-weight: 500;
  user-select: none;
  position: absolute;
  right: ${props => props.theme.spacing.md};
  top: ${props => props.theme.spacing.md};
  
  ${props => {
    const statusStyles = {
      '待領取': {
        bg: '#FFF3E0',
        color: '#FB8C00'
      },
      '已領取': {
        bg: '#E8F5E9',
        color: '#43A047'
      },
      '已結單': {
        bg: '#ECEFF1',
        color: '#607D8B'
      }
    };

    const style = statusStyles[props.status] || statusStyles['已結單'];
    
    return `
      background-color: ${style.bg};
      color: ${style.color};
    `;
  }}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    right: ${props => props.theme.spacing.sm};
    top: ${props => props.theme.spacing.sm};
  }
`;

// 無訂單狀態
export const NoOrders = styled(Card)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
  background: white;
  animation: ${props => props.theme.animations?.fadeIn || 'none'} 0.3s ease-out;

  p {
    margin: 0;
    font-size: ${props => props.theme.typography.body.fontSize};
    user-select: none;
  }
`;

// 導出共享組件
export { HeaderBackground, HeaderContent };