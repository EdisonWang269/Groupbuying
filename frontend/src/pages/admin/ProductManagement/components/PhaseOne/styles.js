// styles.js
import styled from '@emotion/styled';

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

export const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 16px;
  transition: all 0.2s ease-in-out;
  border: 1px solid #E2E8F0;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  width: 100%;
`;

export const ProductTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A202C;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.4;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-bottom: 16px;
  color: #4A5568;
  font-size: 1rem;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    flex-shrink: 0;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 0.938rem;
    margin-bottom: 12px;
  }

  @media (max-width: ${breakpoints.md}) {
    flex-direction: ${props => props.isDateRow ? 'row' : 'column'};
    align-items: ${props => props.isDateRow ? 'center' : 'flex-start'};
    gap: 8px;

    & > * {
      width: ${props => props.isDateRow ? 'auto' : '100%'};
    }
  }
`;

export const EditButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  color: #00A67E;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    background-color: #F0FDF9;
    border-color: #00A67E;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 166, 126, 0.2);
  }

  &:active {
    background-color: #E6FAF5;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 6px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const OrderAmount = styled.span`
  font-weight: 600;
  color: #00A67E;
  background-color: #F0FDF9;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  white-space: nowrap;

  @media (max-width: ${breakpoints.md}) {
    padding: 4px 8px;
    font-size: 0.938rem;
  }
`;

export const OrderCount = styled.span`
  color: #1A202C;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  background-color: #F7FAFC;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  white-space: nowrap;

  @media (max-width: ${breakpoints.md}) {
    padding: 4px 8px;
    font-size: 0.938rem;
  }
`;