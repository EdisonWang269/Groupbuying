// src/components/dialogs/NotifyDialog/styles.js
import styled from '@emotion/styled';

export const NotificationInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  .product-name {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .count {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
  }
`;

export const CustomerList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin: ${props => props.theme.spacing.lg} 0;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
`;

export const CustomerItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
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
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
  }
`;

export const WarningBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => `${props.theme.colors.warning}10`};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.warning};
  font-size: ${props => props.theme.typography.small.fontSize};
`;