// src/pages/admin/PhaseTwo/styles.js
import styled from '@emotion/styled';
import { AdminButton } from '../../../components/shared/styles';

export const ProductCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  transition: all ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const ProductInfo = styled.div`
  flex: 1;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const ProductTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const OrderAmount = styled.span`
  // color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

export const OrderCount = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

export const OrderSummary = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.md};
`;

export const OrderSummaryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
`;

export const OrderSummaryContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textLight};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const SetArrivalButton = styled(AdminButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
  background-color: #6CB7AA;
  color: white;
  width: auto;
  
  &:hover:not(:disabled) {
    background-color: #5ea99c;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;