// src/pages/OrderHistory/styles.js
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  min-height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.backgroundLight};
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 768px;
    margin: 0 auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Header = styled.header`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const FilterContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: auto;
    min-width: 120px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.body.fontSize};
  cursor: pointer;
  appearance: none;
  padding-right: ${props => props.theme.spacing.xl};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${props => props.theme.spacing.md} center;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 120px;
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const OrderCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const OrderInfo = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.md};
`;

export const OrderImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const OrderDetails = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.typography.body.fontSize};
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: ${props => props.theme.spacing.xs} 0;
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.typography.small.fontSize};
  }
`;

export const StatusTag = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin-top: ${props => props.theme.spacing.sm};
  font-weight: 500;

  ${props => {
    switch (props.status) {
      case '待領取':
        return `
          background-color: #fef3c7;
          color: #d97706;
        `;
      case '已領取':
        return `
          background-color: #dcfce7;
          color: #15803d;
        `;
      default:
        return `
          background-color: #e5e7eb;
          color: #4b5563;
        `;
    }
  }}
`;

export const NoOrders = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
`;