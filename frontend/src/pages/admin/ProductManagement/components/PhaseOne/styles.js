// src/pages/admin/PhaseOne/styles.js
import styled from '@emotion/styled';

export const ProductCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md};
  transition: all ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
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

export const EditButton = styled.button`
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: #6CB7AA;
  transition: all ${props => props.theme.transition.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(108, 183, 170, 0.1);
  }
`;

export const OrderAmount = styled.span`
  color: #6CB7AA;
  font-weight: 500;
`;

export const OrderCount = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;