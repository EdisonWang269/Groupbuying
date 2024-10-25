// src/components/ProductCard/styles.js
import styled from '@emotion/styled';
import { Card } from '../shared/styles';

export const ProductCardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0; // 移除卡片的內邊距
  
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
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md}; // 減少內容區域的內邊距
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs}; // 使用 gap 來控制元素間距
`;

export const ProductTitle = styled.h3`
  font-size: ${props => props.theme.typography.body.fontSize};
  margin: 0;
  color: ${props => props.theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  min-height: 2.6em; // 確保兩行文字的高度一致
`;

export const Price = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  margin: 0;
  font-size: 1.2rem;
`;

export const Date = styled.p`
  font-size: ${props => props.theme.typography.small.fontSize};
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  margin-top: auto; // 保持在底部
`;