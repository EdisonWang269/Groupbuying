// src/components/dialogs/ReceiveDialog/styles.js
import styled from '@emotion/styled';

export const OrderDetails = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;

  .label {
    font-size: ${props => props.theme.typography.small.fontSize};
    color: ${props => props.theme.colors.textLight};
  }

  .value {
    font-size: ${props => props.theme.typography.body.fontSize};
    color: ${props => props.theme.colors.text};

    &.highlight {
      color: ${props => props.theme.colors.primary};
      font-size: ${props => props.theme.typography.h2.fontSize};
      font-weight: 600;
    }
  }
`;

export const TotalAmount = styled(DetailItem)`
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.lg};
`;