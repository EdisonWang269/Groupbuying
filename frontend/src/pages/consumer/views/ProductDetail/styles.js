// src/pages/ProductDetail/styles.js
import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.white};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  padding: 0 ${props => props.theme.spacing.md};
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;

export const HeaderTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.text};
`;

export const Content = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const ProductTitle = styled.h3`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const Price = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  margin: ${props => props.theme.spacing.md} 0;

  button {
    width: 36px;
    height: 36px;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.sm};
    background: ${props => props.theme.colors.white};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: ${props => props.theme.colors.backgroundLight};
    }
  }

  span {
    min-width: 40px;
    text-align: center;
    font-size: 1.1rem;
  }
`;

export const OrderButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body.fontSize};
  font-weight: 500;
  cursor: pointer;
  transition: background-color ${props => props.theme.transition.default};

  &:hover {
    background-color: #c53030;
  }
`;

export const StatementDate = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.small.fontSize};
  margin: ${props => props.theme.spacing.md} 0;
`;

export const Description = styled.div`
  margin-top: ${props => props.theme.spacing.lg};

  h4 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    line-height: 1.6;
    color: ${props => props.theme.colors.textLight};
  }
`;