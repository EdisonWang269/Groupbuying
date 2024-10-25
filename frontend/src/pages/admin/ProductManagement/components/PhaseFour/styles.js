// src/pages/admin/PhaseFour/styles.js
import styled from '@emotion/styled';
import { AdminButton } from '../../../components/shared/styles';

export const ProductCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const ProductHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const ProductTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const CompletionStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.small.fontSize};
  color: ${props => {
    if (props.success) return props.theme.colors.success;
    if (props.error) return props.theme.colors.primary;
    return props.theme.colors.textLight;
  }};
  font-weight: ${props => props.success || props.error ? '500' : 'normal'};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};

  .date-info {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const UnreceivedSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background-color: rgba(229, 62, 62, 0.05);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid rgba(229, 62, 62, 0.15);
`;

export const UnreceivedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};

  .warning-title {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.primary};

    h3 {
      font-size: ${props => props.theme.typography.body.fontSize};
      font-weight: 500;
      margin: 0;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`;

export const UnreceivedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const UnreceivedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  transition: transform ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-1px);
  }

  .customer-info {
    .name {
      font-weight: 500;
      color: ${props => props.theme.colors.text};
      margin-bottom: ${props => props.theme.spacing.xs};
    }

    .phone {
      font-size: ${props => props.theme.typography.small.fontSize};
      color: ${props => props.theme.colors.textLight};
    }
  }

  .order-info {
    text-align: right;
    font-size: ${props => props.theme.typography.small.fontSize};
    
    div {
      &:first-of-type {
        color: ${props => props.theme.colors.textLight};
        margin-bottom: ${props => props.theme.spacing.xs};
      }
    }

    .amount {
      color: ${props => props.theme.colors.primary};
      font-weight: 500;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.sm};

    .order-info {
      text-align: left;
      width: 100%;
    }
  }
`;

export const BlacklistButton = styled(AdminButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  background-color: #6CB7AA;
  color: white;
  font-size: ${props => props.theme.typography.small.fontSize};

  &:hover:not(:disabled) {
    background-color: #5ea99c;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;