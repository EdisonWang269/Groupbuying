// src/pages/consumer/components/ProductCard/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProductCardWrapper,
  ProductImage,
  ProductInfo,
  ProductTitle,
  Price,
  Date
} from './styles';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    navigate(`/product/${product.product_id}`);
  };

  return (
    <ProductCardWrapper onClick={handleClick} hover>
      <ProductImage
        src={imageError ? '/default-product-image.jpg' : product.product_picture}
        alt={product.product_name}
        onError={handleImageError}
      />
      <ProductInfo>
        <ProductTitle>{product.product_name}</ProductTitle>
        <Price>NT$ {product.price}</Price>
        <Date>結單日期：{product.statement_date}</Date>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;