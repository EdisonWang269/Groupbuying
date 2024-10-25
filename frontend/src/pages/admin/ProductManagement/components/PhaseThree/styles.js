import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

export const ProductCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const ProductTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};
`;

export const ProductInfo = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

export const StatusTag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.small.fontSize};
  font-weight: 500;
  ${props => props.status === 'received' ? `
    background-color: ${props.theme.colors.success}15;
    color: ${props.theme.colors.success};
  ` : `
    background-color: ${props.theme.colors.warning}15;
    color: ${props.theme.colors.warning};
  `}
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.theme.colors.success};
    transition: width 0.3s ease;
  }
`;

export const ProgressText = styled.div`
  font-size: ${props => props.theme.typography.small.fontSize};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableHeader = styled.tr`
  th {
    text-align: left;
    padding: ${props => props.theme.spacing.sm};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textLight};
    font-weight: 500;
    font-size: ${props => props.theme.typography.small.fontSize};
  }
`;

export const TableRow = styled.tr`
  td {
    padding: ${props => props.theme.spacing.sm};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const ActionButton = styled.button`
  padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.small.fontSize};
  transition: background-color ${props => props.theme.transition.default};

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

export const NotifyButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: ${props => `${props.theme.colors.primary}10`};
  transition: all ${props => props.theme.transition.default};

  &:hover {
    background-color: ${props => `${props.theme.colors.primary}20`};
  }
`;
