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

export const Header = styled(PageHeader)`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} 0;
`;

export const Title = styled(PageTitle)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 2.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
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
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.small.fontSize};
  }
`;

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
  padding: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.lg};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const OrderImage = styled.img`
  width: 120px;
  height: 120px;
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
  gap: ${props => props.theme.spacing.sm};
  padding-right: 110px;
  min-width: 0; // 防止 flex item 溢出

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text};
    font-weight: 600;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    user-select: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-right: 0;
    gap: ${props => props.theme.spacing.xs};
    
    h3 {
      font-size: 0.95rem;
      -webkit-line-clamp: 1;
      margin-bottom: 0;
      padding-right: 75px;
    }
  }
`;

export const OrderInfoGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.xs};
    margin-top: 0;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  min-width: ${props => props.fullWidth ? '100%' : '45%'};
  
  span:first-of-type {
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9rem;
  }
  
  span:last-child {
    color: ${props => props.theme.colors.text};
    font-size: 0.9rem;
    font-weight: ${props => props.highlight ? '600' : '400'};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: ${props => props.fullWidth ? '100%' : '100%'};
    font-size: 0.8125rem;
    
    span:first-of-type,
    span:last-child {
      font-size: 0.8125rem;
    }

    // ${props => !props.fullWidth && !props.highlight && `
    //   display: none;
    // `}
  }
`;

export const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  user-select: none;
  position: absolute;
  right: ${props => props.theme.spacing.lg};
  top: ${props => props.theme.spacing.lg};
  
  ${props => {
    const statusStyles = {
      completed: {
        bg: '#E8F5E9',
        color: '#43A047'
      },
      processing: {
        bg: '#E3F2FD',
        color: '#1976D2'
      },
      pending: {
        bg: '#FFF3E0',
        color: '#FB8C00'
      },
      expired: {
        bg: '#FFEBEE',
        color: '#E53935'
      }
    };

    const style = statusStyles[props.status] || statusStyles.pending;
    
    return `
      background-color: ${style.bg};
      color: ${style.color};
    `;
  }}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    right: ${props => props.theme.spacing.sm};
    top: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};
    font-size: 0.75rem;
  }
`;

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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 50vh;
  text-align: center;
  gap: 1rem;
`;

export const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6CB7AA;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a9e93;
  }
`;

export { HeaderBackground, HeaderContent };