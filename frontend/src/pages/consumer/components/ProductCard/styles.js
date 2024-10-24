// src/components/ProductCard/styles.js
import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform ${props => props.theme.transition.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: ${props => props.theme.colors.backgroundLight};
  display: block;
`;

export const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.md};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.h3`
  font-size: ${props => props.theme.typography.body.fontSize};
  margin: 0 0 ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
`;

export const Price = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  margin: ${props => props.theme.spacing.xs} 0;
  font-size: 1.2rem;
`;

export const Date = styled.p`
  font-size: ${props => props.theme.typography.small.fontSize};
  color: ${props => props.theme.colors.textLight};
  margin-top: auto;
`;