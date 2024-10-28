// src/pages/admin/OrderSearch/styles.js
import styled from '@emotion/styled';
import { AdminButton } from '../components/shared/styles';

export const SearchCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    padding: ${props => props.theme.spacing.md};
  }
`;

export const SearchButton = styled(AdminButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: #6CB7AA;
  color: white;
  min-width: 120px;
  height: 50px;

  &:hover:not(:disabled) {
    background-color: #5ea99c;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ResultSection = styled.div`
  margin: ${props => props.theme.spacing.xl} 0;
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};

  h2 {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.h2.fontSize};
    margin: 0;
  }
`;

export const OrderCount = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.small.fontSize};
`;

export const NoResult = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  box-shadow: ${props => props.theme.shadows.sm};

  svg {
    color: ${props => props.theme.colors.textLight};
  }

  p {
    margin: 0;
    font-size: ${props => props.theme.typography.body.fontSize};
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const OrderCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
  transition: transform ${props => props.theme.transition.default},
              box-shadow ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .product-info {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};

    h3 {
      margin: 0;
      font-size: ${props => props.theme.typography.body.fontSize};
      font-weight: 500;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const OrderDetails = styled.div`
  padding: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

export const InfoLabel = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.small.fontSize};
  min-width: 70px;
`;

export const InfoValue = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body.fontSize};
`;