// src/components/ProductCard/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  ProductImage,
  ProductInfo,
  ProductTitle,
  Price,
  Date
} from './styles';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <ProductImage
        src={imageError ? '/default-product-image.jpg' : product.product_picture}
        alt={product.product_name}
        onError={() => setImageError(true)}
      />
      <ProductInfo>
        <ProductTitle>{product.product_name}</ProductTitle>
        <Price>$ {product.price}</Price>
        <Date>結單日期：{product.statement_date}</Date>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;