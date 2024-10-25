// src/pages/admin/PhaseThree/styles.js
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.lg};

  .date-info {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const ProductTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.body.fontSize};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const ProductInfo = styled.div`
  .progress-section {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
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
    background-color: #6CB7AA;
    transition: width 0.3s ease;
  }
`;

export const ProgressText = styled.div`
  font-size: ${props => props.theme.typography.small.fontSize};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
`;

export const TableHeader = styled.tr`
  th {
    text-align: left;
    padding: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.backgroundLight};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
    font-weight: 500;
    font-size: ${props => props.theme.typography.small.fontSize};
    white-space: nowrap;

    &:first-of-type {
      padding-left: ${props => props.theme.spacing.lg};
    }

    &:last-of-type {
      padding-right: ${props => props.theme.spacing.lg};
    }
  }
`;

export const TableRow = styled.tr`
  td {
    padding: ${props => props.theme.spacing.md};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.body.fontSize};

    &:first-of-type {
      padding-left: ${props => props.theme.spacing.lg};
    }

    &:last-of-type {
      padding-right: ${props => props.theme.spacing.lg};
    }
  }

  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.backgroundLight};
  }
`;

export const ActionButton = styled(AdminButton)`
  padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  background-color: #6CB7AA;
  color: white;
  font-size: ${props => props.theme.typography.small.fontSize};

  &:hover:not(:disabled) {
    background-color: #5ea99c;
  }
`;

export const NotifyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  color: #6CB7AA;
  background-color: rgba(108, 183, 170, 0.1);
  transition: all ${props => props.theme.transition.default};

  &:hover {
    background-color: rgba(108, 183, 170, 0.2);
  }
`;