import styled from '@emotion/styled';
import { AdminButton } from '../../../components/shared/styles';

const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

export const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  width: 100%;
`;

export const ProductTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1A202C;
  margin: 0;
  padding-bottom: 12px;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid #E2E8F0;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 1.25rem;
    padding-bottom: 8px;
    margin-bottom: 1rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  color: #4A5568;
  font-size: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${breakpoints.md}) {
    flex-direction: ${props => props.isDateRow ? 'row' : 'column'};
    align-items: ${props => props.isDateRow ? 'center' : 'flex-start'};
    gap: ${props => props.isDateRow ? '8px' : '12px'};
    
    & > * {
      width: ${props => props.isDateRow ? 'auto' : '100%'};
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 8px;
    margin-bottom: 12px;
    font-size: 0.938rem;
  }
`;

export const OrderAmount = styled.span`
  font-weight: 600;
  color: #00A67E;
  background-color: #F0FDF9;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.sm}) {
    width: auto;
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
  }
`;

export const OrderCount = styled.span`
  color: #1A202C;
  font-weight: 600;
  background-color: #F7FAFC;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #6CB7AA;
  }

  @media (max-width: ${breakpoints.sm}) {
    width: auto;
    padding: 8px 12px;
  }
`;

export const OrderSummary = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #E2E8F0;

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 20px;
    padding: 12px;
  }
`;

export const OrderSummaryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2D3748;
  font-size: 1.125rem;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

export const OrderSummaryContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  color: #4A5568;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #CBD5E0;
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: ${breakpoints.sm}) {
    > div {
      font-size: 0.938rem;
    }
  }
`;

export const SetArrivalButton = styled(AdminButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  background-color: #6CB7AA;
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  width: auto;
  min-width: 180px;
  
  &:hover:not(:disabled) {
    background-color: #5ea99c;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: ${breakpoints.xl}) {
    padding: 10px 20px;
    min-width: 160px;
  }

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    padding: 12px 20px;
    margin-top: 20px;
    justify-content: center;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 0.938rem;
    padding: 10px 16px;
    margin-top: 16px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;