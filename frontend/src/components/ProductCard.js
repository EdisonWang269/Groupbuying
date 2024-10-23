import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={imageError ? '/path/to/placeholder-image.jpg' : product.product_picture}
        alt={product.product_name}
        className="product-image"
        onError={() => setImageError(true)}
      />
      <div className="product-info">
        <h3>{product.product_name}</h3>
        <p className="price">$ {product.price}</p>
        <p className="date">結單日期：{product.statement_date}</p>
      </div>
    </div>
  );
};

export default ProductCard;