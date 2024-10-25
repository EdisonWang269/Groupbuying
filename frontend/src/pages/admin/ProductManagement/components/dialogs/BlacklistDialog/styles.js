// src/components/dialogs/BlacklistDialog/styles.js
import styled from '@emotion/styled';

export const InfoSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  .product-name {
    font-size: ${props => props.theme.typography.body.fontSize};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .count {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
  }
`;

export const WarningSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => `${props.theme.colors.warning}10`};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  svg {
    color: ${props => props.theme.colors.warning};
    flex-shrink: 0;
  }

  h4 {
    font-weight: 500;
    color: ${props => props.theme.colors.warning};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  p {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.warning};
  }
`;

export const CustomerList = styled.div`
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};

  .list-header {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const CustomerItem = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
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
    
    p {
      color: ${props => props.theme.colors.textLight};
    }

    .amount {
      color: ${props => props.theme.colors.primary};
      font-weight: 500;
      margin-top: ${props => props.theme.spacing.xs};
    }
  }
`;